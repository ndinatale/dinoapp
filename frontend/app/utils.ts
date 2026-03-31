const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function proxyImage(url: string | null): string {
  if (!url) return "/placeholder.png";
  return `${API_URL}/image-proxy?url=${encodeURIComponent(url)}`;
}
