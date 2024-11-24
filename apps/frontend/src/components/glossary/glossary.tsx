import { ActionButton, ArrowForward, Button, createIdentifiableElement, IconButton, Lenis, ListItem, MaterialSymbol, Popover, usePresence, usePreviousState } from "@star4/react";
import { memo, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type UIEventHandler } from "react";
import clsx from "clsx";

import styles from "./glossary.module.sass";
import { Header } from "../header";
import { Card } from "../card";
import { THEME } from "~/theme";
import { Accordion } from "../accordion";

import Budget from "./budget.mdx";
import FinancePlan from "./finance-plan.mdx";
import Economy from "./economy.mdx";
import IncomeExpenses from "./income-expenses.mdx";
import Investments from "./investments.mdx";
import Loans from "./loans.mdx";
import Rate from "./rate.mdx";
import { Shade } from "../shade";

export namespace Glossary {
  export type Props = {}
}

const GlossaryComponent = function Glossary(
  {}: Glossary.Props,
) {
  const [isOpen, setIsOpen] = useState(false);
  const scrollerRef = useRef<Shade.Element>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isAnimating, setIsAnimating] = useState(false);

  const [headerScrolledUnder, setHeaderScrolledUnder] = useState(false);
  const [footerScrolledUnder, setFooterScrolledUnder] = useState(true);
  const onScroll: UIEventHandler<HTMLElement> = useCallback(
    (event) => updateScrolledUnder(event.currentTarget),
    [],
  );


  const updateScrolledUnder = useCallback(
    (element: HTMLElement) => {
      setHeaderScrolledUnder(element.scrollTop > 0);
      if(isAnimating) setFooterScrolledUnder(false);
      else {
        const scrollEnd = element.offsetHeight + element.scrollTop >= element.scrollHeight;
        setFooterScrolledUnder(!scrollEnd);
      }
    },
    [isAnimating],
  );

  useEffect(
    () => {
      const element = wrapperRef.current;
      if(!element || isAnimating) return;

      const resizeObserver = new ResizeObserver(
        () => {
          const element = scrollerRef.current;
          if(element) updateScrolledUnder(element);
        },
      );
      resizeObserver.observe(element);

      return () => {
        resizeObserver.disconnect();
      };
    },
    [isAnimating],
  );
  useEffect(
    () => {
      const element = scrollerRef.current;
      if(!element) return;
      updateScrolledUnder(element);
    },
    [isAnimating],
  );

  return (
    <>
      {/* <IconButton
        onClick={() => setIsOpen(true)}
        variant="filledTonal"
        icon={<MaterialSymbol name="book" />} /> */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="filledTonal"
        icon={<MaterialSymbol name="book" />}
        label="Теория" />
      <Shade
        ref={scrollerRef}
        open={isOpen}
        onAnimate={(entering, exiting) => setIsAnimating(entering || exiting)}
        onScroll={onScroll}>
          <div ref={wrapperRef} className={styles["glossary__wrapper"]}>
            <Header
              scrolledUnder={headerScrolledUnder}
              headline="Теория" />
            <div className={styles["glossary__content"]}>
              <Accordion>
                <Accordion.Item headline="Бюджет">
                  <Budget />
                </Accordion.Item>
                <Accordion.Item headline="Финансовый план">
                  <FinancePlan />
                </Accordion.Item>
                <Accordion.Item headline="Экономия средств">
                  <Economy />
                </Accordion.Item>
                <Accordion.Item headline="Личные доходы и расходы">
                  <IncomeExpenses />
                </Accordion.Item>
                <Accordion.Item headline="Инвестиции">
                  <Investments />
                </Accordion.Item>
                <Accordion.Item headline="Кредиты, займы, ссуда">
                  <Loans />
                </Accordion.Item>
                <Accordion.Item headline="Кредитная ставка, процент">
                  <Rate />
                </Accordion.Item>
              </Accordion>
            </div>
            <div
              className={clsx(
                styles["glossary__action"],
                footerScrolledUnder && styles["glossary__action--scrolled-under"],
              )}>
              <Button
                variant={footerScrolledUnder ? "filledTonal" : "filled"}
                onClick={() => setIsOpen(false)}
                label="Продолжить"
                trailingIcon={<MaterialSymbol name="arrow_forward" />} />
            </div>
          </div>
      </Shade>
    </>
  );
}

export const Glossary = Object.assign(
  memo(GlossaryComponent),
  createIdentifiableElement<Glossary.Props>("IS_GLOSSARY"),
);
