import { memo, useState, useContext } from "react";
import { Header } from "../header/header";
import { Statistics } from "./../statistics/statistics";
import { Button } from "./../button/button";
import { appContext } from "./../../app";
import "./_question.sass";

const QuestionComponent = function Question() {
  const { currentState, setCurrentState } = useContext(appContext);
  const [time, setTime] = useState(currentState.toTheEnd);
  let mas = [];
  for (let i = 0; i < currentState.buttons; i++) {
    mas.push(
      <Button
        key={i}
        color="red"
        text={
          i == 1
            ? currentState.buttonText1
            : i == 2
            ? currentState.buttonText2
            : currentState.buttonText3
        }
        onClick={async () => {
          const idToSend =
            i == 1
              ? currentState.id1
              : i == 2
              ? currentState.id2
              : currentState.id3;
          fetch("http://localhost:4000/", {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              currentMoney: currentState.currentMoney,
              idToSend,
            }),
          });
          setTime(time - 1);
          setCurrentState({
            currentPage: "question",
            balance: currentState.balance,
            insurance: currentState.insurance,
            transport: currentState.transport,
            toTheEnd: time - 1,
            buttonText1: currentState.buttonText1,
            buttonText2: currentState.buttonText2,
            buttonText3: currentState.buttonText3,
            id1: currentState.id1,
            id2: currentState.id2,
            id3: currentState.id3,
            text: currentState.text,
            buttons: currentState.buttons,
          });
        }}
      />
    );
  }
  return (
    <div className="question-div">
      <Header />
      <Statistics
        currentMoney={currentState.balance}
        currentTransport={currentState.currentTransport}
        time={time}
      />
      <div className="question-div__event">
        <h1 className="question-div__text">{currentState.text}</h1>
      </div>
      <div className="question-div__buttons">{mas}</div>
    </div>
  );
};

export const Question = memo(QuestionComponent);
