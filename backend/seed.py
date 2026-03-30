"""
Run this once to load all animals from data/animals.json into Supabase.
Usage: python seed.py
"""

import json
import os
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing SUPABASE_URL or SUPABASE_KEY in .env file")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

data_path = Path(__file__).parent.parent / "data" / "animals.json"
with open(data_path) as f:
    animals = json.load(f)

print(f"Seeding {len(animals)} animals...")

result = supabase.table("animals").insert(animals).execute()

print(f"Done! Inserted {len(result.data)} records.")
