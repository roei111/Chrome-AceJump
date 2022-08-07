import { Box, Button, Popover, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

type ColorPickerProps = {
  value: string;
  label?: string;
  onChange: (value: string) => void;
};

const ColorPicker = ({ value, onChange, label }: ColorPickerProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Stack spacing={2} direction="row" alignItems="center" marginTop="4px" marginBottom="4px">
        <Button
          variant="outlined"
          onClick={handleOpen}
          color="primary"
          startIcon={<Box
            sx={{
              backgroundColor: localValue,
              height: "1rem",
              width: "1rem",
              borderRadius: "2px",
              border: "1px solid #E5E5E5",
            }}
          ></Box>}
        >
          {localValue}
        </Button>
        {
          Boolean(label) && (
            <Typography>
              {label}
            </Typography>
          )
        }
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
          color={localValue}
          onChange={({ hex }) => {
            setLocalValue(hex);
          }}
          onChangeComplete={({ hex }) => {
            onChange(hex);
          }}
        />
      </Popover>
    </>
  );
};

export default ColorPicker;