/**
 * Shared client utilities for talking to Payload CMS.
 *
 * Centralizes environment-driven base URL resolution, JSON fetching,
 * locale helpers, and media URL normalization.
 */

const ENV = (import.meta as any).env || {};

// Public CMS base URL resolution with dev/prod defaults
/**
 * Base URL of the Payload CMS HTTP API.
 *
 * Resolution order:
 * - `PUBLIC_CMS_BASE_URL`
 * - `CMS_BASE_URL`
 * - Dev default: http://localhost:4001
 * - Prod default: https://cms.curator.com.br
 */
export const CMS_BASE_URL: string =
  (ENV.PUBLIC_CMS_BASE_URL as string) ||
  (ENV.CMS_BASE_URL as string) ||
  (ENV.DEV ? "http://cms.curator.local" : "https://cms.curator.com.br");

/**
 * Fetches a JSON resource and throws on non-2xx responses.
 * @param url Absolute or relative URL to fetch
 * @returns Parsed JSON body typed as `T`
 */
export async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

// Resolve localized Payload fields into a single value.
/**
 * Returns the best-matching locale for a localized Payload field.
 * If value is not localized, it is returned as-is.
 * @param value Localized field object or primitive
 * @param preferred Preferred locale code (default: "pt")
 */
export function pickLocale<T = any>(value: any, preferred = "pt"): T {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return value as T;
  if (preferred in value) return value[preferred] as T;
  const firstKey = Object.keys(value)[0];
  return firstKey ? (value as any)[firstKey] : value;
}

// Resolve a media file object from Payload to an absolute URL
/**
 * Resolves a Payload upload field to an absolute URL suitable for rendering.
 * @param file Payload upload field value
 * @returns Absolute URL string or undefined when not resolvable
 */
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
