export const theme = {
  hint: {
    background: "yellow",
    size: "14",
    highlight: "greenyellow",
  },
  link: {
    border: "red",
    fill: "#4958f8",
  },
  entered: {
    border: "green",
  },
};

export type Theme = typeof theme;

export const getTheme = async (): Promise<Theme> => {
  await chrome.storage.sync.get(null, (data) => {
    if (data?.hint?.background) {
      theme.hint.background = data?.hint?.background;
    }
    if (data?.hint?.highlight) {
      theme.hint.highlight = data?.hint?.highlight;
    }

    if (data?.link?.border) {
      theme.link.border = data?.link?.border;
    }
    if (data?.link?.fill) {
      theme.link.fill = data?.link?.fill;
    }

    if (data?.entered?.border) {
      theme.entered.border = data?.entered?.border;
    }
  });

  return theme;
};
