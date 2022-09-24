import React from "react";
import "./Button.scss";

export interface ButtonProps {
  label: string;
  renderAs ?: string;
}

const Button = (props: ButtonProps) => {
  return <button>{props.label} {props.renderAs}</button>;
};

export default Button;
