import { HINTS_WRAPPER_ID } from "../constants/IDs";
import { removeElementById } from "../utils/removeElementById";
import { withStyles } from "../utils/withStyles";

function createHintsWrapperStyle() {
  return {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    zIndex: "9999",
    width: "100wh",
    height: "100vh",
  };
}

export function createHintsWrapperElement() {
  removeElementById(HINTS_WRAPPER_ID);

  const div = document.createElement("div");

  div.id = HINTS_WRAPPER_ID;

  return withStyles(div)(createHintsWrapperStyle);
}