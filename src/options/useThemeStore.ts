import { useEffect, useReducer } from "react";

export const initialState = {
  entered: {
    border: "#00FF00",
  },
  hint: {
    background: "#FFFF00",
    highlight: "#adff2f",
  },
  link: {
    border: "#FF0000",
    fill: "#4958f8",
  },
} as const;

function reducer(
  state: typeof initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case "entered.border": {
      return {
        ...state,
        entered: {
          ...state.entered,
          border: action.payload,
        },
      };
    }
    case "hint.background": {
      return {
        ...state,
        hint: {
          ...state.hint,
          background: action.payload,
        },
      };
    }
    case "hint.highlight": {
      return {
        ...state,
        hint: {
          ...state.hint,
          highlight: action.payload,
        },
      };
    }
    case "link.border": {
      return {
        ...state,
        link: {
          ...state.link,
          border: action.payload,
        },
      };
    }
    case "link.fill": {
      return {
        ...state,
        link: {
          ...state.link,
          fill: action.payload,
        },
      };
    }
    case "theme": {
      return {
        entered: {
          border: action.payload?.entered?.border || "#00FF00",
        },
        hint: {
          background: action.payload?.hint?.background || "#FFFF00",
          highlight: action.payload?.hint?.highlight || "#adff2f",
        },
        link: {
          border: action.payload?.link?.border || "#FF0000",
          fill: action.payload?.link?.fill || "#4958f8",
        },
      };
    }
    default: {
      return state;
    }
  }
}

export function useThemeStore() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    chrome.storage.sync.get(null, (data) => {
      dispatch({ type: "theme", payload: data });
    });
  }, []);

  return [state, dispatch];
}
