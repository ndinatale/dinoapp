"""
Fetches working image URLs from Wikipedia REST API and updates the database.
Usage: python update_images.py
"""
import httpx
import asyncio
import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

# Map slug -> Wikipedia article title to look up
WIKIPEDIA_TITLES = {
    "tyrannosaurus-rex":    "Tyrannosaurus",
    "triceratops":          "Triceratops",
    "ankylosaurus":         "Ankylosaurus",
    "spinosaurus":          "Spinosaurus",
    "iguanodon":            "Iguanodon",
    "parasaurolophus":      "Parasaurolophus",
    "velociraptor":         "Velociraptor",
    "pachycephalosaurus":   "Pachycephalosaurus",
    "argentinosaurus":      "Argentinosaurus",
    "giganotosaurus":       "Giganotosaurus",
    "therizinosaurus":      "Therizinosaurus",
    "carnotaurus":          "Carnotaurus",
    "oviraptor":            "Oviraptor",
    "mosasaurus":           "Mosasaurus",
    "elasmosaurus":         "Elasmosaurus",
    "kronosaurus":          "Kronosaurus",
    "pteranodon":           "Pteranodon",
    "quetzalcoatlus":       "Quetzalcoatlus",
    "tupuxuara":            "Tupuxuara",
    "hesperornithes":       "Hesperornithes",
    "ichthyornis":          "Ichthyornis",
    "vegavis":              "Vegavis",
    "repenomamus":          "Repenomamus",
    "zalambdalestes":       "Zalambdalestes",
    "alphadon":             "Alphadon",
}

async def fetch_image(client, slug, title):
    try:
        resp = await client.get(
            f"https://en.wikipedia.org/api/rest_v1/page/summary/{title}",
            headers={"User-Agent": "DinoApp/1.0 (https://github.com/ndinatale/dinoapp)"},
            timeout=10,
        )
        data = resp.json()
        url = data.get("thumbnail", {}).get("source")
        return slug, url
    except Exception as e:
        print(f"  ERROR {slug}: {e}")
        return slug, None

async def main():
    async with httpx.AsyncClient() as client:
        tasks = [fetch_image(client, slug, title) for slug, title in WIKIPEDIA_TITLES.items()]
        results = await asyncio.gather(*tasks)

    updated = 0
    for slug, url in results:
        if url:
            supabase.table("animals").update({"image_url": url}).eq("slug", slug).execute()
            print(f"  ✓ {slug}")
            updated += 1
        else:
            print(f"  ✗ {slug} — no image found")

    print(f"\nDone! Updated {updated}/{len(results)} animals.")

asyncio.run(main())
