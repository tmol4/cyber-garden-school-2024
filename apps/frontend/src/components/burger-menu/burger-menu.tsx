import { memo } from "react";
import "./_burger-menu.sass";

const BurgerMenuComponent = function BurgerMenu() {
  return (
    <div className="menu-burger">
      <input
        type="checkbox"
        id="burger-button"
        name="burger-button"
        className="menu-burger__button"
      />
      <label htmlFor="burger-button" className="menu-burger__label">
        <div className="menu-burger__icon"></div>
      </label>
      <div className="menu-burger__background">
        <div className="menu-burger__level_1 menu-burger__level">1</div>
        <div className="menu-burger__level_2 menu-burger__level">2</div>
        <div className="menu-burger__level_3 menu-burger__level">3</div>
        <div className="menu-burger__level_4 menu-burger__level">4</div>
        <div className="menu-burger__level_5 menu-burger__level">5</div>
        <div className="menu-burger__level_6 menu-burger__level">6</div>
        <div className="menu-burger__level_7 menu-burger__level">7</div>
        <div className="menu-burger__level_8 menu-burger__level">8</div>
        <div className="menu-burger__level_9 menu-burger__level">9</div>
        <div className="menu-burger__level_10 menu-burger__level">10</div>
        <div className="menu-burger__level_11 menu-burger__level">11</div>
        <div className="menu-burger__level_12 menu-burger__level">R</div>
      </div>
      <div className="menu-burger__foreground"></div>
    </div>
  );
};

export const BurgerMenu = memo(BurgerMenuComponent);
