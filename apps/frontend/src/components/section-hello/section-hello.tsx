import { memo } from "react";
import { Button } from "../button";
import { BurgerMenu } from "../burger-menu";
import { Menu } from "../menu";

import img from "../../assets/images/sectionHello.png";
import "./_section-hello.sass";

const SectionHelloComponent = function SectionHello() {
  return (
    <div className="sectionHello">
      <header className="header">
        <h1 className="header__h1">Budget helper</h1>
        <Menu />
      </header>
      <section className="main-section">
        <h2 className="main-section__text">Игра по финансовой грамотности: умеете ли вы распоряжаться деньгами?</h2>
        <img src={img}></img>
      </section>
      <div className="sectionHello__button">
        <Button color="green" text="Начать" />
      </div>
    </div>
  );
};

export const SectionHello = memo(SectionHelloComponent);
