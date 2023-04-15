import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme({
  palette: {
    primary: {
      dark: "#2C3333",
      main: "#395B64",
      light: "#A5C9CA",
      bright: "#FEFCF3",
      gray: "#F1F6F5",
      red: "#DD5353",
      green: "#82CD47",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 12,
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.7rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.3rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "0.9rem",
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.8rem",
      fontWeight: 400,
    },
    caption: {
      fontSize: "0.7rem",
      fontWeight: 400,
    },
    button: {
      fontSize: "0.8rem",
      fontWeight: 500,
      textTransform: "none",
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 500,
      textTransform: "uppercase",
    },
  },
});
root.render(
  <React.StrictMode>
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </CssBaseline>
  </React.StrictMode>
);
