import { forwardRef, memo, type ForwardedRef, type HTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";
import { createIdentifiableElement } from "@star4/react";

import styles from "./card.module.sass";

export namespace Card {
  export type Variant =
    | "elevated"
    | "filled"
    | "outlined";
  export type Props =
    & Omit<
      HTMLAttributes<HTMLElement>,
      "children"
    >
    & {
      variant: Variant;
      children?: ReactNode;
    }
  export interface Element extends HTMLElement {}
}

const CardComponent = forwardRef<Card.Element, Card.Props>(
  function Card(
    {
      className,
      variant,
      children,
      ...rest
    },
    forwardedRef
  ) {
    const isOutlined = variant === "outlined";
    return (
      <div
        ref={forwardedRef as ForwardedRef<HTMLDivElement>}
        className={
          clsx(
            styles["card"],
            styles[`card--${variant}`],
            className,
          )
        }
        {...rest}>
          {children}
          {isOutlined && <div className={styles["card__outline"]} />}
      </div>
    )
  }
);

export const Card = Object.assign(
  memo(CardComponent),
  createIdentifiableElement<Card.Props>("IS_CARD"),
);
