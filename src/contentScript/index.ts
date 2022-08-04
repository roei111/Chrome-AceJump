import { convertToNumberingScheme } from "../utils/convertToNumberingScheme";
import { isHidden } from "../utils/isHidden";
import { isInViewport } from "../utils/isInViewport";

type Link = HTMLAreaElement | HTMLAnchorElement;

type HintItem = {
  hintElement: HTMLDivElement;
  borderElement: HTMLDivElement;
  link: Link;
  key: string;
}

type ElementReact = {
  top: number;
  left: number;
  height: number;
  width: number;
}

const HINTS_WRAPPER_ID = "hints-wrapper";
const CURRENT_TEXT_ID = "current-text-hint";
const backgroundColor = "yellow";
const highlightColor = "greenyellow";
const borderColor = "red";
const borderFillColor = "#4958f8";

let hintItems: HintItem[] = [];
let wrapperElement: HTMLDivElement | null = null;
let currentTextElement: HTMLDivElement | null = null;
let currentKeys = "";

function removeElementById(id: string) {
  const currentElement = document.getElementById(id);

  if (currentElement) {
    currentElement.parentElement?.removeChild(currentElement);
  }
}


function createHintsWrapperElement() {
  removeElementById(HINTS_WRAPPER_ID);

  const div = document.createElement("div");

  div.style.position = "absolute";
  div.style.top = "0";
  div.style.bottom = "0";
  div.style.left = "0";
  div.style.right = "0";
  div.style.zIndex = "9999";

  div.id = HINTS_WRAPPER_ID;

  div.onclick = () => {
    clearData();
  };

  return div;
}

function createHintElement(key: string, {
  top,
  left,
  height,
}: ElementReact) {
  const div = document.createElement("div");

  div.style.height = "20px";
  div.style.background = backgroundColor;
  div.style.color = "black";

  div.textContent = key;
  div.style.position = "fixed";
  div.style.zIndex = "99999";

  div.style.top = top - 38 <= 0 ? `${top + height}px` : `${top - 18}px`;
  div.style.left = `${left}px`;

  return div;
}

function createBorderElement({
  top,
  left,
  height,
  width,
}: ElementReact) {
  const div = document.createElement("div");

  div.style.position = "fixed";
  div.style.zIndex = "99999";

  div.style.border = `1px solid ${borderColor}`;

  div.style.top = `${top}px`;
  div.style.left = `${left}px`;
  div.style.height = `${height}px`;
  div.style.width = `${width}px`;

  return div;
}

function createCurrentTextElement() {
  removeElementById(CURRENT_TEXT_ID);

  const div = document.createElement("div");

  div.style.position = "fixed";
  div.style.zIndex = "99999";

  div.style.bottom = "8px";
  div.style.left = "8px";

  div.id = CURRENT_TEXT_ID;

  div.style.border = "1px solid green";

  return div;
}

function updateHighlightStyles(search: string) {
  hintItems.forEach(({ hintElement, key, borderElement }) => {
    const firstPart = key.substring(0, search.length);

    if (search && firstPart === search) {
      const secondPart = key.substring(search.length);

      hintElement.innerHTML = `
        <span 
          style="background-color: ${highlightColor}; height: 20px"
        >
          ${firstPart}
        </span>
        ${secondPart}
      `;

      borderElement.style.backgroundColor = borderFillColor;
      borderElement.style.opacity = "0.2";
    } else {
      hintElement.textContent = key;
      borderElement.style.backgroundColor = "unset";
      borderElement.style.opacity = "unset";
    }
  });
}

function updateCurrentText(newText: string) {
  currentKeys = newText;

  if (currentTextElement) {
    currentTextElement.textContent = newText;
  }
}

function keydownHandler(event: KeyboardEvent) {
  if (hintItems.length && event.key.length === 1 && event.key.match(/[a-z]/i)) {
    updateCurrentText(currentKeys + event.key.toUpperCase());
    updateHighlightStyles(currentKeys);
  }

  if (event.key === "Enter" && currentKeys.length) {
    const hintItem = hintItems.find(({ key }) => key === currentKeys);

    if (hintItem) {
      hintItem.link.click();
    }

    clearData();
  }

  if (event.key === "Escape") {
    clearData();
  }

  if (event.key === "Backspace") {
    const newText = currentKeys.substring(0, currentKeys.length - 1);
    updateCurrentText(newText);
    updateHighlightStyles(newText);
  }

}

const clearData = () => {
  hintItems = [];
  updateCurrentText("");
  removeElementById(HINTS_WRAPPER_ID);
  removeElementById(CURRENT_TEXT_ID);
  document.removeEventListener("keydown", keydownHandler);
  document.removeEventListener("scroll", clearData);
};

function getVisibleLinks() {
  return Array.from(document.links)
    .reduce<Link[]>((links, currentLink) => {
      if (isInViewport(currentLink) && !isHidden(currentLink)) {
        return [...links, currentLink];
      }

      return links;
    }, []);
}

browser.runtime.onMessage.addListener(() => {
  clearData();
  const visibleLinks = getVisibleLinks();
  wrapperElement = createHintsWrapperElement();
  currentTextElement = createCurrentTextElement();
  document.addEventListener("keydown", keydownHandler);
  document.addEventListener("scroll", clearData);

  hintItems = visibleLinks.map((link, index) => {
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

    const hintElement = createHintElement(key, elementRectData);
    const borderElement = createBorderElement(elementRectData);

    wrapperElement?.appendChild(hintElement);
    wrapperElement?.appendChild(borderElement);

    return {
      hintElement: hintElement,
      borderElement,
      link,
      key,
    };
  });

  document.body.appendChild(wrapperElement);
  document.body.appendChild(currentTextElement);
});
