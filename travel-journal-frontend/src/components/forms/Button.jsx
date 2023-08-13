import { useContext } from "react";
import { FormContext } from "./Form.jsx";
import "./Button.css";
import { Spinner } from "../icons/Spinner.jsx";

export function Button({ children, onClick, className, type }) {
  const { isSubmitting } = useContext(FormContext);
  return (
    <button
      type={type ?? "button"}
      className={"button  " + className}
      onClick={onClick}
      disabled={isSubmitting}
    >
      {isSubmitting && <Spinner />}
      {children}
    </button>
  );
}
