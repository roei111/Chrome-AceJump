import { Alert, Box, Button, Divider, Popover, Snackbar, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

// FIXME: get rid of duplication
const App = () => {
  const [hintBackground, setHintBackground] = useState("#FFFFFF");
  const [hintHighlight, setHintHighlight] = useState("#FFFFFF");
  const [linkBorder, setLinkBorder] = useState("#FFFFFF");
  const [linkFill, setLinkFill] = useState("#FFFFFF");
  const [enteredBorder, setEnteredBorder] = useState("#FFFFFF");


  const [variant, setVariant] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [currentColor, setCurrentColor] = useState("#FFFFFF");

  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    browser.storage.sync.get().then(data => {
      if (data?.hint?.background) {
        setHintBackground(data?.hint?.background);
      }
      if (data?.hint?.highlight) {
        setHintHighlight(data?.hint?.highlight);
      }


      if (data?.link?.border) {
        setLinkBorder(data?.link?.border);
      }
      if (data?.link?.fill) {
        setLinkFill(data?.link?.fill);
      }

      if (data?.entered?.border) {
        setEnteredBorder(data?.entered?.border);
      }
    });
  }, []);

  const openPopover = (variant: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setVariant(variant);

    switch (variant) {
      case "hintBackground": {
        setCurrentColor(hintBackground);
        break;
      }
      case "hintHighlight": {
        setCurrentColor(hintHighlight);
        break;
      }
      case "linkBorder": {
        setCurrentColor(linkBorder);
        break;
      }
      case "linkFill": {
        setCurrentColor(linkFill);
        break;
      }
      case "enteredBorder": {
        setCurrentColor(enteredBorder);
        break;
      }
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const onApply = () => {
    browser.storage.sync.set({
      hint: {
        background: hintBackground,
        highlight: hintHighlight,
      },
      link: {
        border: linkBorder,
        fill: linkFill,
      },
      entered: {
        border: enteredBorder,
      },
    }).then(() => {
      setSnackbar(true);
    });
  };

  return (
    <Box
      sx={{
        minHeight: "400px",
        padding: "8px",
      }}
    >
      <Stack>
        <Typography>Hint settings</Typography>

        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={openPopover("hintBackground")}
            sx={{
              color: "black",
              backgroundColor: hintBackground,
              "&:hover": {
                backgroundColor: hintBackground,
              },
            }}
          >
            Background
          </Button>
          <Button
            variant="contained"
            onClick={openPopover("hintHighlight")}
            sx={{
              color: "black",
              backgroundColor: hintHighlight,
              "&:hover": {
                backgroundColor: hintHighlight,
              },
            }}
          >
            Highlight
          </Button>
        </Stack>
        <Divider />
        <Typography>Link settings</Typography>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={openPopover("linkBorder")}
            sx={{
              color: "black",
              backgroundColor: linkBorder,
              "&:hover": {
                backgroundColor: linkBorder,
              },
            }}
          >
            Border
          </Button>
          <Button
            variant="contained"
            onClick={openPopover("linkFill")}
            sx={{
              color: "black",
              backgroundColor: linkFill,
              "&:hover": {
                backgroundColor: linkFill,
              },
            }}
          >
            Fill
          </Button>
        </Stack>
        <Divider />
        <Typography>Entered text settings</Typography>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={openPopover("enteredBorder")}
            sx={{
              color: "black",
              backgroundColor: enteredBorder,
              "&:hover": {
                backgroundColor: enteredBorder,
              },
            }}
          >
            Border
          </Button>
        </Stack>
        <Button
          onClick={onApply}
          variant="contained"
          sx={{
            marginTop: "16px",
          }}
        >
          Save
        </Button>
      </Stack>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          width: "300px",
          height: "400px",
        }}
      >
        <SketchPicker
          color={currentColor}
          onChange={({ hex }) => {
            setCurrentColor(hex);
          }}
          onChangeComplete={({ hex }) => {
            switch (variant) {
              case "hintBackground": {
                setHintBackground(hex);
                break;
              }
              case "hintHighlight": {
                setHintHighlight(hex);
                break;
              }
              case "linkBorder": {
                setLinkBorder(hex);
                break;
              }
              case "linkFill": {
                setLinkFill(hex);
                break;
              }
              case "enteredBorder": {
                setEnteredBorder(hex);
                break;
              }
            }
          }}
        />
      </Popover>
      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(false)}
      >
        <Alert onClose={() => setSnackbar(false)} severity="success">
          Successfully saved!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App;