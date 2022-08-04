export function isHidden(el: HTMLElement) {
  return el.offsetParent === null;
}