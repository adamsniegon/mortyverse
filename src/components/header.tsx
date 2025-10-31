import Typography from "@ui/typography";
import LocaleSelect from "./localeSelect";

export default function Header() {
  return (
    <header className="flex justify-between items-center">
      <Typography>MortyVerse</Typography>
      <LocaleSelect />
    </header>
  );
}
