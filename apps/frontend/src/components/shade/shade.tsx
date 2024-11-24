import { createIdentifiableElement, Lenis, Popover, useLenis, usePresence, usePreviousState } from "@star4/react";
import type { ReactNode } from "@tanstack/react-router";
import { forwardRef, memo, useCallback, useEffect, useState, type HTMLAttributes, type RefObject, type UIEventHandler } from "react"

import clsx from "clsx";

import styles from "./shade.module.sass";

export namespace Shade {
  export type Props =
    & Omit<
      Lenis.Wrapper.Props,
      "children"
    >
    & {
      onEnter?: (animating: boolean) => void;
      onExit?: (animating: boolean) => void;
      onMount?: () => void;
      onUnmount?: () => void;
      open?: boolean;
      children?: ReactNode;
    };
  export interface Element extends Lenis.Wrapper.Element {}
}

const ShadeComponent = forwardRef<Shade.Element, Shade.Props>(
  function Shade(
    {
      className,
      open = false,
      onEnter,
      onExit,
      onMount,
      onUnmount,
      children,
      ...rest
    },
    forwardedRef,
  ) {
    const lenis = useLenis({ root: true })?.lenis;

    const { isMounted, isVisible, isEntering, isExiting, isAnimating } = usePresence({
      source: open,
      transitionDuration: [800, 400]
    });

    useEffect(
      () => {
        const isScrollLocked = isMounted && !isAnimating;

        if(isScrollLocked) lenis?.stop();
        else lenis?.start();

        document.body.toggleAttribute(
          "data-scroll-lock",
          isScrollLocked,
        );
      },
      [lenis, isMounted, isAnimating],
    );

    useEffect(
      () => {
        if(isMounted) onMount?.();
        else onUnmount?.();
      },
      [isMounted],
    );
    useEffect(
      () => {
        if(isEntering && !isExiting) {
          onEnter?.(true);
          onExit?.(false);
        } else if(!isEntering && isExiting) {
          onEnter?.(false);
          onExit?.(true);
        } else {
          onEnter?.(false);
          onExit?.(false);
        }
      },
      [isEntering, isExiting],
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
      <Popover
        className={
          clsx(
            styles["shade"],
            isVisible && styles["shade--visible"],
            isExiting && styles["shade--exiting"],
          )
        }
        open={isMounted}>
          <div className={clsx(
            styles["shade__backdrop"],
            isVisible && styles["shade__backdrop--visible"],
            isExiting && styles["shade__backdrop--exiting"],
          )} />
          <div
            className={clsx(
              styles["shade__container"],
              isVisible && styles["shade__container--visible"],
              isExiting && styles["shade__container--exiting"],
            )}>
              <Lenis.Wrapper
                ref={forwardedRef}
                className={clsx(
                  styles["shade__scroller"],
                  isAnimating && styles["shade__scroller--scroll-locked"],
                  className,
                )}
                {...rest}>
                  <Lenis.Content>
                    {children}
                  </Lenis.Content>
              </Lenis.Wrapper>
          </div>
      </Popover>
    );
  }
);

export const Shade = Object.assign(
  memo(ShadeComponent),
  createIdentifiableElement<Shade.Props>("IS_SHADE"),
)
