import { memo } from "react";
import clsx from "clsx";
import './_button.sass'

const ButtonComponent = function Button(props) {
  const { color, text, ...rest } = props;
  return (
    <div className={clsx({
    "button": true,
    [`button__${color}`]: color,
    })} {...rest}>
      <div className="button__text"><p>{text}</p></div>
    </div>
  );
};

export const Button = memo(ButtonComponent);
