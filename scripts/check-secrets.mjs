/**
 * Pre-build guard: fail the build if anything that looks like a secret or a
 * dangerous DOM sink has been committed into src/, and if any asset is still
 * hotlinked from a third-party host.
 *
 * This targets the mistakes that actually happen in a static site:
 * pasting an API key into the bundle (which ships it to every visitor),
 * reaching for innerHTML with unsanitised input (XSS), and re-introducing
 * remote image/video URLs - which break silently whenever the host is slow
 * or goes down.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, extname } from 'node:path'

const SRC = new URL('../src', import.meta.url).pathname.replace(/^\//, '')
const EXTS = new Set(['.js', '.jsx', '.ts', '.tsx', '.css', '.html'])

const RULES = [
  {
    // Any absolute http(s) URL to a third-party host in src/. Catches hotlinked
    // assets (including base-path constants where the file extension is
    // appended later, e.g. `${BASE}/logo-${n}.png`).
    name: 'Remote URL (asset must be self-hosted)',
    re: /https?:\/\/(?!localhost|127\.0\.0\.1|www\.w3\.org|schemas\.|reactjs\.org)[a-z0-9.-]+\.[a-z]{2,}/gi,
    severity: 'error',
    hint: 'Download the asset into public/ and reference it with a root-relative path.',
  },
  {
    name: 'Hardcoded secret',
    re: /\b(?:api[_-]?key|apikey|secret[_-]?key|access[_-]?token|client[_-]?secret|private[_-]?key)\b\s*[:=]\s*['"][^'"]{8,}['"]/i,
    severity: 'error',
  },
  { name: 'AWS access key id', re: /\bAKIA[0-9A-Z]{16}\b/, severity: 'error' },
  { name: 'Google API key', re: /\bAIza[0-9A-Za-z_-]{35}\b/, severity: 'error' },
  { name: 'Slack token', re: /\bxox[baprs]-[0-9A-Za-z-]{10,}\b/, severity: 'error' },
  { name: 'Private key block', re: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, severity: 'error' },
  {
    name: 'dangerouslySetInnerHTML',
    re: /dangerouslySetInnerHTML/,
    severity: 'error',
    hint: 'Renders raw HTML. If the value is not strictly sanitised this is an XSS hole.',
  },
  { name: 'eval(', re: /\beval\s*\(/, severity: 'error' },
  { name: 'new Function(', re: /new\s+Function\s*\(/, severity: 'error' },
  {
    name: 'target=_blank without noopener',
    // matched per-tag (see TAG_RE below), not per-line
    re: null,
    severity: 'warn',
    hint: 'Add rel="noopener noreferrer".',
  },
]

/** Finds every single JSX/HTML opening tag, so multi-line tags are seen whole. */
const TAG_RE = /<a\b[^>]*>/g
const NOOPENER_RE = /rel\s*=\s*["'][^"']*\bnoopener\b[^"']*["']/

/*
  Font Awesome 4.7 check.
  FA5+ icon names (fa-ruler-combined, fa-industry in v4 sense, etc.) silently
  render as an empty box in 4.7 with no error, so catch them at build time.
*/
const FA_CSS = fileURLToPath(new URL('../public/fa/font-awesome.min.css', import.meta.url))
const FA_EXISTS = existsSync(FA_CSS)
let faBody = ''
if (FA_EXISTS) {
  faBody = readFileSync(FA_CSS, 'utf8')
}
const faIcons = new Set(
  [...faBody.matchAll(/\.fa-([a-z0-9-]+):before/g)].map((m) => m[1])
)

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
}

const files = walk(SRC).filter((f) => EXTS.has(extname(f)))
const findings = []

for (const file of files) {
  const text = readFileSync(file, 'utf8')

  // per-line rules
  text.split('\n').forEach((line, i) => {
    for (const rule of RULES) {
      if (rule.re && rule.re.test(line)) {
        findings.push({ file, line: i + 1, ...rule })
      }
    }
  })

  // Font Awesome class names used in JSX, e.g. className="fa fa-users"
  for (const m of text.matchAll(/className\s*=\s*["'`]([^"'`]*\bfa\b[^"'`]*)["'`]/g)) {
    for (const cls of m[1].split(/\s+/)) {
      if (!cls.startsWith('fa-')) continue
      const name = cls.slice(3)
      if (!faIcons.has(name)) {
        findings.push({
          file,
          line: text.slice(0, m.index).split('\n').length,
          name: `Unknown Font Awesome 4.7 icon "fa-${name}"`,
          severity: 'error',
          hint: 'FA5+ names do not exist in 4.7 and render as a blank box.',
        })
      }
    }
  }

  // Icon names passed via the <Icon name="..." /> helper
  for (const m of text.matchAll(/<Icon\s+name=["']([a-z0-9-]+)["']/g)) {
    if (!faIcons.has(m[1])) {
      findings.push({
        file,
        line: text.slice(0, m.index).split('\n').length,
        name: `Unknown Font Awesome 4.7 icon "${m[1]}"`,
        severity: 'error',
        hint: 'FA5+ names do not exist in 4.7 and render as a blank box.',
      })
    }
  }

  // Icon names held in data arrays and passed to <Icon name={x} />, e.g.
  //   { icon: 'ruler-combined', title: '...' }
  for (const m of text.matchAll(/\bicon\s*:\s*["']([a-z0-9-]+)["']/g)) {
    if (!faIcons.has(m[1])) {
      findings.push({
        file,
        line: text.slice(0, m.index).split('\n').length,
        name: `Unknown Font Awesome 4.7 icon "${m[1]}"`,
        severity: 'error',
        hint: 'FA5+ names do not exist in 4.7 and render as a blank box.',
      })
    }
  }

  // per-tag rules: a target/rel pair can straddle several lines
  for (const m of text.matchAll(TAG_RE)) {
    const tag = m[0]
    if (/target\s*=\s*["']_blank["']/.test(tag) && !NOOPENER_RE.test(tag)) {
      const line = text.slice(0, m.index).split('\n').length
      findings.push({
        file,
        line,
        name: 'target=_blank without noopener',
        severity: 'warn',
        hint: 'Add rel="noopener noreferrer".',
      })
    }
  }
}

const errors = findings.filter((f) => f.severity === 'error')
const warns = findings.filter((f) => f.severity === 'warn')

for (const f of findings) {
  const tag = f.severity === 'error' ? 'ERROR' : 'WARN '
  console.log(`${tag} ${f.file}:${f.line}  ${f.name}${f.hint ? ` — ${f.hint}` : ''}`)
}

if (errors.length) {
  console.error(`\n✖ ${errors.length} blocking issue(s). Refusing to build.`)
  process.exit(1)
}
if (warns.length) {
  console.warn(`\n⚠ ${warns.length} warning(s) — review before shipping.`)
}
console.log(
  `\n✔ scanned ${files.length} file(s), ${faIcons.size} FA icons known. No secrets or unsafe sinks found.`
)
