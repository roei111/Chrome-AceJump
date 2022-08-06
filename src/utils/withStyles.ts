import { getTheme, Theme } from "../contentScript/theme";
import { entries } from "./entries";

type ChangeableCSSStyles = Omit<CSSStyleDeclaration, "length" | "parentRule" | "getPropertyPriority" | "getPropertyValue" | "item" | "removeProperty" | "setProperty">

type StyleArg = Partial<ChangeableCSSStyles> | ((theme: Theme) => Partial<ChangeableCSSStyles>)

export function withStyles<T extends HTMLElement = HTMLElement>(element: T) {
  return async (styleArg: StyleArg) => {

    const styles = typeof styleArg === "function" ? styleArg(await getTheme()) : styleArg;

    entries(styles).forEach(([style, value]) => {
      if (value !== undefined) {
        element.style[style] = value;
      }
    });

    return element;
  };
}