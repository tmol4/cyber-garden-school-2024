import { createIdentifiableElement, MaterialSymbol, Ripple } from "@star4/react";
import { Children, createContext, forwardRef, memo, useContext, useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react"
import clsx from "clsx";

import styles from "./accordion.module.sass";

namespace AccordionRoot {
  export type Props =
    & Omit<
      HTMLAttributes<HTMLElement>,
      "children"
    >
    & {
      children: ReactNode;
    };
  export interface Element extends HTMLElement {}
}

type AccordionContext = {

}
const AccordionContext = createContext<AccordionContext | undefined>(undefined);
const useAccordion = () => {
  const context = useContext(AccordionContext);
  if(!context) throw new Error(
    "<Accordion.Item> may only be a direct child of <Accordion>"
  );
  return context;
}

const AccordionRootComponent = forwardRef<AccordionRoot.Element, AccordionRoot.Props>(
  function Accordion(
    { children },
    forwardedRef,
  ) {
    const items = Children.toArray(children)
      .filter(node => {
        const is = AccordionItem.is(node);
        if(!is) {
          console.warn(
            "Invalid JSX Element passed to token resolver:",
            node,
          );
        }
        return is;
      });

    return (
      <div className={styles["accordion"]}>
        {
          items.map(
            (item, index) => (
              <AccordionItemContext.Provider
                key={index}
                value={{
                  expanded: true,
                  isFirst: index === 0,
                  isLast: index === items.length - 1,
                  expand: () => {},
                  collapse: () => {},
                }}
                children={item} />
            )
          )
        }
      </div>
    );
  }
)
const AccordionRoot = Object.assign(
  memo(AccordionRootComponent),
  createIdentifiableElement("IS_ACCORDION_ROOT"),
);

type AccordionItemContext = {
  expanded: boolean;
  isFirst: boolean;
  isLast: boolean;
  expand: () => void;
  collapse: () => void;
}

const AccordionItemContext = createContext<AccordionItemContext | undefined>(undefined);
const useAccordionItem = () => {
  const context = useContext(AccordionItemContext);
  if(!context) throw new Error(
    "<Accordion.Item> may only be a direct child of <Accordion>"
  );
  return context;
}

namespace AccordionItem {
  export type Props =
    & Omit<
      HTMLAttributes<HTMLElement>,
      "children"
    >
    & {
      defaultExpanded?: boolean;
      onExpand?: () => void;
      onCollapse?: () => void;
      headline: ReactNode;
      children?: ReactNode;
    };
  export interface Element extends HTMLElement {}
}

const AccordionItemComponent = forwardRef<AccordionItem.Element, AccordionItem.Props>(
  function AccordionItem(
    {
      className,
      defaultExpanded = false,
      onExpand,
      onCollapse,
      headline,
      children,
      ...rest
    },
    forwardedRef,
  ) {
    const ref = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const { isFirst, isLast } = useAccordionItem();

    const [expanded, setExpanded] = useState(false);

    return (
      <div
        ref={ref}
        className={
          clsx(
            styles["accordion__item"],
            isFirst && styles["accordion__item--first"],
            isLast && styles["accordion__item--last"],
            expanded && styles["accordion__item--expanded"],
          )
        }
        aria-expanded={expanded}>
        <div
          ref={headerRef}
          className={styles["accordion__item__header"]}
          onClick={() => setExpanded(prev => !prev)}>
            <Ripple for={headerRef} />
            <h3 className={styles["accordion__item__headline"]}>
              {headline}
            </h3>
            <div className={styles["accordion__item__icon"]}>
              <MaterialSymbol name="expand_more" />
            </div>
        </div>
        <div className={styles["accordion__item__content-wrapper"]}>
          <div className={styles["accordion__item__content"]}>
            <div className={styles["accordion__item__padding"]}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);



const AccordionItem = Object.assign(
  memo(AccordionItemComponent),
  createIdentifiableElement("IS_ACCORDION_ITEM"),
);


export namespace Accordion {
  export type Props = AccordionRoot.Props;
  export type Element = AccordionRoot.Element;
  export namespace Item {
    export type Props = AccordionItem.Props;
    export type Element = AccordionItem.Element;
  }
}

export const Accordion = Object.assign(
  AccordionRoot,
  { Item: AccordionItem },
);
