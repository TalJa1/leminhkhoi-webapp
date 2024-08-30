import { Slide, Snackbar, SnackbarContent } from "@mui/material";
import React from "react";
import { NotiAlertType } from "../services/typeProps";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NotiAlert: React.FC<NotiAlertType> = ({
  handleClose,
  open,
  color,
  title,
}) => {
  const vertical = "bottom";
  const horizontal = "right";
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      key={vertical + horizontal}
      autoHideDuration={1200}
      anchorOrigin={{ vertical, horizontal }}
    >
      <SnackbarContent
        message={title}
        sx={{
          backgroundColor: color === "success" ? "#4caf50" : "#f44336",
          color: "white",
        }}
      />
    </Snackbar>
  );
};

export default NotiAlert;
