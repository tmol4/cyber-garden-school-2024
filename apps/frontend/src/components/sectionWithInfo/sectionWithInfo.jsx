import {memo, useContext} from 'react'
import { appContext } from "../../app";

const SectionWithInfoComponent = function SectionWithInfo() {
  const {page, setPage} = useContext(appContext)
  return (
    <div className="book">
      <h1 className="book__leave" onClick={() => {setPage("Hello")}}>X</h1>
      <h2>Как управлять личными финансами?</h2>
    <p>
      Игра о том, как обрести финансовое спокойствие и уверенность в отношениях с деньгами
    </p>
    </div>
  )
}

export const SectionWithInfo = memo(SectionWithInfoComponent)
  