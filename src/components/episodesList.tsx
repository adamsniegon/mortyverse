import { query } from "@lib/apolloClient";
import { EpisodesPagination } from "./episodesPagination";
import {
  GetEpisodesDocument,
  GetEpisodesQuery,
  GetEpisodesQueryVariables,
} from "@graphql/generated/graphql";

interface Props {
  page: number;
}

export default async function EpisodesList({ page }: Props) {
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

  const totalPages = data?.episodes?.info?.pages ?? 1;

  return (
    <>
      <ul>
        {data?.episodes?.results?.map((ep) => (
          <li key={ep?.id}>
            <h2>{ep?.name}</h2>
            <p>{ep?.air_date}</p>
          </li>
        ))}
      </ul>
      {!!totalPages && (
        <EpisodesPagination currentPage={page} totalPages={totalPages} />
      )}
    </>
  );
}
