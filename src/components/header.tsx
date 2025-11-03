import Typography from "@ui/typography";
import LocaleSelect from "./localeSelect";
import Container from "@ui/container";
import { Suspense } from "react";

export default function Header() {
  return (
    <header>
      <Container className="flex justify-between items-center py-4">
        <Typography variant="h6">MortyVerse</Typography>
        <Suspense>
          <LocaleSelect />
        </Suspense>
      </Container>
    </header>
  );
}
