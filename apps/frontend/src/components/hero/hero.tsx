import { ActionButton, ArrowForward, createIdentifiableElement, NorthEast } from "@star4/react";
import { memo } from "react";
import heroImage from "~/assets/images/sectionHello.png";

import styles from "./hero.module.sass";

export namespace Hero {
  export type Props = {

  }
}

const HeroComponent = function Hero() {
  return (
    <div className={styles["hero"]}>
      <div className={styles["hero__content"]}>
        <div className={styles["hero__header"]}>
          <h1 className={styles["hero__headline"]}>
            Budget helper
          </h1>
          <p className={styles["hero__supporting-text"]}>
            Узнай, умеешь ли ты распоряжаться деньгами
          </p>
        </div>
        <ActionButton
          onClick={() => {}}
          icon={<NorthEast />}
          label="Начать" />
      </div>
      <div className={styles["hero__image"]}>
        <img src={heroImage} alt="Hero image" />
      </div>

    </div>
  );
}

export const Hero = Object.assign(
  memo(HeroComponent),
  createIdentifiableElement<Hero.Props>("IS_HERO"),
);
