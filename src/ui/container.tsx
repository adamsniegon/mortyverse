import { cn } from "@utils/mergeClasses";
import { ComponentProps, ReactNode } from "react";

interface IContainer extends ComponentProps<"div"> {
  children: ReactNode;
}

export default function Container({
  children,
  className,
  ...props
}: IContainer) {
  return (
    <div
      className={cn("max-w-[1400px] w-full mx-auto px-4 md:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
