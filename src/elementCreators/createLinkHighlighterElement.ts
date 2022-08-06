import { ElementReact } from "../types/ElementReact";
import { Theme } from "../utils/theme";
import { withStyles } from "../utils/withStyles";

function createHintStyle(options: ElementReact) {
  return (theme: Theme) => {
    return {
      position: "fixed",
      top: `${options.top}px`,
      left: `${options.left}px`,
      zIndex: "99999",
      color: "black",
      height: `${options.height}px`,
      width: `${options.width}px`,
      border: `1px solid ${theme.link.border}`,
      borderRadius: '4px',
    }
  }
}

export function createLinkHighlighterElement(options: ElementReact) {
  const div = document.createElement("div");

  return withStyles(div)(createHintStyle(options));
}