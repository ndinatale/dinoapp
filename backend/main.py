from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from supabase import create_client, Client
from dotenv import load_dotenv
from typing import Optional
import os
import httpx

load_dotenv()

app = FastAPI(title="DinoApp API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://*.vercel.app"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

def get_supabase() -> Client:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    if not url or not key:
        raise RuntimeError("Missing Supabase credentials")
    return create_client(url, key)


@app.get("/image-proxy")
async def image_proxy(url: str):
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            url,
            headers={"User-Agent": "DinoApp/1.0 (https://github.com/ndinatale/dinoapp)"},
            follow_redirects=True,
        )
    if resp.status_code != 200:
        raise HTTPException(status_code=404, detail="Image not found")
    content_type = resp.headers.get("content-type", "image/jpeg")
    return Response(content=resp.content, media_type=content_type)


@app.get("/animals")
def list_animals(
    category: Optional[str] = Query(None),
    diet: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
):
    supabase = get_supabase()
    query = supabase.table("animals").select("*").order("name")
    if category:
        query = query.eq("category", category)
    if diet:
        query = query.eq("diet", diet)
    if region:
        query = query.ilike("region", f"%{region}%")
    result = query.execute()
    return result.data


@app.get("/animals/{slug}")
def get_animal(slug: str):
    supabase = get_supabase()
    result = supabase.table("animals").select("*").eq("slug", slug).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Animal not found")
    return result.data


@app.get("/categories")
def list_categories():
    supabase = get_supabase()
    result = supabase.table("animals").select("category").execute()
    counts: dict[str, int] = {}
    for row in result.data:
        cat = row["category"]
        counts[cat] = counts.get(cat, 0) + 1
    labels = {
        "land": "Land Dinosaurs",
        "marine": "Marine Reptiles",
        "flying": "Flying Reptiles",
        "birds": "Birds",
        "mammals": "Mammals",
    }
    return [
        {"slug": k, "label": labels.get(k, k), "count": v}
        for k, v in sorted(counts.items())
    ]


@app.get("/search")
def search_animals(
    q: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    diet: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
):
    supabase = get_supabase()
    query = supabase.table("animals").select("*").order("name")
    if q:
        query = query.ilike("name", f"%{q}%")
    if category:
        query = query.eq("category", category)
    if diet:
        query = query.eq("diet", diet)
    if region:
        query = query.ilike("region", f"%{region}%")
    result = query.execute()
    return result.data
