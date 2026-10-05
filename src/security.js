/**
 * Single source of truth for every external origin this app touches.
 *
 * Why this matters:
 *  - It makes the app's attack surface auditable in one place.
 *  - Any string built from user input must be validated against
 *    ALLOWED_PROTOCOLS / same-origin checks before it reaches an
 *    href/src, otherwise the app is an open-redirect / XSS vector.
 *  - It gives the CSP in index.html an exact list to mirror.
 */

/**
 * The app is now fully self-contained: every font, icon, image and video is
 * served from public/ with a root-relative path, so there are NO third-party
 * origins left. public/_headers sets default-src 'self' to enforce it.
 *
 * This module remains the single place to audit what the app may load, and
 * holds the URL-scheme guard used for any user-influenced href.
 */

/** Base path for the template images and video copied into public/img/template. */
export const ASSET_BASE = '/img/template'

/** All asset URLs are relative to our own origin. */
export const ASSET_ORIGIN = '/'

/**
 * Origins permitted to load bytes - ours only.
 * If a third-party asset is ever reintroduced, add it here AND widen
 * img-src / media-src in public/_headers; scripts/check-secrets.mjs fails
 * the build until both are done.
 */
export const THIRD_PARTY_ORIGINS = []

const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:'])

/**
 * Returns a safe href, or '#' if the URL is not one we want to navigate to.
 * Blocks `javascript:`, `data:`, and other script-bearing schemes.
 */
export function safeHref(url) {
  if (typeof url !== 'string' || url === '') return '#'
  try {
    const parsed = new URL(url, window.location.origin)
    if (!SAFE_PROTOCOLS.has(parsed.protocol)) return '#'
    return url
  } catch {
    return '#'
  }
}
