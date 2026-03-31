import {
  Box, Container, Typography, Grid, Chip, Paper, Button,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { proxyImage } from "../../utils";
import { categoryColors, categoryEmoji } from "../../theme";

const dietColors: Record<string, string> = {
  carnivore: "#c0392b",
  herbivore: "#27ae60",
  omnivore:  "#d35400",
};

const categoryLabels: Record<string, string> = {
  land:    "Land Dinosaurs",
  marine:  "Marine Reptiles",
  flying:  "Flying Reptiles",
  birds:   "Birds",
  mammals: "Mammals",
};

async function getAnimal(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const res = await fetch(`${apiUrl}/animals/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function AnimalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const animal = await getAnimal(slug);
  if (!animal) notFound();

  const color = categoryColors[animal.category] || "#2e7d32";

  return (
    <Box>
      <Box sx={{ bgcolor: color, color: "white", py: 4 }}>
        <Container maxWidth="lg">
          <Link href={`/category/${animal.category}`} style={{ textDecoration: "none" }}>
            <Button sx={{ color: "white", mb: 2, fontWeight: 700, opacity: 0.85, "&:hover": { opacity: 1 } }}>
              ← Back to {categoryLabels[animal.category]}
            </Button>
          </Link>
          <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "2rem", md: "3rem" } }}>
            {categoryEmoji[animal.category]} {animal.name}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={3}
              sx={{ borderRadius: 4, overflow: "hidden", bgcolor: "#f5f5f5", p: 2, textAlign: "center" }}
            >
              <Box sx={{ position: "relative", height: 400 }}>
                <Image
                  src={proxyImage(animal.image_url)}
                  alt={animal.name}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mb: 4 }}>
              <Chip
                label={animal.diet}
                sx={{ bgcolor: dietColors[animal.diet], color: "white", fontWeight: 700, fontSize: "1rem", px: 1, textTransform: "capitalize" }}
              />
              <Chip
                label={categoryLabels[animal.category]}
                sx={{ bgcolor: color, color: "white", fontWeight: 700, fontSize: "1rem", px: 1 }}
              />
              <Chip label={animal.sub_period} variant="outlined" sx={{ fontWeight: 700, fontSize: "1rem", px: 1 }} />
              <Chip label={`📍 ${animal.region}`} variant="outlined" sx={{ fontWeight: 700, fontSize: "1rem", px: 1 }} />
            </Box>

            <Typography variant="h5" fontWeight={800} gutterBottom sx={{ color: color }}>
              About {animal.name}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 4 }}>
              {animal.summary}
            </Typography>

            <Paper
              elevation={0}
              sx={{ bgcolor: "#fff8e1", border: "2px solid #f57f17", borderRadius: 4, p: 3 }}
            >
              <Typography variant="h6" fontWeight={800} sx={{ color: "#e65100", mb: 1 }}>
                🌟 Fun Fact!
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
                {animal.fun_fact}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
