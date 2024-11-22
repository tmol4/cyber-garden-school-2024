import { memo } from "react";
import "./_statistics.sass"
import img from "./../../img/1852975 1.png";
import img2 from './../../img/4813315 2.png'
import trolley from './../../img/1962592 1.png'
import car from './../../img/car-svgrepo-com.png'

const StatisticsComponent = function Statistics({ currentMoney, currentTransport }) {
  return (
    <div className="statistics-bar">
      <div className="statistics-bar__money">
        <p className="statistics-bar__cash">{currentMoney}</p>
        <img src={img} className="statistics-bar__img_1"></img>
      </div>
      <div className="statistics-bar__insurance">
        <img src={currentTransport == "car" ? car : trolley} className="statistics-bar__img_3"></img>
        <h1 className="statistics-bar__status">X</h1>
      </div>
      <div className="statistics-bar__transport">
        <img src={img2} className="statistics-bar__img_2"></img>
      </div>
    </div>
  );
};

export const Statistics = memo(StatisticsComponent);
