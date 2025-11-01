import EpisodesList from "@components/episodesList";

export const revalidate = 86400;

export default async function EpisodesPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page: pageParam = 1 } = await searchParams;
  const page = Number(pageParam);
  return <EpisodesList page={page} />;
}
