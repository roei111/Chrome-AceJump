import { COMMANDS } from "../constants/commands";
import { CURRENT_TEXT_ID, HINTS_WRAPPER_ID } from "../constants/IDs";
import { createEnteredTextElement } from "../elementCreators/createEnteredTextElement";
import { createHintElement } from "../elementCreators/createHintElement";
import { createHintsWrapperElement } from "../elementCreators/createHintsWrapperElement";
import { createLinkHighlighterElement } from "../elementCreators/createLinkHighlighterElement";
import { MessageType } from "../types/MessageType";
import { convertToNumberingScheme } from "../utils/convertToNumberingScheme";
import { getVisibleLinks } from "../utils/getVisibleLinks";
import { removeElementById } from "../utils/removeElementById";
import { withStyles } from "../utils/withStyles";
import { Store } from "./store";

const store = new Store();

function updateHighlightStyles(search: string) {
  store.hintItems.forEach(({ hintElement, key, linkHighlighterElement }) => {
    const firstPart = key.substring(0, search.length);

    if (search && firstPart === search) {
      withStyles(hintElement.selection)((theme) => {
        return ({
          width: `${firstPart.length * (theme.hint.size * 0.5714285714285)}px`,
        });
      });
    } else {
      withStyles(hintElement.selection)(({
        width: `0`,
      }));
    }
  });
}

function keydownHandler(event: KeyboardEvent) {
  if (store.hintItems.length && event.key.length === 1 && event.key.match(/[a-z]/i)) {
    store.setCurrentKeys(store.currentKeys + event.key.toUpperCase());
    updateHighlightStyles(store.currentKeys);
  }

  if (event.key === "Enter" && store.currentKeys.length) {
    const hintItem = store.hintItems.find(({ key }) => key === store.currentKeys);

    if (hintItem) {
      hintItem.link.click();
    }

    clearData();
  }

  if (event.key === "Escape") {
    clearData();
  }

  if (event.key === "Backspace") {
    const newText = store.currentKeys.substring(0, store.currentKeys.length - 1);
    store.setCurrentKeys(newText);
    updateHighlightStyles(newText);
  }
}

const clearData = () => {
  store.clear();
  removeElementById(HINTS_WRAPPER_ID);
  removeElementById(CURRENT_TEXT_ID);
  document.removeEventListener("keydown", keydownHandler);
  document.removeEventListener("scroll", clearData);
};

browser.runtime.onMessage.addListener((message: MessageType) => {
  if (message.command === COMMANDS.HIGHLIGHT) {
    clearData();

    const visibleLinks = getVisibleLinks();

    const wrapperElement = createHintsWrapperElement();
    const currentTextElement = createEnteredTextElement();
    wrapperElement.addEventListener("click", clearData);
    document.addEventListener("keydown", keydownHandler);
    document.addEventListener("scroll", clearData);

    store.setHintItems(visibleLinks.map((link, index) => {
      const key = convertToNumberingScheme(index);

      const viewportOffset = link.getBoundingClientRect();

      const top = viewportOffset.top;
      const left = viewportOffset.left;

      const elementRectData = {
        top,
        left,
        width: viewportOffset.width,
        height: viewportOffset.height,
      };

      const { hint, selection, root } = createHintElement(elementRectData);
      hint.textContent = key;
      const borderElement = createLinkHighlighterElement(elementRectData);

      wrapperElement?.appendChild(borderElement);
      wrapperElement?.appendChild(root);

      return {
        hintElement: { hint, selection, root },
        linkHighlighterElement: borderElement,
        link,
        key,
      };
    }));

    document.body.appendChild(wrapperElement);
    document.body.appendChild(currentTextElement);

    store.setWrapperElement(wrapperElement);
    store.setCurrentTextElement(currentTextElement);
  }
});
