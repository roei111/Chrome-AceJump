import { ElementReact } from "../types/ElementReact";
import { Theme } from "../utils/theme";
import { withStyles } from "../utils/withStyles";

function createHintStyle(options: ElementReact) {
  const top = options.top - 18 <= 0 ? `${options.top + options.height}px` : `${options.top - 18}px`;

  return (theme: Theme) => {
    return {
      position: "fixed",
      top,
      left: `${options.left}px`,
      zIndex: "99999",
      color: "black",
      background: theme.hint.background,
      fontSize: `${theme.hint.size}px`,
      borderRadius: "2px",
      paddingLeft: "1px",
      paddingRight: "1px",
      fontFamily: "monospace",
    };
  };
}

export function createHintElement(options: ElementReact) {
  const div = withStyles(document.createElement("div"))(createHintStyle(options));

  const selection = withStyles(document.createElement("div"))((theme) => ({
    position: "absolute",
    top: "0",
    left: "0",
    bottom: "0",
    width: "0",
    background: theme.hint.highlight,
    zIndex: "-1",
  }));
  const hint = document.createElement("span");

  div.appendChild(hint);
  div.appendChild(selection);

  return {
    hint,
    selection,
    root: div,
  };
}