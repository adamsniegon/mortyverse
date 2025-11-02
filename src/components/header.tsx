import Typography from "@ui/typography";
import LocaleSelect from "./localeSelect";
import Container from "@ui/container";

export default function Header() {
  return (
    <header>
      <Container className="flex justify-between items-center py-4">
        <Typography variant="h6">MortyVerse</Typography>
        <LocaleSelect />
      </Container>
    </header>
  );
}
