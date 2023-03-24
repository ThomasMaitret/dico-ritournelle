import type { CheerioAPI } from "cheerio";

export async function loadHtml(url: string): Promise<CheerioAPI | null> {
  const response = await fetch(url, { mode: "no-cors" });
  if (!response.ok) return null;
  const data = await response.text();
  const cheerio = await import("cheerio");
  return cheerio.load(data);
}
