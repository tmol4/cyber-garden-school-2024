import { memo, useContext } from "react";
import { Button } from "@star4/react";
import { Header } from "./../header/header";
import { appContext } from "../../app";

import "./_sectionHello.sass";
import img from "../../img/sectionHello.png";
import background from "../../img/bank.jpeg";

const SectionHelloComponent = function SectionHello() {
    let { page, setPage, setCurrentState } = useContext(appContext);
    console.log(Math.round(Math.random()));
    return (
        <>
            <img src={background} className="sectionHello__background" />
            <div className="sectionHello">
                <Header />
                <section className="main-section">
                    <h2 className="main-section__text">
                        Игра по финансовой грамотности: умеете ли вы
                        распоряжаться деньгами
                    </h2>
                </section>
                <div className="sectionHello__button">
                    <Button
                        variant="filled"
                        label="Начать"
                        className="position"
                        onClick={() => {
                            setCurrentState({
                                credit: -200,
                                balance: 1230,
                                toTheEnd: 15,
                                buttonText1: "Сообщить в милицию",
                                buttonText2: "Украсть у бабки кошелек",
                                buttonText3: "Да",
                                id1: -1,
                                id2: -2,
                                id3: -3,
                                text: "Вас ограбили на улице!",
                                buttons: 3,
                            });
                            setPage("question");
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export const SectionHello = memo(SectionHelloComponent);
