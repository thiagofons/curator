// Shared client utilities for talking to Payload CMS

const ENV = (import.meta as any).env || {};

// Public CMS base URL resolution with dev/prod defaults
export const CMS_BASE_URL: string =
  (ENV.PUBLIC_CMS_BASE_URL as string) ||
  (ENV.CMS_BASE_URL as string) ||
  (ENV.DEV ? "http://localhost:4001" : "https://cms.curator.com.br");

export async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

// Resolve localized Payload fields into a single value.
export function pickLocale<T = any>(value: any, preferred: string = "pt"): T {
  if (!value || typeof value !== "object" || Array.isArray(value)) return value as T;
  if (preferred in value) return value[preferred] as T;
  const firstKey = Object.keys(value)[0];
  return firstKey ? (value as any)[firstKey] : value;
}

// Resolve a media file object from Payload to an absolute URL
export function resolveMediaURL(file: any): string | undefined {
  if (!file) return undefined;
  if (typeof file === "string") return undefined;
  if (file.url) {
    const url = String(file.url);
    return url.startsWith("http")
      ? url
      : `${CMS_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  }
  if (file.filename) return `${CMS_BASE_URL}/api/media/${file.filename}`;
  return undefined;
}

