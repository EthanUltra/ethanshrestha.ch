# ethanshrestha.ch — Portfolio Website

Personal portfolio and project showcase. Live at **[ethanshrestha.ch](https://ethanshrestha.ch)**.

---

## Tech

- **HTML / Tailwind CSS / Vanilla JS** — single-page, no build step
- **Apache** — hosted on a shared server via Hostpoint
- **Cloudflare CDN** — DNS, caching, and DDoS protection
- **Google Translate widget** — multi-language support (EN / DE / FR / ES / ZH / JA / HI / RU)
- **Formspree** — contact form backend

## Security

Rated **A+** on [securityheaders.com](https://securityheaders.com/?q=https%3A%2F%2Fethanshrestha.ch%2F).

| Header | Value |
|---|---|
| Strict-Transport-Security | `max-age=31536000; includeSubDomains` |
| Content-Security-Policy | explicit allowlist, no `unsafe-inline` in `script-src` |
| X-Frame-Options | `SAMEORIGIN` |
| X-Content-Type-Options | `nosniff` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | geolocation, microphone, camera all blocked |

## Structure

```
/
├── index.html          # Main page
├── main.js             # All JS (animations, projects, translate, theme)
├── .htaccess           # Security headers + CSP
└── assets/             # Images and screenshots
```

## Featured Projects

| Project | Stack | Link |
|---|---|---|
| IT Help Desk Ticketing System | React, Node.js, PostgreSQL, Docker | [live](https://api-ticket-system.ethanshrestha.ch) · [repo](https://github.com/EthanUltra/IT-Ticketing-System) |
| Blue Team Log Analysis Lab | React, Node.js, MITRE ATT&CK | [live](https://blue-team.ethanshrestha.ch) · [repo](https://github.com/EthanUltra/Blue-Team-Log-Analysis-Lab) |
| WatchTower (mini SIEM) | React, Python, FastAPI, WebSockets | [live](https://watchtower.ethanshrestha.ch) · [repo](https://github.com/EthanUltra/WatchTower) |
| Secure Authentication Patterns | React, Node.js, Argon2, JWT | [live](https://auth.ethanshrestha.ch) · [repo](https://github.com/EthanUltra/secure-auth-web) |
| AI Code Review | React, Python, FastAPI, Claude API | [live](https://codereview.ethanshrestha.ch) · [repo](https://github.com/EthanUltra/codereview) |
| ChatSphere | React, Node.js, WebSockets, PostgreSQL | [live](https://chatsphere.ethanshrestha.ch) · [repo](https://github.com/EthanUltra/chatsphere) |

## Certifications

- TryHackMe SAL1 — Security Analyst (Jan 2026)
- TryHackMe SEC1 — Cyber Security 101 (Feb 2026)
- TryHackMe PT1 — Junior Penetration Tester (Mar 2026)
