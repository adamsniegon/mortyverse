import { commentsDirectory } from "@lib/commentClient";
import { checkDirectory } from "./checkDirectory";
import fs from "fs/promises";
import path from "path";
import { IComment } from "@custom-types/comment";

export async function addEpisodeComment(
  code: string,
  newComment: IComment,
): Promise<void> {
  await checkDirectory(commentsDirectory);
  const safeCode = path.basename(code);
  const file = path.join(commentsDirectory, `episode-${safeCode}.json`);

  let comments: IComment[] = [];

  try {
    const rawComments = await fs.readFile(file, "utf-8");
    comments = JSON.parse(rawComments);
    if (!Array.isArray(comments)) comments = [];
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code !== "ENOENT"
    ) {
      throw error;
    }
  }

  comments.push(newComment);
  const temp = `${file}.${Date.now()}.tmp`;
  await fs.writeFile(temp, JSON.stringify(comments, null, 2), { mode: 0o600 });
  await fs.rename(temp, file);
}
