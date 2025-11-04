import fs from "fs/promises";
import path from "path";
import { commentsDirectory } from "@lib/commentClient";
import { IComment } from "@custom-types/comment";

export async function getEpisodeComments(code: string): Promise<IComment[]> {
  const file = path.join(commentsDirectory, `episode-${code}.json`);
  try {
    const rawComments = await fs.readFile(file, "utf-8");
    const comments = JSON.parse(rawComments) as IComment[];
    const publishableComments = comments.filter((comment) => comment.consent);
    return publishableComments.sort((aComment, bComment) =>
      bComment.createdAt.localeCompare(aComment.createdAt),
    );
  } catch {
    return [];
  }
}
