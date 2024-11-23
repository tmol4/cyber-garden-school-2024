import { memo, useState, useContext } from "react";
import clsx from "clsx";
import { Header } from "../header/header";
import { Statistics } from "./../statistics/statistics";
import { Button } from "@star4/react";
import { appContext } from "./../../app";
import "./_question.sass";

import imgForQuestion from "./../../img/home.jpeg";
import shawarma from "./../../img/shawarma.jpg";

const quets = [
    "Судьба зависит от нашего выбора",
    "Не расстраивайтесь, если что-то не получилось!",
    "Всё таки нужно было остаться дома...",
];

const QuestionComponent = function Question() {
    const { currentState } = useContext(appContext);
    const [time, setTime] = useState(currentState.toTheEnd);
    const [blackWindow, setBlackWindow] = useState(0);
    const [start, setStart] = useState(0);
    let mas = [];
    for (let i = 0; i < currentState.buttons; i++) {
        mas.push(
            <Button
                key={i}
                variant="filled"
                className="white buttonToClick"
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
                    setBlackWindow(1);
                    setTimeout(() => {
                        setBlackWindow(0);
                    }, 2500);
                }}
            />
        );
    }
    return start == 1 ? (
        <>
            <img
                src={
                    currentState.image == "home"
                        ? imgForQuestion
                        : imgForQuestion
                }
                className="question-div__img"
            />
            <div className="question-div">
                <Header />
                <Statistics
                    currentMoney={currentState.balance}
                    credit={currentState.credit}
                    time={time}
                />
                <div className="question-div__event">
                    <h1 className="question-div__text">{currentState.text}</h1>
                </div>
                <div className="question-div__buttons">{mas}</div>
            </div>
            <div
                className={clsx({
                    "black-window": true,
                    "black-window_active": blackWindow,
                })}
            >
                <div className="black-window__container">
                    <h1 className="black-window__text">
                        {quets[Math.floor(Math.random() * quets.length)]}
                    </h1>
                </div>
            </div>
        </>
    ) : (
        <div
            className={clsx({
                "start-div": true,
            })}
        >
            <img src={shawarma} className="start-div__shawarma" />
            <div className="start-div__section">
                <h1 className="start-div__start-text">
                    Вам предстоит играть за начинающего бизнесмена-шаурмиста в
                    суровых реалях России
                </h1>
                <Button
                    variant="filled"
                    className="start-div__start-button white"
                    label="Продолжить"
                    onClick={() => {
                        setStart(1);
                    }}
                />
            </div>
        </div>
    );
};

export const Question = memo(QuestionComponent);
