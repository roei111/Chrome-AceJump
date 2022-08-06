import { Link } from "./Link";

export type HintItem = {
  hintElement: {
    root: HTMLDivElement,
    selection: HTMLDivElement,
    hint: HTMLSpanElement,
  };
  linkHighlighterElement: HTMLDivElement;
  link: Link;
  key: string;
}
