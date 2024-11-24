import { createIdentifiableElement, ForwardRefExoticComponentProps } from "@star4/react";
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState, type HTMLAttributes, type UIEventHandler } from "react";

import styles from "./header.module.sass";
import clsx from "clsx";
import { Glossary } from "../glossary";
import type { ReactNode } from "@tanstack/react-router";

export namespace Header {
  export type Props =
    & Omit<
      HTMLAttributes<HTMLElement>,
      "children"
    >
    & {
      scrolledUnder?: boolean;
      leading?: ReactNode;
      headline: ReactNode;
      trailing?: ReactNode;
      transparent?: boolean;
    };

  export interface Element extends HTMLElement {}
}

const HeaderComponent = forwardRef<Header.Element, Header.Props>(
  function Header(
    {
      className,
      scrolledUnder,
      leading,
      headline,
      trailing,
      transparent,
      ...rest
    },
    forwardedRef
  ) {
    const ref = useRef<HTMLElement>(null);
    useImperativeHandle(
      forwardedRef,
      () => ref.current!,
      [],
    );

    const [isScrolledUnder, setIsScrolledUnder] = useState(false);

    const onScroll = () => {
      const newIsScrolledUnder = window.scrollY > 0;
      setIsScrolledUnder(newIsScrolledUnder);
    }

    useEffect(
      () => {
        if(typeof window === "undefined") return;
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
          window.removeEventListener("scroll", onScroll);
        };
      },
      [],
    );

    return (
      <header
        ref={ref}
        className={
          clsx(
            styles["header"],
            (scrolledUnder ?? isScrolledUnder) && styles["header--scrolled-under"],
            className,
          )
        }
        {...rest}>
          <div className={styles["header__content"]}>
            <div className={styles["header__leading"]}>
              {leading}
            </div>
            <span className={styles["header__headline"]}>{headline}</span>
            <div className={styles["header__trailing"]}>
              {trailing}
            </div>
          </div>
      </header>
    );
  },
)

export const Header = Object.assign(
  memo(HeaderComponent),
  createIdentifiableElement<ForwardRefExoticComponentProps<Header.Element, Header.Props>>("IS_HEADER"),
)
