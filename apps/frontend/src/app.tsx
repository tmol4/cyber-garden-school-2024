import { memo, useState, createContext } from "react";
import { SectionHello } from "./components/sectionHello/sectionHello.js";
import { Question } from "./components/question/question.jsx";
import { SectionWithInfo } from "./components/sectionWithInfo/sectionWithInfo.jsx";

export const appContext = createContext({});

const AppComponent = function App() {
  const [page, setPage] = useState("Hello");
  const [currentState, setCurrentState] = useState({
    currentPage: "Hello",
    balance: 1230,
    toTheEnd: 0,
    buttonText1: "TEST text",
    buttonText2: "TEST text",
    buttonText3: "TEST text",
    id1: -1,
    id2: -2,
    id3: -3,
    text: "TEST text",
    buttons: 3,
    image: "home",
  });
  return (
    <>
      <appContext.Provider
        value={{ page, setPage, currentState, setCurrentState }}
      >
        {page == "Hello" ? (
          <SectionHello />
        ) : page == "Book" ? (
          <SectionWithInfo />
        ) : (
          <Question />
        )}
      </appContext.Provider>
    </>
  );
};

export const App = memo(AppComponent);
