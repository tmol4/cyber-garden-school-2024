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

  const updateScrolledUnder = useCallback(
    (element: HTMLElement) => {
      setHeaderScrolledUnder(element.scrollTop > 0);
      const scrollEnd = element.offsetHeight + element.scrollTop >= element.scrollHeight;
      setFooterScrolledUnder(!scrollEnd);
    },
    [],
  );

  const [headerScrolledUnder, setHeaderScrolledUnder] = useState(false);
  const [footerScrolledUnder, setFooterScrolledUnder] = useState(true);
  const onScroll: UIEventHandler<HTMLElement> = useCallback(
    (event) => updateScrolledUnder(event.currentTarget),
    [],
  );

  const [isEntering, setIsEntering] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const isAnimating = useMemo(() => isEntering || isExiting, [isEntering, isExiting]);

  useEffect(
    () => {
      const element = wrapperRef.current;
      if(!element) return;
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
    [],
  );
  useEffect(
    () => {
      const element = scrollerRef.current;
      if(!element || isAnimating) return;
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
        label="Глоссарий" />
      <Shade ref={scrollerRef} open={isOpen} onScroll={onScroll} onEnter={setIsEntering} onExit={setIsExiting}>
        <div ref={wrapperRef} className={styles["glossary__wrapper"]}>
          <Header
            // className={
            //   clsx(
            //     styles["shade__header"],
            //     isScrolledUnder && styles["shade__header--scrolled-under"],
            //   )
            // }
            scrolledUnder={headerScrolledUnder}
            // leading={
            //   <IconButton onClick={() => setIsOpen(false)} icon={<MaterialSymbol name="close" />} />
            // }
            headline="Глоссарий"
            // trailing={
            //   <IconButton icon={<MaterialSymbol name="search" />} />
            // }
            />
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
            {/* <ActionButton
              onClick={() => setIsOpen(false)}
              icon={<ArrowForward />}
              label="Продолжить!" /> */}
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
