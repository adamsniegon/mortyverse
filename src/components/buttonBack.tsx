"use client";

import { Button } from "@ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function ButtonBack() {
  const t = useTranslations("general");
  const router = useRouter();

  return (
    <Button variant="link" onClick={() => router.back()}>
      <ArrowLeft /> {t("backToEpisodes")}
    </Button>
  );
}
