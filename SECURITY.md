/**
 * Reference security headers.
 *
 * IMPORTANT: these are HTTP response headers. A Vite SPA cannot set them
 * from the client — do NOT add them to index.html. They must be applied
 * by whatever serves the built files.
 *
 *  - `npm run preview` is for local checking only and sets none of these.
 *  - In production, use the `public/_headers` file (Netlify/Cloudflare
 *    Pages) or the Netlify `_redirects` config, or configure them in
 *    Nginx/Apache/your CDN.
 *
 * The CSP deliberately allows only the origins listed in
 * src/security.js. `'unsafe-inline'` is required for styles because
 * React sets inline styles (e.g. the parallax backgroundImage).
 * Scripts get NO 'unsafe-inline' / 'unsafe-eval'.
 */

/*
# Cloudflare Pages / Netlify `public/_headers`
```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https://ivang-design.com; media-src 'self' https://ivang-design.com; frame-src https://maps.google.com; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=(), usb=()
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: cross-origin
```
*/

/*
# Nginx equivalent
```
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https://ivang-design.com; media-src 'self' https://ivang-design.com; frame-src https://maps.google.com; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), camera=(), microphone=(), payment=(), usb=()" always;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
```
*/

export {}
