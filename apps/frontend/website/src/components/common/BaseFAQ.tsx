import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui-web/base/accordion";
import * as React from "react";

type Item = {
  question: string;
  answer: string;
};

type Props = {
  items: Item[];
};

const BaseFAQ = ({ items }: Props) => {
  return (
    <div className="mx-auto my-16 w-full max-w-3xl">
      <Accordion collapsible type="single" className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default BaseFAQ;
