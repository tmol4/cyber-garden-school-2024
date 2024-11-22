import { memo, type ReactNode } from "react";
import clsx from "clsx";
import "./_button.sass";

export namespace Button {
  export type Props = {
    color: string;
    text: ReactNode;
  }
}

const ButtonComponent = function Button({ color, text } : Button.Props) {
  return (
    <div
      className={
        clsx({
          "button": true,
          [`button__${color}`]: color,
        })
      }>
        <div className="button__text">
          {text}
        </div>
    </div>
  );
};

export const Button = memo(ButtonComponent);
