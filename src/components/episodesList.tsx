import { query } from "@lib/apolloClient";
import { EpisodesPagination } from "./episodesPagination";
import {
  GetEpisodesDocument,
  GetEpisodesQuery,
  GetEpisodesQueryVariables,
} from "@graphql/generated/graphql";
import { getLocale } from "next-intl/server";
import { Link } from "@i18n/navigation";
import EpisodeCard from "@ui/episodeCard";
import Container from "@ui/container";

interface Props {
  page: number;
}

export default async function EpisodesList({ page }: Props) {
  const locale = await getLocale();
  const { data, error } = await query<
    GetEpisodesQuery,
    GetEpisodesQueryVariables
  >({
    query: GetEpisodesDocument,
    variables: { page },
  });

  if (error) {
    return null;
  }
  console.log(locale);

  const totalPages = data?.episodes?.info?.pages ?? 1;

  return (
    <Container>
      <ul className="grid gap-8">
        {data?.episodes?.results?.map((episode) => (
          <li key={episode?.id}>
            <Link
              href={{
                pathname: "/episode/[part]",
                params: { part: episode?.episode ?? "" },
              }}
            >
              <EpisodeCard
                name={episode?.name}
                air_date={episode?.air_date}
                episode={episode?.episode}
                locale={locale}
              />
            </Link>
          </li>
        ))}
      </ul>
      {!!totalPages && (
        <EpisodesPagination currentPage={page} totalPages={totalPages} />
      )}
    </Container>
  );
}
