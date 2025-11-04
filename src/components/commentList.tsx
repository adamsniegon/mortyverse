import { IComment } from "@custom-types/comment";
import Comment from "@ui/comment";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@ui/empty";
import { getEpisodeComments } from "@utils/getEpisodeComments";
import { MessagesSquare } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

export default async function CommentList({ code }: { code: string }) {
  const locale = await getLocale();
  const t = await getTranslations("episode");
  const comments = await getEpisodeComments(code);

  if (!comments.length)
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MessagesSquare />
          </EmptyMedia>
          <EmptyTitle>{t("noComments.title")}</EmptyTitle>
          <EmptyDescription>{t("noComments.description")}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );

  return (
    <ul className="space-y-3">
      {comments.map((comment: IComment, index: number) => (
        <li key={`comment-${index}`}>
          <Comment
            locale={locale}
            nickname={comment.nickname}
            email={comment.email}
            message={comment.message}
            createdAt={comment.createdAt}
          />
        </li>
      ))}
    </ul>
  );
}
