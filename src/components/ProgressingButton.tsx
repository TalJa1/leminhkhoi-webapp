import React from "react";
import { ProgressingButtonProps } from "../services/typeProps";
import { Button, CircularProgress } from "@mui/material";

const ProgressingButton: React.FC<ProgressingButtonProps> = ({
  loading,
  onClick,
  children,
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      {...props}
      startIcon={loading ? <CircularProgress size={20} /> : null}
    >
      {children}
    </Button>
  );
};

export default ProgressingButton;
