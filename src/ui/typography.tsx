import { TTypographyVariants } from "@custom-types/typography";
import { cn } from "@utils/mergeClasses";
import * as React from "react";

interface ITypography extends React.HTMLAttributes<HTMLElement> {
  variant?: TTypographyVariants;
  as?: React.ElementType;
}

const variantStyles: Record<TTypographyVariants, string> = {
  h1: "text-5xl xl:text-6xl font-title font-semibold font-serif",
  h2: "text-4xl xl:text-5xl font-title font-semibold font-serif",
  h3: "text-3xl xl:text-4xl font-title font-semibold font-serif",
  h4: "text-2xl xl:text-3xl font-title font-semibold font-serif",
  h5: "text-xl xl:text-2xl font-title font-semibold font-serif",
  h6: "text-lg xl:text-xl font-title font-semibold font-serif",
  body: "text-base font-normal font-sans",
  small: "text-sm font-normal font-sans",
};

const defaultTag: Record<TTypographyVariants, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "p",
  small: "small",
};

export default function Typography({
  children,
  className,
  variant = "body",
  as,
  ...props
}: ITypography) {
  const Component = as || defaultTag[variant];

  return (
    <Component className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </Component>
  );
}
