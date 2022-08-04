export function convertToNumberingScheme(currentNumber: number): string {
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