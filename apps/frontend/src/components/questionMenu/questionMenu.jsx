import { memo, useContext } from "react";
import "./questionMenu.sass";
import { appContext } from "../../app";

const QuestionMenuComponent = function QuestionMenu() {
  const { page, setPage, setCurrentState, currentState } =
    useContext(appContext);

  return (
    <div className="question-menu">
      <p
        onClick={() => {
          setCurrentState({
            currentPage: currentState.currentPage,
            balance: currentState.balance,
            insurance: currentState.insurance,
            transport: currentState.transport,
            toTheEnd: currentState.toTheEnd,
            buttonText1: currentState.buttonText1,
            buttonText2: currentState.buttonText2,
            buttonText3: currentState.buttonText3,
            id1: currentState.id1,
            id2: currentState.id2,
            id3: currentState.id3,
            text: currentState.text,
            buttons: currentState.buttons,
          });
          setPage("Book");
        }}
      >
        ?
      </p>
    </div>
  );
};

export const QuestionMenu = memo(QuestionMenuComponent);
