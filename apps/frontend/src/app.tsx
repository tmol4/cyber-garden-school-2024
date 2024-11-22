import { memo, useState, createContext } from "react";
import { SectionHello } from "./components/sectionHello/sectionHello.js";
import { Question } from "./components/question/question.jsx";
import { SectionWithInfo } from './components/sectionWithInfo/sectionWithInfo.jsx'

export const appContext = createContext({})

const AppComponent = function App() {
  const [page, setPage] = useState("Hello");
  const [currentState, setCurrentState] = useState({
    currentPage: "Hello",
    balance: 0,
    insurance: 0,
    transport: "trolley",
    toTheEnd: 0,
  });
  return <>
  <appContext.Provider value={{ page, setPage, currentState, setCurrentState }}>
    {page == "Hello" ? <SectionHello /> : page == "Book" ? <SectionWithInfo /> : <Question insurance={currentState.insurance} currentMoney={currentState.balance} currentTransport={currentState.transport} buttons={3}/>}
  </appContext.Provider>
  </>;
};

export const App = memo(AppComponent);
