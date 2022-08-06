export const COMMANDS = {
  HIGHLIGHT: 'highlight'
} as const;

export type CommandTypes = typeof COMMANDS[keyof typeof COMMANDS];