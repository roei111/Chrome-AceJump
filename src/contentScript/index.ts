import { convertToNumberingScheme } from "../utils/convertToNumberingScheme";
import { isHidden } from "../utils/isHidden";
import { isInViewport } from "../utils/isInViewport";

type Link = HTMLAreaElement | HTMLAnchorElement;

type HintItem = {
  hintElement: HTMLDivElement;
  link: Link;
  key: string;
}

const HINTS_WRAPPER_ID = "hints-wrapper";
const backgroundColor = 'yellow';
const highlightColor = 'greenyellow'

let hintItems: HintItem[] = [];
let wrapperElement: HTMLDivElement | null = null;
let currentKeys = "";

function removeHintsWrapper() {
  const hintsWrapper = document.getElementById(HINTS_WRAPPER_ID);

  if (hintsWrapper) {
    hintsWrapper.parentElement?.removeChild(hintsWrapper);
  }
}

function createHintsWrapperElement() {
  removeHintsWrapper();

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

function createHintElement(key: string, top: number, left: number) {
  const div = document.createElement("div");

  div.style.height = "20px";
  div.style.background = backgroundColor;
  div.style.color = "black";

  div.textContent = key;
  div.style.position = "fixed";
  div.style.zIndex = "99999";

  div.style.top = `${top - 18}px`;
  div.style.left = `${left}px`;

  return div;
}

function highlightHint(search: string) {
  hintItems.forEach(({ hintElement, key }) => {
    const firstPart = key.substring(0, search.length);

    if (firstPart === search) {
      const secondPart = key.substring(search.length);

      hintElement.innerHTML = `
        <span 
          style="background-color: ${highlightColor}; height: 20px"
        >
          ${firstPart}
        </span>
        ${secondPart}
      `;
    } else {
      hintElement.textContent = key;
    }
  });
}

function keydownHandler(event: KeyboardEvent) {
  if (hintItems.length && event.key.length === 1 && event.key.match(/[a-z]/i)) {
    currentKeys += event.key.toUpperCase();

    highlightHint(currentKeys);
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
    currentKeys = currentKeys.substring(0, currentKeys.length - 1);
    highlightHint(currentKeys);
  }

}

const clearData = () => {
  hintItems = [];
  currentKeys = "";
  removeHintsWrapper();
  document.removeEventListener("keydown", keydownHandler);
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
  document.addEventListener("keydown", keydownHandler);

  hintItems = visibleLinks.map((link, index) => {
    const key = convertToNumberingScheme(index);

    const viewportOffset = link.getBoundingClientRect();

    const top = viewportOffset.top;
    const left = viewportOffset.left;

    const hintElement = createHintElement(key, top, left);

    wrapperElement?.appendChild(hintElement);

    return {
      hintElement: hintElement,
      link,
      key,
    };
  });

  document.body.appendChild(wrapperElement);
});
