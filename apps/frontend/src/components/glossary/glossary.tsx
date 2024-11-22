import { Button, createIdentifiableElement, IconButton, MaterialSymbol, Popover, usePresence } from "@star4/react";
import { memo, useEffect, useState } from "react";
import clsx from "clsx";

import styles from "./glossary.module.sass";
import { Header } from "../header";

export namespace Glossary {
  export type Props = {}
}

const GlossaryComponent = function Glossary(
  {}: Glossary.Props,
) {
  const [isOpen, setIsOpen] = useState(false);

  const { isMounted, isEntering, isExiting, isAnimating } = usePresence({
    source: isOpen,
    transitionDuration: [1000, 400],
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

  return (
    <div>
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
          )} />
        <div
          className={clsx(
            styles["shade"],
            isEntering && styles["shade--entering"],
            isExiting && styles["shade--exiting"],
          )}>
            <div className={styles["shade__scroller"]}>
              <Header
                className={styles["shade__header"]}
                leading={
                  <IconButton onClick={() => setIsOpen(false)} icon={<MaterialSymbol name="close" />} />
                }
                headline="Глоссарий" />

            </div>
        </div>
      </Popover>
    </div>
  );
}

export const Glossary = Object.assign(
  memo(GlossaryComponent),
  createIdentifiableElement<Glossary.Props>("IS_GLOSSARY"),
);
