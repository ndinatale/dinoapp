import {
  Box, Container, Typography, Grid, Card,
  CardContent, Chip,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { proxyImage } from "../../utils";
import { categoryColors, categoryEmoji } from "../../theme";

const categoryMeta: Record<string, { label: string; description: string }> = {
  land:    { label: "Land Dinosaurs",   description: "Mighty giants that ruled the earth" },
  marine:  { label: "Marine Reptiles",  description: "Fearsome rulers of the ancient seas" },
  flying:  { label: "Flying Reptiles",  description: "Masters of the Cretaceous skies" },
  birds:   { label: "Birds",            description: "Feathered survivors of an ancient world" },
  mammals: { label: "Mammals",          description: "Small but mighty early mammals" },
};

const dietColors: Record<string, string> = {
  carnivore: "#c0392b",
  herbivore: "#27ae60",
  omnivore:  "#d35400",
};

async function getAnimals(category: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const res = await fetch(`${apiUrl}/animals?category=${category}`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = categoryMeta[slug];
  if (!meta) notFound();

  const animals = await getAnimals(slug);
  const color = categoryColors[slug];

  return (
    <Box>
      <Box sx={{ bgcolor: color, color: "white", py: 6, textAlign: "center" }}>
        <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
          {categoryEmoji[slug]} {meta.label}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, opacity: 0.9, fontWeight: 400 }}>
          {meta.description}
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {animals.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">No animals found.</Typography>
        ) : (
          <Grid container spacing={3}>
            {animals.map((animal: any) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={animal.slug}>
                <Link href={`/animal/${animal.slug}`} style={{ textDecoration: "none" }}>
                  <Card
                    sx={{
                      height: "100%",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateY(-4px)" },
                    }}
                  >
                    <Box sx={{ position: "relative", height: 200, bgcolor: "#f5f5f5", p: 1 }}>
                      <Image
                        src={proxyImage(animal.image_url)}
                        alt={animal.name}
                        fill
                        style={{ objectFit: "contain", padding: "8px" }}
                      />
                    </Box>
                    <CardContent>
                      <Typography variant="h6" fontWeight={800} gutterBottom>
                        {animal.name}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
                        <Chip
                          label={animal.diet}
                          size="small"
                          sx={{ bgcolor: dietColors[animal.diet], color: "white", textTransform: "capitalize" }}
                        />
                        <Chip label={animal.sub_period} size="small" variant="outlined" />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        📍 {animal.region}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
