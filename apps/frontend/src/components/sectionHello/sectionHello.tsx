import { memo, useContext } from "react";
import { Button } from "../button/button.jsx";
import { Header } from "./../header/header";
import { appContext } from "../../app";

import "./_sectionHello.sass";
import img from "../../img/sectionHello.png";

const SectionHelloComponent = function SectionHello() {
  let { page, setPage, setCurrentState } = useContext(appContext);
  console.log(Math.round(Math.random()));
  return (
    <div className="sectionHello">
      <Header />
      <section className="main-section">
        <h2 className="main-section__text">
          Игра по финансовой грамотности: умеете ли вы распоряжаться деньгами
        </h2>
        <img src={img}></img>
      </section>
      <div className="sectionHello__button">
        <Button
          color="green"
          text="Начать"
          onClick={() => {
            setCurrentState({
              currentPage: "question",
              balance: 1230,
              insurance: 0,
              transport: "trolley",
              toTheEnd: 15,
              buttonText1: "Инвестировать в новую компанию",
              buttonText2: "TEST text",
              buttonText3: "TEST text",
              id1: -1,
              id2: -2,
              id3: -3,
              text: "TEST text",
              buttons: 3,
            });
            setPage("question");
          }}
        />
      </div>
    </div>
  );
};

export const SectionHello = memo(SectionHelloComponent);
