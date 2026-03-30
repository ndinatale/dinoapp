import type { Metadata } from "next";
import { Box, Typography } from "@mui/material";
import ThemeRegistry from "./ThemeRegistry";
import NavBar from "./NavBar";

export const metadata: Metadata = {
  title: "DinoApp — Cretaceous Life Explorer",
  description: "A family-friendly visual library of Cretaceous Period creatures",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeRegistry>
          <NavBar />
          <Box component="main" sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            {children}
          </Box>
          <Box component="footer" sx={{ bgcolor: "#1b5e20", color: "white", py: 3, textAlign: "center" }}>
            <Typography variant="body2">
              🦕 DinoApp — Cretaceous Life Explorer &nbsp;|&nbsp; Built for curious minds of all ages
            </Typography>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
