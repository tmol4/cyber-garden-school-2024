import { memo } from "react";
import "./_statistics.sass"
import cash from "./../../img/cash.png";
import trolley from './../../img/trolley.png'
import car from './../../img/car.png'
import ins from './../../img/ins.png'

const StatisticsComponent = function Statistics({ currentMoney, currentTransport, insurance }) {
  return (
    <div className="statistics-bar">
      <div className="statistics-bar__money">
        <p className="statistics-bar__cash">{currentMoney}</p>
        <img src={cash} className="statistics-bar__img_1"></img>
      </div>
      <div className="statistics-bar__insurance">
        <img src={ins} className="statistics-bar__img_3"></img>
        <p className="statistics-bar__status">{insurance == 1 ? "YES" : "NO"}</p>
      </div>
      <div className="statistics-bar__transport">
        <img src={currentTransport == 1 ? car : trolley} className="statistics-bar__img_2"></img>
      </div>
    </div>
  );
};

export const Statistics = memo(StatisticsComponent);
