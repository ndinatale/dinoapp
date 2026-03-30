"use client";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import Link from "next/link";

const navItems = [
  { label: "Land", href: "/category/land" },
  { label: "Marine", href: "/category/marine" },
  { label: "Flying", href: "/category/flying" },
  { label: "Birds", href: "/category/birds" },
  { label: "Mammals", href: "/category/mammals" },
  { label: "Search", href: "/search" },
];

export default function NavBar() {
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#1b5e20" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{ fontWeight: 900, color: "white", textDecoration: "none", flexGrow: 1, fontSize: "1.4rem" }}
          >
            🦕 DinoApp
          </Typography>
          {navItems.map((item) => (
            <Button
              key={item.href}
              component={Link}
              href={item.href}
              sx={{ color: "white", fontWeight: 700, fontSize: "0.9rem" }}
            >
              {item.label}
            </Button>
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
