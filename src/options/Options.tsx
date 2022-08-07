import { Alert, Button, Divider, Snackbar, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ColorPicker from "./components/ColorPicker";
import { initialState, useThemeStore } from "./useThemeStore";

const Options = () => {
  const [state, dispatch] = useThemeStore() as [typeof initialState, (data: any) => void];

  const [snackbar, setSnackbar] = useState(false);

  const onApply = () => {
    browser.storage.sync.set(state).then(() => {
      setSnackbar(true);
    });
  };

  const onReset = () => {
    dispatch({ type: "theme", payload: initialState });
    browser.storage.sync.set(initialState).then(() => {
      setSnackbar(true);
    });
  };

  return (
    <Stack
      sx={{
        minHeight: "400px",
        padding: "8px",
      }}
    >
      <Stack>
        <Typography>Hint settings</Typography>

        <ColorPicker
          value={state.hint.background}
          onChange={color => {
            dispatch({ type: "hint.background", payload: color });
          }}
          label="Hint background"
        />
        <ColorPicker
          value={state.hint.highlight}
          onChange={color => {
            dispatch({ type: "hint.highlight", payload: color });
          }}
          label="Hint highlight"
        />
        <Divider />
        <Typography>Link settings</Typography>
        <ColorPicker
          value={state.link.border}
          onChange={color => {
            dispatch({ type: "link.border", payload: color });
          }}
          label="Link border"
        />
        <ColorPicker
          value={state.link.fill}
          onChange={color => {
            dispatch({ type: "link.fill", payload: color });
          }}
          label="Link fill"
        />
        <Divider />
        <Typography>Entered text settings</Typography>
        <ColorPicker
          value={state.entered.border}
          onChange={color => {
            dispatch({ type: "entered.border", payload: color });
          }}
          label="Entered border"
        />

        <Stack spacing={2} direction="row" alignItems="center" marginTop="16px" marginBottom="4px">
          <Button
            onClick={onApply}
            variant="contained"
          >
            Save
          </Button>
          <Button
            onClick={onReset}
            variant="outlined"
          >
            Reset to defaults
          </Button>
        </Stack>

      </Stack>
      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(false)}
      >
        <Alert onClose={() => setSnackbar(false)} severity="success">
          Successfully saved
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Options;
