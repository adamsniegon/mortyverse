import {
  GetAllEpisodeCodesDocument,
  GetEpisodeDocument,
  GetEpisodeQuery,
  GetEpisodeQueryVariables,
} from "@graphql/generated/graphql";
import { getClient, query } from "@lib/apolloClient";
import Container from "@ui/container";
import Typography from "@ui/typography";
import { formatDate } from "@utils/formatDate";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import Character from "@ui/character";

export const revalidate = 86400;

export async function generateStaticParams() {
  const { data, error } = await getClient().query({
    query: GetAllEpisodeCodesDocument,
  });
  const episodeCodes = data?.episodes?.results
    ?.filter((episode) => episode?.episode)
    .map((episode) => ({ code: episode?.episode }));
  if (error || !episodeCodes?.length) return [];

  return episodeCodes;
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ locale: string; code: string }>;
}) {
  const { locale, code } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("episode");

  const { data, error } = await query<
    GetEpisodeQuery,
    GetEpisodeQueryVariables
  >({
    query: GetEpisodeDocument,
    variables: { episode: code },
  });

  const episode = data?.episodes?.results?.at(0);
  if (error || !episode) notFound();

  return (
    <Container>
      <div className="relative grid gap-4 border p-8 py-16 md:p-12 md:py-24 lg:p-16 lg:py-32 rounded-lg shadow-xl overflow-hidden">
        <Typography className="text-background z-2" variant="h1">
          {episode.name}
        </Typography>
        <Typography className="text-background z-2">{`${
          episode.episode
        } | ${formatDate(episode.air_date, locale)}`}</Typography>
        <Image
          className="object-cover z-0"
          fill
          src="/episode-hero.jpg"
          alt="Episode hero"
        />
        <div className="absolute w-full h-full top-0 left-0 bg-linear-to-r from-neutral-950 z-1"></div>
      </div>
      <div className="grid gap-8">
        {episode.characters.map((character) => (
          <Character
            key={character?.id}
            name={character?.name}
            image={character?.image}
            species={`${t("species")}: ${character?.species}`}
            gender={`${t("gender")}: ${character?.gender}`}
            origin={`${t("origin")}: ${character?.origin?.name}`}
          />
        ))}
      </div>
    </Container>
  );
}
