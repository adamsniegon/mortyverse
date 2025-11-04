"use client";

import { addComment } from "@app/[locale]/episode/[code]/actions";
import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { Button } from "@ui/button";
import { Field, FieldError, FieldLabel } from "@ui/field";
import { Input } from "@ui/input";
import { Spinner } from "@ui/spinner";
import { Textarea } from "@ui/textarea";
import { CheckCircle2Icon, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState } from "react";

interface ICommentForm {
  episodeCode: string;
}

export interface ICommentFormState {
  success: boolean;
  globalMessage?: string;
  messages?: {
    nickname?: string[];
    email?: string[];
    message?: string[];
    consent?: string[];
  };
  data: {
    nickname?: string;
    email?: string;
    message?: string;
    consent: boolean;
  };
}

const initialState: ICommentFormState = {
  success: false,
  data: {
    nickname: "",
    email: "",
    message: "",
    consent: true,
  },
};

export default function CommentForm({ episodeCode }: ICommentForm) {
  const t = useTranslations("form");
  const [state, formAction, pending] = useActionState(addComment, initialState);

  return (
    <form className="grid gap-4" action={formAction} noValidate>
      <input type="hidden" name="episodeCode" defaultValue={episodeCode} />
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="nickname">
            {t("comment.fields.nickname")}
          </FieldLabel>
          <Input
            id="nickname"
            name="nickname"
            type="text"
            defaultValue={state.data.nickname}
          />
          <FieldError>
            {state?.messages?.nickname &&
              t(`comment.messages.${state.messages.nickname?.at(0)}`)}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="email">{t("comment.fields.email")}</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={state.data.email}
          />
          <FieldError>
            {state?.messages?.email &&
              t(`comment.messages.${state.messages.email?.at(0)}`)}
          </FieldError>
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="message">{t("comment.fields.message")}</FieldLabel>
        <Textarea
          id="message"
          name="message"
          required
          className="h-48"
          defaultValue={state.data.message}
        />
        <FieldError>
          {state?.messages?.message &&
            t(`comment.messages.${state.messages.message?.at(0)}`)}
        </FieldError>
      </Field>

      <Field orientation="horizontal">
        <Input
          className="w-auto"
          type="checkbox"
          id="consent"
          name="consent"
          value="publish"
          defaultChecked={state.data.consent}
        />
        <FieldLabel htmlFor="consent">{t("comment.fields.consent")}</FieldLabel>
      </Field>

      {state?.globalMessage && (
        <Alert>
          {state.success ? <CheckCircle2Icon /> : <X />}
          <AlertTitle>
            {t(`comment.messages.${state.globalMessage}.title`)}
          </AlertTitle>
          <AlertDescription>
            {state?.globalMessage &&
              t(`comment.messages.${state.globalMessage}.description`)}
          </AlertDescription>
        </Alert>
      )}

      <Button {...(pending && { disabled: true })} type="submit">
        {pending && <Spinner />}
        {t("comment.submit")}
      </Button>
    </form>
  );
}
