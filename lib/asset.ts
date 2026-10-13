// Prefixes public/ paths with the GitHub Pages basePath (plain <img>, <video>, next/image unoptimized).
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string) {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
