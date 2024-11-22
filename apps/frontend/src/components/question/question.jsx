import { memo } from "react";
import { Header } from "../header/header";
import { Statistics } from "./../statistics/statistics";
import { Button } from "./../button/button";
import "./_question.sass";

const QuestionComponent = function Question({
  currentMoney,
  insurance,
  currentTransport,
  buttons,
  text,
  buttonText1,
  buttonText2,
  buttonText3,
  actionButton1,
  actionButton2,
  actionButton3,
}) {
  let mas = [];
  for (let i = 0; i < buttons; i++) {
    mas.push(<Button color="red" text="Инвестировать в новую компанию" onClick={i == 1 ? actionButton1 : i == 2 ? actionButton2 : actionButton3} />);
  }
  return (
    <div className="question-div">
      <Header />
      <Statistics
        currentMoney={currentMoney}
        currentTransport={currentTransport}
        insurance={insurance}
      />
      <div className="question-div__event">
        <h1 className="question-div__text">{text}</h1>
      </div>
      <div className="question-div__buttons">
        {mas}
      </div>
    </div>
  );
};

export const Question = memo(QuestionComponent);
