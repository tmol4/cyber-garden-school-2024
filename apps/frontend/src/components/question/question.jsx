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
}) {
  let mas = [];
  for (let i = 0; i < buttons; i++) {
    mas.push(<Button color="red" text="TEXT"/>);
  }
  return (
    <>
      <Header />
      <Statistics
        currentMoney={currentMoney}
        currentTransport={currentTransport}
        insurance={insurance}
      />
      <div className="buttonsContainer">
        {mas}
      </div>
    </>
  );
};

export const Question = memo(QuestionComponent);
