import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Components/Layout/Header";
import SignIn from "./Components/Auth/SignIn";

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header title="My Blog" loggedIn={false} />
        <SignIn />
      </ThemeProvider>
    </>
  );
}
