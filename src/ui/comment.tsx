import { ComponentProps } from "react";
import { IComment as ICommentType } from "@custom-types/comment";
import { cn } from "@utils/mergeClasses";

interface IComment
  extends ComponentProps<"div">,
    Pick<ICommentType, "nickname" | "email" | "message" | "createdAt"> {
  locale: string;
}

export default function Comment({
  className,
  locale,
  nickname,
  email,
  message,
  createdAt,
  ...props
}: IComment) {
  return (
    <div
      className={cn(
        "grid gap-4 border rounded-lg p-6 hover:bg-primary/10",
        className,
      )}
      {...props}
    >
      <div className="grid gap-1">
        <div className="font-medium">{nickname ?? email}</div>
        <p className="mt-2">{message}</p>
      </div>
      <div className="text-sm text-gray-500">
        {new Date(createdAt).toLocaleString(locale)}
      </div>
    </div>
  );
}
