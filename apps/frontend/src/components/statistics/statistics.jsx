import { memo } from "react";
import "./_statistics.sass";
import cash from "./../../img/cash.png";
import clock from "./../../img/clock.png";
import creditImg from './../../img/credit.png'

const StatisticsComponent = function Statistics({
  currentMoney,
  credit,
  time,
}) {
  return (
    <div className="statistics-bar">
      <div className="statistics-bar__money">
        <p className="statistics-bar__cash">{currentMoney}</p>
        <img src={cash} className="statistics-bar__img_1"></img>
      </div>
      <div className="statistics-bar__insurance">
        <p className="statistics-bar__status">{time}</p>
        <img src={clock} className="statistics-bar__img_3"></img>
      </div>
      <div className="statistics-bar__transport">
      <p className="statistics-bar__status">{credit}</p>
        <img
          src={creditImg}
          className="statistics-bar__img_2"
        />
      </div>
    </div>
  );
};

export const Statistics = memo(StatisticsComponent);
