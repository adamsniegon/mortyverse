import Typography from "@ui/typography";
import LocaleSelect from "./localeSelect";
import Container from "@ui/container";
import { Suspense } from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Container className="flex justify-between items-center py-4">
        <Link href="/">
          <Typography variant="h6">MortyVerse</Typography>
        </Link>
        <Suspense>
          <LocaleSelect />
        </Suspense>
      </Container>
    </header>
  );
}
