import { createIdentifiableElement } from "@star4/react";
import { memo } from "react";

import styles from "./hero.module.sass";

export namespace Hero {
  export type Props = {

  }
}

const HeroComponent = function Hero() {
  return (
    <div>

    </div>
  );
}

export const Hero = Object.assign(
  memo(HeroComponent),
  createIdentifiableElement("IS_HERO"),``
);
