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
    fontSize: 12,
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
