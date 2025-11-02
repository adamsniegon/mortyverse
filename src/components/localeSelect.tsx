"use client";

import { localeCodes, locales } from "@constants/locales";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LocaleSelect() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const code = locales[value as keyof typeof locales]?.code;
    if (!code) return;

    const segments = pathname.split("/").filter(Boolean);
    if (localeCodes.includes(segments[0])) segments.shift();

    const newPath = `/${code}/${segments.join("/")}`;
    const queryString = searchParams?.toString();
    const newUrl = queryString ? `${newPath}?${queryString}` : newPath;
    router.push(newUrl);
  };

  return (
    <Select defaultValue={locale} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(locales).map(([key, value]) => (
          <SelectItem key={key} value={key}>
            {value.language}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
