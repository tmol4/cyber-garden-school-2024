import clsx from "clsx";
import { forwardRef, memo, type ForwardedRef, type HTMLAttributes, type ReactNode } from "react";

import { styles } from "./theme.css";
import { createIdentifiableElement } from "@star4/react";

export namespace Theme {
  export type Brightness = "auto" | "light" | "dark";
  export type Props =
    &  Omit<
      HTMLAttributes<HTMLElement>,
      "children"
    >
    & {
      brightness: Brightness;
      children?: ReactNode;
    };
  export interface Element extends HTMLElement {}
}

const ThemeComponent = forwardRef<Theme.Element, Theme.Props>(
  function Theme(
    {
      className,
      brightness,
      children,
      ...rest
    },
    forwardedRef,
  ) {
    return (
      <div
        ref={forwardedRef as ForwardedRef<HTMLDivElement>}
        className={clsx(
          styles.container({
            brightness,
          }),
          className,
        )}
        {...rest}
        children={children} />
    );
  }
);

export const Theme = Object.assign(
  memo(ThemeComponent),
  createIdentifiableElement("IS_THEME"),
);
