"use client";
import { createTheme } from "@mui/material/styles";

export const categoryColors: Record<string, string> = {
  land: "#c0392b",
  marine: "#1a6b8a",
  flying: "#2980b9",
  birds: "#27ae60",
  mammals: "#d35400",
};

export const categoryEmoji: Record<string, string> = {
  land: "🦕",
  marine: "🌊",
  flying: "🦅",
  birds: "🐦",
  mammals: "🐾",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2e7d32" },
    secondary: { main: "#f57f17" },
    background: { default: "#fdf6e3", paper: "#ffffff" },
  },
  typography: {
    fontFamily: '"Nunito", "Roboto", sans-serif',
    h1: { fontWeight: 900 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 700, borderRadius: 8 } },
    },
  },
});

export default theme;
