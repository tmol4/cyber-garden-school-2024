import { memo } from "react";
import { Header } from "../header/header";
import { Statistics } from "./../statistics/statistics";
import "./_question.sass";

const QuestionComponent = function Question(props) {
  return (
    <>
      <Header />
      <Statistics currentMoney={10000} />
    </>
  );
};

export const Question = memo(QuestionComponent);
