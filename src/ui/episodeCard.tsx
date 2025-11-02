import { Episode } from "@graphql/generated/graphql";
import { formatDate } from "@utils/formatDate";
import { cn } from "@utils/mergeClasses";
import { ComponentProps } from "react";
import Typography from "./typography";

interface IEpiodeCard
  extends ComponentProps<"div">,
    Pick<Episode, "name" | "air_date" | "episode"> {
  locale: string;
}

export default function EpisodeCard({
  className,
  name,
  air_date,
  episode,
  locale,
  ...props
}: IEpiodeCard) {
  return (
    <div
      className={cn(
        "grid gap-4 p-12 lg:p-16 border rounded-xl shadow-md",
        className,
      )}
      {...props}
    >
      <Typography variant="h4">{name}</Typography>
      <p>{`${episode} | ${formatDate(air_date, locale)}`}</p>
    </div>
  );
}
