export const getFieldError = <T extends Record<string, string[]>>({
  message,
  field,
}: {
  message?: T | string;
  field?: keyof T;
}): string | undefined => {
  if (!message) {
    return undefined;
  }

  if (typeof message === "string") {
    return field ? undefined : message;
  }

  if (field) {
    return message[field]?.at(0);
  }

  return undefined;
};
