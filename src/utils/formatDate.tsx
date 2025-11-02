export function formatDate(
  dateInput: string | Date | null | undefined,
  locale: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
): string | undefined {
  if (dateInput == null) {
    return;
  }

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return;
  }

  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
}
