import { ActionButton, ArrowForward, Button, createIdentifiableElement, IconButton, Lenis, ListItem, MaterialSymbol, Popover, usePresence } from "@star4/react";
import { memo, useCallback, useEffect, useState, type CSSProperties, type UIEventHandler } from "react";
import clsx from "clsx";

import styles from "./glossary.module.sass";
import { Header } from "../header";
import { Card } from "../card";
import { THEME } from "~/theme";

export namespace Glossary {
  export type Props = {}
}

const GlossaryComponent = function Glossary(
  {}: Glossary.Props,
) {
  const [isOpen, setIsOpen] = useState(false);

  const { isMounted, isEntering, isExiting, isAnimating, isVisible } = usePresence({
    source: isOpen,
    transitionDuration: [800, 200],
  });

  useEffect(
    () => {
      const isScrollLocked = isMounted && !isAnimating
      document.body.toggleAttribute(
        "data-scroll-lock",
        isScrollLocked,
      );
    },
    [isMounted, isAnimating],
  );

  const [isScrolledUnder, setIsScrolledUnder] = useState(false);
  const onScroll: UIEventHandler<HTMLElement> = useCallback(
    (event) => {
      const scrollY = event.currentTarget.scrollTop;
      const newIsScrolledUnder = scrollY > 0;
      setIsScrolledUnder(newIsScrolledUnder);
    },
    [],
  );
  return (
    <>
      <IconButton
        onClick={() => setIsOpen(prev => !prev)}
        variant="filledTonal"
        selected={false}
        icon={<MaterialSymbol name="help" />} />
      <Popover open={isMounted}>
        <div
          className={clsx(
            styles["backdrop"],
            isEntering && styles["backdrop--entering"],
            isExiting && styles["backdrop--exiting"],
            isVisible && styles["backdrop--visible"],
          )} />
        <div
          className={clsx(
            styles["shade"],
            isEntering && styles["shade--entering"],
            isExiting && styles["shade--exiting"],
            isVisible && styles["shade--visible"],
          )}>
            <Lenis.Wrapper
              className={
                clsx(
                  styles["shade__scroller"],
                  isAnimating && styles["shade__scroller--animating"],
                )
              }
              onScroll={onScroll}>
                <Lenis.Content>
                  <Header
                    className={
                      clsx(
                        styles["shade__header"],
                        isScrolledUnder && styles["shade__header--scrolled-under"],
                      )
                    }
                    scrolledUnder={isScrolledUnder}
                    leading={
                      <IconButton onClick={() => setIsOpen(false)} icon={<MaterialSymbol name="close" />} />
                    }
                    headline="Глоссарий"
                    trailing={
                      <IconButton icon={<MaterialSymbol name="search" />} />
                    } />
                  <div className={styles["glossary__content"]}>
                    <Card variant="outlined"
                      style={{
                        padding: 16,
                        "--star4-component-icon-size": "48px",
                        "--star4-component-material-symbol-optical-size": "48",
                      } as CSSProperties}>
                      <MaterialSymbol name="payments" />
                      <MaterialSymbol name="account_balance_wallet" />
                      <MaterialSymbol name="medical_information" />
                      <MaterialSymbol name="tram" />
                    </Card>
                    <h2 className={styles["glossary__h2"]}>Значки</h2>
                    <p className={styles["glossary"]}>

                    </p>
                    <div className={styles["glossary__icons-card"]}>
                      <ListItem
                        multiline
                        leading={<MaterialSymbol name="payments" />}
                        headline="Твой баланс"
                        supportingText={
                          <span style={{ textWrap: "pretty" }}>
                            Игра заканчивается, если он станет отрицательным
                          </span>
                        } />
                      <ListItem
                        multiline
                        leading={<MaterialSymbol name="currency_ruble" />}
                        headline="Ежедневная прибыль"
                        supportingText={
                          <span style={{ textWrap: "pretty" }}>
                            Стоит денег, но значительно снижает траты на лечение!
                          </span>
                        } />
                      <ListItem
                        multiline
                        leading={<MaterialSymbol name="medical_information" />}
                        headline="Медицинская страховка"
                        supportingText={
                          <span style={{ textWrap: "pretty" }}>
                            Стоит денег, но значительно снижает траты на лечение!
                          </span>
                        } />
                      <ListItem
                        multiline
                        leading={<MaterialSymbol name="tram" />}
                        headline="Используемый вид транспорта"
                        supportingText={
                          <span style={{ textWrap: "pretty" }}>
                            Выбор за тобой: низкая стоимость проезда либо комфорт
                          </span>
                        } />
                    </div>
                  </div>
                  <div className={styles["glossary__action"]}>
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="filled"
                      icon={<ArrowForward />}
                      label="Продолжить!" />
                    {/* <ActionButton
                      onClick={() => setIsOpen(false)}
                      icon={<ArrowForward />}
                      label="Продолжить!" /> */}
                  </div>
                </Lenis.Content>
            </Lenis.Wrapper>
        </div>
      </Popover>
    </>
  );
}

export const Glossary = Object.assign(
  memo(GlossaryComponent),
  createIdentifiableElement<Glossary.Props>("IS_GLOSSARY"),
);
