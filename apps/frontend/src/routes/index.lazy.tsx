import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { SectionHello } from "~/components/section-hello";
import { Hero } from "~/components/hero-old";

import heroImage from "~/assets/images/bank.jpeg";

import styles from "./index.module.sass";
import { ActionButton, ArrowForward, Button, FocusRing, MaterialSymbol, Ripple } from "@star4/react";
import { Theme } from "~/components/theme";
import { useRef } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main>
      <div className={styles["wrapper"]}>
        <div className={styles["hero"]}>
          <img
            className={styles["hero__image"]}
            src={heroImage}
            alt="Современный банк" />
          <Theme brightness="dark">
            <div className={styles["hero__content"]}>
              <div className={styles["hero__header"]}>
                <h1 className={styles["hero__headline"]}>Путь шаурмиста</h1>
                <p className={styles["hero__supporting-text"]}>
                  Развитие бизнеса в суровых реалях Таганрога
                </p>
              </div>
              <div className={styles["hero__actions"]}>
                <Button variant="filled" leadingIcon={<MaterialSymbol name="stadia_controller" />} label="Играть!" />
                <ActionButton
                  icon={<ArrowForward />}
                  label="Играть!" />
                <HeroButton />
              </div>
            </div>
          </Theme>
        </div>
      </div>
    </main>
  );
}


const HeroButton = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <Link
      ref={ref}
      className={styles["hero-button"]}
      to="/play">
        <Ripple for={ref} />
        <FocusRing for={ref} />
        <MaterialSymbol
          className={styles["hero-button__icon"]}
          name="stadia_controller" />
        <span className={styles["hero-button__label"]}>
          Играть!
        </span>
    </Link>
  );
}
