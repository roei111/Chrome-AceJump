export function removeElementById(id: string) {
  const currentElement = document.getElementById(id);

  if (currentElement) {
    currentElement.parentElement?.removeChild(currentElement);
  }
}