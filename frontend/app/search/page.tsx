"use client";

import { useState } from "react";
import {
  Box, Container, Typography, TextField, MenuItem, Grid,
  Card, CardMedia, CardContent, Chip, Button, InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { categoryColors, categoryEmoji } from "../theme";

const dietColors: Record<string, string> = {
  carnivore: "#c0392b",
  herbivore: "#27ae60",
  omnivore:  "#d35400",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [diet, setDiet] = useState("");
  const [region, setRegion] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.append("q", q);
    if (category) params.append("category", category);
    if (diet) params.append("diet", diet);
    if (region) params.append("region", region);

    const res = await fetch(`${API_URL}/search?${params.toString()}`);
    const data = await res.json();
    setResults(data);
    setSearched(true);
    setLoading(false);
  }

  return (
    <Box>
      <Box sx={{ bgcolor: "#4a148c", color: "white", py: 6, textAlign: "center" }}>
        <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "2rem", md: "3rem" } }}>
          🔍 Search Cretaceous Life
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, opacity: 0.85, fontWeight: 400 }}>
          Find animals by name, category, diet, or region
        </Typography>
      </Box>

      <Container maxWidth="md" sx={{ py: 5 }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Search by name"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><SearchIcon /></InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              fullWidth select label="Category" value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="land">Land Dinosaurs</MenuItem>
              <MenuItem value="marine">Marine Reptiles</MenuItem>
              <MenuItem value="flying">Flying Reptiles</MenuItem>
              <MenuItem value="birds">Birds</MenuItem>
              <MenuItem value="mammals">Mammals</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              fullWidth select label="Diet" value={diet}
              onChange={(e) => setDiet(e.target.value)}
            >
              <MenuItem value="">All Diets</MenuItem>
              <MenuItem value="carnivore">Carnivore</MenuItem>
              <MenuItem value="herbivore">Herbivore</MenuItem>
              <MenuItem value="omnivore">Omnivore</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              fullWidth label="Region" value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="e.g. North America"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Button
              fullWidth variant="contained" size="large"
              onClick={handleSearch} disabled={loading}
              sx={{ py: 1.8, fontWeight: 800, fontSize: "1rem", bgcolor: "#4a148c", "&:hover": { bgcolor: "#6a1b9a" } }}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ pb: 8 }}>
        {searched && (
          <>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
              {results.length === 0
                ? "No animals found — try different filters!"
                : `Found ${results.length} animal${results.length !== 1 ? "s" : ""}`}
            </Typography>
            <Grid container spacing={3}>
              {results.map((animal) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={animal.slug}>
                  <Link href={`/animal/${animal.slug}`} style={{ textDecoration: "none" }}>
                    <Card sx={{ height: "100%", cursor: "pointer", transition: "transform 0.2s", "&:hover": { transform: "translateY(-4px)" } }}>
                      <CardMedia
                        component="img" height={180}
                        image={animal.image_url || "/placeholder.png"}
                        alt={animal.name}
                        sx={{ objectFit: "contain", bgcolor: "#f5f5f5", p: 1 }}
                      />
                      <CardContent>
                        <Typography variant="h6" fontWeight={800} gutterBottom>
                          {categoryEmoji[animal.category]} {animal.name}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
                          <Chip
                            label={animal.diet} size="small"
                            sx={{ bgcolor: dietColors[animal.diet], color: "white", textTransform: "capitalize" }}
                          />
                          <Chip
                            label={animal.category} size="small"
                            sx={{ bgcolor: categoryColors[animal.category], color: "white", textTransform: "capitalize" }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">📍 {animal.region}</Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
}
