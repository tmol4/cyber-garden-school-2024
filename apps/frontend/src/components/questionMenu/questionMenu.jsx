import { memo, useContext } from "react";
import "./questionMenu.sass";
import { appContext } from "../app";

const QuestionMenuComponent = function QuestionMenu() {
  const { page, setPage } = useContext(appContext)
  return (
    <div className="question-menu">
      <p onClick={() => {setPage("Book")}}>?</p>
    </div>
  );
};

export const QuestionMenu = memo(QuestionMenuComponent);
