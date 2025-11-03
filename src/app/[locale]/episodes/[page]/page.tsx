import EpisodesList from "@components/episodesList";
import { GetEpisodesDocument } from "@graphql/generated/graphql";
import { getClient } from "@lib/apolloClient";

export const revalidate = 86400;

export async function generateStaticParams() {
  const { data, error } = await getClient().query({
    query: GetEpisodesDocument,
    variables: { page: 1 },
  });
  const pages = data?.episodes?.info?.pages;
  if (error || !pages) return [];

  return Array.from({ length: pages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export default async function EpisodesPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: pageParam = 1 } = await params;
  const page = Number(pageParam);
  return <EpisodesList page={page} />;
}
