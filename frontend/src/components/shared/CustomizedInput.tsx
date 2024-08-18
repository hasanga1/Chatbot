import { TextField } from "@mui/material";
import React from "react";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "#393939" } }}
      name={props.name}
      label={props.label}
      type={props.type}
      sx={{
        width: "400px",
        "& .MuiInputBase-root": {
          borderRadius: 3,
          fontSize: 20,
          color: "#393939",
          border: "1px solid black", 
        },
        "& .MuiInputLabel-root": {
          color: "#393939", 
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#4d4d4d", 
          },
          "&:hover fieldset": {
            borderColor: "#4d4d4d", 
          },
          "&.Mui-focused fieldset": {
            borderColor: "#4d4d4d",
          },
        },
      }}
    />
  );
};

export default CustomizedInput;
