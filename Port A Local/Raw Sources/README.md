# Raw Sources

This folder holds immutable source documents — the ground truth that feeds the wiki.

The LLM reads from these but never modifies them. When you add a new source, drop it here and ask Havee to ingest it.

---

## Ingested Sources

| File | Date Added | Type | Wiki Pages Updated |
|------|-----------|------|-------------------|
| Google Sheet (live) | 2026-04-04 | Business directory data | Business Directory Index |
| Collie's shop list (email) | 2026-04-04 | 14 Shop listings | Business Directory/Shop |

---

## Pending Ingestion

| File | Notes |
|------|-------|
| _(drop files here)_ | — |

---

## How to Add a Source

1. Drop the file in this folder (or a subfolder)
2. Tell Havee: "Ingest [filename] into the PAL wiki"
3. Havee will read it, discuss key takeaways, and update relevant wiki pages
4. The ingestion gets logged here and in [[log]]

---

## Live Data Sources

| Source | URL | Notes |
|--------|-----|-------|
| Business directory sheet | [Google Sheets](https://docs.google.com/spreadsheets/d/1Xrn7-2M9nhiR9vDkAeeLFr5evBz8bsAU0EP4lb0PnXk) | Master business list |
| Live site | [port-a-local.vercel.app](https://port-a-local.vercel.app) | Production |
| Maintenance portal | [/maintenance](https://port-a-local.vercel.app/maintenance) | Live |
