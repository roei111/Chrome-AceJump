import { COMMANDS } from "../constants/commands";
import { CURRENT_TEXT_ID, HINTS_WRAPPER_ID } from "../constants/IDs";
import { MessageType } from "../types/MessageType";
import { convertToNumberingScheme } from "../utils/convertToNumberingScheme";
import { getVisibleLinks } from "../utils/getVisibleLinks";
import { removeElementById } from "../utils/removeElementById";
import { withStyles } from "../utils/withStyles";
import { createEnteredTextElement } from "./elementCreators/createEnteredTextElement";
import { createHintElement } from "./elementCreators/createHintElement";
import { createHintsWrapperElement } from "./elementCreators/createHintsWrapperElement";
import { createLinkHighlighterElement } from "./elementCreators/createLinkHighlighterElement";
import { Store } from "./store";

const store = new Store();

function updateHighlightStyles(search: string) {
  store.hintItems.forEach(
    async ({ hintElement, key, linkHighlighterElement }) => {
      const firstPart = key.substring(0, search.length);

      if (search && firstPart === search) {
        await withStyles(hintElement.selection)((theme) => {
          return {
            width: `${
              firstPart.length * (Number(theme.hint.size) * 0.5714285714285)
            }px`,
          };
        });

        if (search === key) {
          await withStyles(linkHighlighterElement)((theme) => {
            return {
              backgroundColor: theme.link.fill,
              opacity: "0.2",
            };
          });
        } else {
          await withStyles(linkHighlighterElement)({
            backgroundColor: "unset",
            opacity: "unset",
          });
        }
      } else {
        await withStyles(hintElement.selection)({
          width: `0`,
        });
        await withStyles(linkHighlighterElement)({
          backgroundColor: "unset",
          opacity: "unset",
        });
      }
    }
  );
}

function keydownHandler(event: KeyboardEvent) {
  if (
    store.hintItems.length &&
    event.key.length === 1 &&
    event.key.match(/[a-z]/i)
  ) {
    store.setCurrentKeys(store.currentKeys + event.key.toUpperCase());
    updateHighlightStyles(store.currentKeys);
  }

  if (store.currentKeys.length) {
    const hintItem = store.hintItems.find(
      ({ key }) => key === store.currentKeys
    );

    if (hintItem) {
      if (event.shiftKey) {
        chrome.runtime.sendMessage({
          command: "openInBackground",
          url: hintItem.link.href,
        });
      } else {
        hintItem.link.click();
        clearData();
      }
    }
    store.setCurrentKeys("");
  }

  if (event.key === "Escape") {
    clearData();
  }

  if (event.key === "Backspace") {
    const newText = store.currentKeys.substring(
      0,
      store.currentKeys.length - 1
    );
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

chrome.runtime.onMessage.addListener(async (message: MessageType) => {
  if (message.command === COMMANDS.HIGHLIGHT) {
    clearData();

    const visibleLinks = getVisibleLinks();

    const wrapperElement = await createHintsWrapperElement();
    const currentTextElement = await createEnteredTextElement();
    wrapperElement.addEventListener("click", clearData);
    document.addEventListener("keydown", keydownHandler);
    document.addEventListener("scroll", clearData);

    store.setHintItems(
      await Promise.all(
        visibleLinks.map(async (link, index) => {
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

          const { hint, selection, root } = await createHintElement(
            elementRectData
          );
          hint.textContent = key;
          const borderElement = await createLinkHighlighterElement(
            elementRectData
          );

          wrapperElement?.appendChild(borderElement);
          wrapperElement?.appendChild(root);

          return {
            hintElement: { hint, selection, root },
            linkHighlighterElement: borderElement,
            link,
            key,
          };
        })
      )
    );

    document.body.appendChild(wrapperElement);
    document.body.appendChild(currentTextElement);

    store.setWrapperElement(wrapperElement);
    store.setCurrentTextElement(currentTextElement);
  }
});
