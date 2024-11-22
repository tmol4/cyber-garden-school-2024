import { memo, useContext } from "react";
import "./questionMenu.sass";
import { appContext } from "../../app";

const QuestionMenuComponent = function QuestionMenu() {
  const { page, setPage, setCurrentState, currentState } = useContext(appContext)

  return (
    <div className="question-menu">
      <p onClick={() => {
        setCurrentState({
          currentPage: page,
          balance: currentState.balance,
          insurance: currentState.insurance,
          transport: currentState.transport,
          toTheEnd: currentState.toTheEnd,
        })
        setPage("Book")}
        }>?</p>
    </div>
  );
};

export const QuestionMenu = memo(QuestionMenuComponent);
