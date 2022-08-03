"use strict";
function isHidden(el) {
    return el.offsetParent === null;
}
function convertToNumberingScheme(currentNumber) {
    const baseChar = ("A").charCodeAt(0);
    let letters = "";
    do {
        const delta = currentNumber % 26;
        letters = String.fromCharCode(baseChar + delta) + letters;
        currentNumber = currentNumber - delta;
        currentNumber -= 1;
    } while (currentNumber > 0);
    return letters;
}
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth));
}
let appendedChildren = [];
let links = [];
let currentKeys = "";
const clearData = () => {
    appendedChildren.forEach(el => document.body.removeChild(el));
    appendedChildren = [];
    currentKeys = "";
};
browser.runtime.onMessage.addListener(() => {
    const visibleLinks = Array.from(document.links)
        .reduce((links, currentLink) => {
        if (isInViewport(currentLink) && !isHidden(currentLink)) {
            return [...links, currentLink];
        }
        return links;
    }, []);
    appendedChildren.forEach(el => document.body.removeChild(el));
    appendedChildren = [];
    links = [];
    appendedChildren = visibleLinks.map((link, index) => {
        const div = document.createElement("div");
        div.style.height = "20px";
        div.style.background = "yellow";
        div.style.color = "black";
        const key = convertToNumberingScheme(index);
        console.log(index, key);
        div.innerHTML = key;
        div.dataset.key = key;
        div.style.position = "fixed";
        div.style.zIndex = "99999";
        links.push({
            link, key,
        });
        const viewportOffset = link.getBoundingClientRect();
        // these are relative to the viewport, i.e. the window
        const top = viewportOffset.top;
        const left = viewportOffset.left;
        div.style.top = `${top - 18}px`;
        div.style.left = `${left}px`;
        return document.body.appendChild(div);
    });
});
function updateStyles(search) {
    appendedChildren.forEach(ch => {
        const dataItem = String(ch.dataset.key);
        const firstpart = dataItem.substring(0, currentKeys.length);
        if (firstpart === currentKeys) {
            const secondpart = dataItem.substring(currentKeys.length);
            ch.innerHTML = `
          <span style="background-color: greenyellow">${firstpart}</span>${secondpart}
      `;
        }
        else {
            ch.innerHTML = dataItem;
        }
    });
}
document.onkeydown = function (evt) {
    if (appendedChildren.length && evt.key.length === 1 && evt.key.match(/[a-z]/i)) {
        currentKeys += evt.key.toUpperCase();
        updateStyles(currentKeys);
    }
    if (evt.key === "Enter" && currentKeys.length) {
        const link = links.find(({ link, key }) => key === currentKeys);
        if (link) {
            link.link.click();
            clearData();
        }
        currentKeys = "";
    }
    if (evt.key === "Escape") {
        clearData();
    }
    if (evt.key === "Backspace") {
        currentKeys = currentKeys.substring(0, currentKeys.length - 1);
        updateStyles(currentKeys);
    }
};
document.addEventListener("scroll", () => {
    clearData();
});
