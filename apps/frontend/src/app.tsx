import { memo, useState, createContext } from "react";
import { SectionHello } from "./components/sectionHello/sectionHello.js";
import { Question } from "./components/question/question.jsx";
import { SectionWithInfo } from './components/sectionWithInfo/sectionWithInfo.jsx'

export const appContext = createContext({})

const AppComponent = function App() {
  const [page, setPage] = useState("Hello");
  return <>
  <appContext.Provider value={{ page, setPage }}>
    {page == "Hello" ? <SectionHello /> : page == "Book" ? <SectionWithInfo /> : <Question />}
  </appContext.Provider>
  </>;
};

export const App = memo(AppComponent);
