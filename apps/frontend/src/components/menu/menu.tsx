import { memo, useEffect, useRef, useState } from "react";
import { IconButton, MaterialSymbol, Popover, usePresence } from "@star4/react";

import { autoUpdate, computePosition, size, flip, offset, shift } from "@floating-ui/dom";

import styles from "./menu.module.sass";
import clsx from "clsx";

type Position = {
  x: number;
  y: number;
}

const MenuComponent = function Menu() {
  const [open, setOpen] = useState(false);

  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [transformOrigin, setTransformOrigin] = useState<Position>({ x: 0, y: 0 });

  const floatingRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<IconButton.Element>(null);

  const { isMounted, isVisible, isExiting, isEntering } = usePresence({
    source: open,
    transitionDuration: [500, 200],
  });

  const getTransformOrigin = (reference: HTMLElement, floating: HTMLElement): Position => {
    const referenceRect = reference.getBoundingClientRect();
    const floatingRect = floating.getBoundingClientRect();

    let x: number;
    let y: number = 0;
    console.log(referenceRect, floatingRect);
    if(referenceRect.left > floatingRect.right) {
      return { x: floatingRect.width, y }
    }
    if(referenceRect.right < floatingRect.left) {
      console.log("AAA")
      return { x: 0, y }
    }

    const center = referenceRect.left + referenceRect.width / 2;
    return { x: center - floatingRect.left, y };
  }

  useEffect(
    () => {
      const reference = anchorRef.current;
      const floating = floatingRef.current;
      if(!reference || !floating) return;

      const cleanup = autoUpdate(
        reference,
        floating,
        () => {
          computePosition(
            reference,
            floating,
            {
              strategy: "absolute",
              placement: "bottom",
              middleware: [
                offset(8),
                // flip(),
                shift({ padding: 24 }),
              ],
            },
          ).then(
            ({ x, y }) => {
              setPosition({ x, y });
              setTransformOrigin(getTransformOrigin(reference, floating));
            }
          );
        },
      );
      return () => {
        cleanup();
      };
    },
    [],
  );

  return (
    <div>
      <IconButton
        ref={anchorRef}
        onClick={() => setOpen(prev => !prev)}
        variant="filledTonal"
        selected={open}
        icon={<MaterialSymbol name={open ? "close" : "menu"} />} />
      <Popover open={isMounted} style={{ pointerEvents: "none" }}>
        <div
          ref={floatingRef}
          className={styles["menu__wrapper"]}
          style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}>
          <div
            className={
              clsx(
                styles["menu__container"],
                {
                  [styles["menu__container--entering"]]: isEntering,
                  [styles["menu__container--exiting"]]: isExiting,
                }
              )
            }
            style={{
              transformOrigin: `${transformOrigin.x}px ${transformOrigin.y}px`
            }}>
            <IconButton variant="filled" icon="1" />
            <IconButton variant="filled" icon="2" />
            <IconButton variant="filled" icon="3" />
            <IconButton variant="filled" icon="4" />
            <IconButton variant="filled" icon="5" />
            <IconButton variant="filled" icon="6" />
            <IconButton variant="filled" icon="7" />
            <IconButton variant="filled" icon="8" />
            <IconButton variant="filled" icon="9" />
            <IconButton variant="filled" icon="10" />
            <IconButton variant="filled" icon="11" />
            <IconButton variant="filled" icon="R" />
          </div>
        </div>
      </Popover>
    </div>

  );
};

export const Menu = memo(MenuComponent);
