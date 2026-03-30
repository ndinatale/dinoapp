import {
  Box, Container, Typography, Grid, Card,
  CardContent, Chip,
} from "@mui/material";
import Link from "next/link";
import { categoryColors, categoryEmoji } from "./theme";

const categories = [
  { slug: "land", label: "Land Dinosaurs", description: "Mighty giants that ruled the earth" },
  { slug: "marine", label: "Marine Reptiles", description: "Fearsome rulers of the ancient seas" },
  { slug: "flying", label: "Flying Reptiles", description: "Masters of the Cretaceous skies" },
  { slug: "birds", label: "Birds", description: "Feathered survivors of an ancient world" },
  { slug: "mammals", label: "Mammals", description: "Small but mighty early mammals" },
];

export default function HomePage() {
  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%)",
          color: "white",
          py: { xs: 6, md: 10 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, mb: 2 }}>
            🦕 Welcome to DinoApp!
          </Typography>
          <Typography variant="h5" sx={{ mb: 3, opacity: 0.9, fontWeight: 400 }}>
            Explore the incredible creatures that roamed, swam, and soared
            during the <strong>Cretaceous Period</strong> — 145 to 66 million years ago.
          </Typography>
          <Chip
            label="25 Amazing Creatures to Discover"
            sx={{ bgcolor: "#f57f17", color: "white", fontSize: "1rem", px: 2, py: 2.5, fontWeight: 700 }}
          />
        </Container>
      </Box>

      {/* Category Cards */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" textAlign="center" sx={{ mb: 1, color: "#1b5e20" }}>
          Choose Your Adventure
        </Typography>
        <Typography variant="h6" textAlign="center" sx={{ mb: 5, color: "text.secondary", fontWeight: 400 }}>
          Pick a category below to start exploring
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {categories.map((cat) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cat.slug}>
              <Link href={`/category/${cat.slug}`} style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    height: "100%",
                    border: `3px solid ${categoryColors[cat.slug]}`,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "pointer",
                    "&:hover": { transform: "translateY(-6px)", boxShadow: "0 12px 30px rgba(0,0,0,0.2)" },
                  }}
                >
                  <CardContent sx={{ textAlign: "center", py: 5 }}>
                    <Typography sx={{ fontSize: "4rem", mb: 2 }}>
                      {categoryEmoji[cat.slug]}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 800, color: categoryColors[cat.slug], mb: 1 }}
                    >
                      {cat.label}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {cat.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Fun fact banner */}
      <Box sx={{ bgcolor: "#fff8e1", py: 5, textAlign: "center" }}>
        <Container maxWidth="md">
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#e65100" }}>
            🌍 Did you know?
          </Typography>
          <Typography variant="h6" sx={{ mt: 1, fontWeight: 400 }}>
            The Cretaceous Period lasted <strong>79 million years</strong> — that's longer than
            dinosaurs have been extinct!
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
