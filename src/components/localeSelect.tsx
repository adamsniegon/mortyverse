"use client";

import { locales } from "@constants/locales";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function LocaleSelect() {
  const locale = useLocale();
  console.log(locale);
  const router = useRouter();

  const handleChange = (value: string) => {
    const code = locales[value as keyof typeof locales]?.code;
    if (!code) return;
    router.push(`/${code}`);
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
