import { memo } from "react";
import { QuestionMenu } from "../questionMenu";
import "./_header.sass";

const HeaderComponent = function Header() {
  return (
    <section className="header">
      <h1 className="header__h1">Serious people</h1>
      <QuestionMenu />
    </section>
  );
};

export const Header = memo(HeaderComponent);
