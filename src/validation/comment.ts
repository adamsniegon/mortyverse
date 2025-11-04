import { commentsDirectory } from "@lib/commentClient";
import { z } from "zod";

export const commentSchema = z.object({
  nickname: z.string().max(50, "nicknameIsLong").optional(),
  email: z.email("emailIsInvalid"),
  message: z.string().min(1, "messageIsEmpty").max(1000, "messageIsLong"),
  // .regex(/[a-z]/, "message.missing_lowercase"),
  consent: z.boolean().optional(),
});

export type CommentInput = z.infer<typeof commentsDirectory>;
