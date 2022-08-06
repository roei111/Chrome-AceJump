import { CURRENT_TEXT_ID } from "../../constants/IDs";
import { removeElementById } from "../../utils/removeElementById";
import { Theme } from "../../utils/theme";
import { withStyles } from "../../utils/withStyles";

function createEnteredTextStyle(theme: Theme) {
  return {
    position: "fixed",
    zIndex: "99999",
    bottom: "8px",
    left: "8px",
    border: `1px solid ${theme.entered.border}`,
    borderRadius: '4px',
    paddingLeft: '2px',
    paddingRight: '2px',
  }
}

export function createEnteredTextElement() {
  removeElementById(CURRENT_TEXT_ID);

  const div = document.createElement("div");

  div.id = CURRENT_TEXT_ID;

  return withStyles(div)(createEnteredTextStyle);
}