import React from "react";
import TextField from "@material-ui/core/TextField";

interface RegisterProps {
  // Add any props you need for the Register component
}

const Register: React.FC<RegisterProps> = () => {
  // Add your component logic here

  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
    />
  );
};

export default Register;
