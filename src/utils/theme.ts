export const theme = {
  hint: {
    background: 'yellow',
    selected: 'greenyellow',
    size: 14,
    highlight: 'greenyellow',
  } as const,
  link: {
    border: 'red',
    fill: '#4958f8',
  } as const,
  entered: {
    border: 'green',
  } as const,
} as const;

export type Theme = typeof theme;