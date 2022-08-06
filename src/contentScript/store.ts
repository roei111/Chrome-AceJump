import { HintItem } from "../types/HintItem";

export class Store {
  public hintItems: HintItem[] = [];
  public wrapperElement: HTMLDivElement | null = null;
  public currentTextElement: HTMLDivElement | null = null;
  public currentKeys = "";

  setCurrentKeys(text: string) {
    this.currentKeys = text;

    if (this.currentTextElement) {
      this.currentTextElement.textContent = text;
    }
  }

  setWrapperElement(wrapperElement: HTMLDivElement) {
    this.wrapperElement = wrapperElement;
  }

  setCurrentTextElement(currentTextElement: HTMLDivElement) {
    this.currentTextElement = currentTextElement;
  }

  setHintItems(hintItems: HintItem[]) {
    this.hintItems = hintItems;
  }

  clear() {
    this.wrapperElement = null;
    this.currentTextElement = null;
    this.currentKeys = "";
    this.hintItems = [];
  }
}