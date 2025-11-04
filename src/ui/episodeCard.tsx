import { Episode } from "@graphql/generated/graphql";
import { formatDate } from "@utils/formatDate";
import { cn } from "@utils/mergeClasses";
import { ComponentProps } from "react";
import Typography from "./typography";

interface IEpisodeCard
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
}: IEpisodeCard) {
  return (
    <div
      className={cn(
        "grid gap-4 p-8 lg:p-12 border rounded-xl shadow-md",
        className,
      )}
      {...props}
    >
      <Typography variant="h4">{name}</Typography>
      <p>{`${episode} | ${formatDate(air_date, locale)}`}</p>
    </div>
  );
}
