import { type Character } from "@graphql/generated/graphql";
import { ComponentProps } from "react";
import Typography from "./typography";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { cn } from "@utils/mergeClasses";

interface ICharacterEpiodeCard
  extends Omit<ComponentProps<"div">, "id">,
    Pick<Character, "name" | "image" | "species" | "gender"> {
  origin?: string | null;
}

export default function Character({
  className,
  name,
  image,
  species,
  gender,
  origin,
  ...props
}: ICharacterEpiodeCard) {
  return (
    <div
      className={cn("p-4 rounded-lg hover:bg-primary/10", className)}
      {...props}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex items-center">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                <Image
                  className="object-cover"
                  fill
                  src={image ?? ""}
                  alt={name ?? ""}
                />
              </div>
              <Typography>{name}</Typography>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div>
              <Typography>{species}</Typography>
              <Typography>{gender}</Typography>
              <Typography>{origin}</Typography>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
