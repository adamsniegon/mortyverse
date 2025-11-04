"use server";

import { ICommentFormState } from "@components/commentForm";
import { IComment } from "@custom-types/comment";
import { routing } from "@i18n/routing";
import { addEpisodeComment } from "@utils/addEpisodeComment";
import { commentSchema } from "@validation/comment";
import { revalidatePath } from "next/cache";
import z from "zod";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

export const addComment = async (
  prevState: ICommentFormState,
  formData: FormData,
): Promise<{ success: boolean } & ICommentFormState> => {
  const formValues = {
    nickname: formData.get("nickname")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
    consent: formData.get("consent")?.toString() === "publish",
  };

  const episodeCode = formData.get("episodeCode")?.toString();
  if (!episodeCode) return { success: false, data: formValues };

  const parsedData = commentSchema.safeParse(formValues);
  if (!parsedData.success) {
    const errors = z.flattenError(parsedData.error).fieldErrors;
    return {
      success: false,
      messages: errors,
      data: formValues,
    };
  }

  const window = new JSDOM("").window;
  const purify = DOMPurify(window);

  const comment: IComment = {
    id: crypto.randomUUID(),
    nickname: parsedData.data.nickname
      ? purify.sanitize(parsedData.data.nickname)
      : null,
    email: purify.sanitize(parsedData.data.email),
    message: purify.sanitize(parsedData.data.message),
    consent: parsedData.data.consent ?? false,
    createdAt: new Date().toISOString(),
  };

  const emptyState: ICommentFormState["data"] = {
    nickname: "",
    email: "",
    message: "",
    consent: true,
  };

  try {
    await addEpisodeComment(episodeCode, comment);
    routing.locales.map((locale) =>
      revalidatePath(`/${locale}/episode/${episodeCode}`),
    );
    return {
      success: true,
      globalMessage: "success",
      data: emptyState,
    };
  } catch {
    return {
      success: false,
      globalMessage: "error",
      data: emptyState,
    };
  }
};
