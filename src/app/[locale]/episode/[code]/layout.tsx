import { ButtonBack } from "@components/buttonBack";
import Container from "@ui/container";
import { setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Container>
      <div className="py-4">
        <ButtonBack />
      </div>
      {children}
    </Container>
  );
}
