import { memo, createContext } from "react";
import {Button} from '../button/button.jsx'
import {Header} from './../header/header'


import './_sectionHello.sass'
import img from '../../img/sectionHello.png'

const SectionHelloComponent = function SectionHello() {
  return (
    <div className="sectionHello">
      <Header />
      <section className="main-section">
        <h2 className="main-section__text">Игра по финансовой грамотности: умеете ли вы распоряжаться деньгами</h2>
        <img src={img}></img>
      </section>
      <div className="sectionHello__button">
        <Button color="green" text="Начать" />
      </div>
    </div>
  );
};

export const SectionHello = memo(SectionHelloComponent);
