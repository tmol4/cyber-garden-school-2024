import { memo, useState, useContext } from "react";
import { Header } from "../header/header";
import { Statistics } from "./../statistics/statistics";
import { Button } from "@star4/react";
import { appContext } from "./../../app";
import "./_question.sass";
import imgForQuestion from './../../img/Home.jpeg'

const QuestionComponent = function Question() {
  const { currentState, setCurrentState } = useContext(appContext);
  const [time, setTime] = useState(currentState.toTheEnd);
  let mas = [];
  for (let i = 0; i < currentState.buttons; i++) {
    mas.push(
      <Button
        key={i}
        variant="filled"
        className="white"
        label={
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
        //    const response = await fetch("http://localhost:5000/event", {
        //     method: "POST",
        //     headers: {
        //       "Content-type": "application/json; charset=UTF-8",
        //     },
        //     body: JSON.stringify({}),
        //   });

          setTime(time - 1);
          setCurrentState({
            currentPage: "question",
            balance: currentState.balance,
            toTheEnd: time - 1,
            buttonText1: currentState.buttonText1,
            buttonText2: currentState.buttonText2,
            buttonText3: currentState.buttonText3,
            id1: currentState.id1,
            id2: currentState.id2,
            id3: currentState.id3,
            text: currentState.text,
            buttons: currentState.buttons,
            image: currentState.image
          });
        }}
      />
    );
  }
  return (
    <>
        <img src={currentState.image == "home" ? imgForQuestion : imgForQuestion} className="question-div__img" />
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
    </>
  );
};

export const Question = memo(QuestionComponent);
