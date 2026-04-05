# AGENTS.md — Port A Local Wiki Schema

This file tells Havee how the Port A Local wiki is structured and how to maintain it.

---

## Wiki Structure

```
vault/
├── Home.md                          ← Dashboard + status + quick links
├── Project Overview.md              ← Vision, team, model, tech stack
├── AGENTS.md                        ← This file — wiki schema
├── index.md                         ← Full page catalog (auto-maintained)
├── log.md                           ← Append-only activity log
├── Business Directory/
│   ├── Business Directory Index.md  ← All 138 businesses by category
│   ├── Eat/                         ← Individual business pages
│   ├── Drink/
│   ├── Stay/
│   ├── Do/
│   ├── Fish/
│   ├── Beach/
│   ├── Shop/
│   ├── Services/
│   └── Realty/
├── Features/
│   ├── Features Index.md            ← All feature specs
│   └── [Feature Name].md           ← Individual feature spec pages
├── Revenue Model/
│   └── Revenue Model.md            ← How PAL makes money
├── Contacts/
│   ├── Contacts Index.md           ← Key relationships
│   └── [Contact Name].md          ← Individual contact pages
├── Session Notes/
│   ├── Session Notes Index.md      ← Table of all sessions
│   └── YYYY-MM-DD.md              ← Per-session notes
└── Raw Sources/
    ├── README.md                   ← Instructions + ingestion log
    └── Business Data/             ← Source CSVs, sheets, lists
```

---

## Workflows

### Ingest a Source
1. User drops file in `Raw Sources/`
2. Read the source
3. Discuss key takeaways with Winston
4. Write or update relevant wiki pages
5. Update `Raw Sources/README.md` ingestion log
6. Append entry to `log.md`

### Add a Business
1. Add to `Business Directory/[Category]/[Business Name].md`
2. Update `Business Directory/Business Directory Index.md` count
3. Update `Home.md` status table

### Answer a Query
1. Read `index.md` to find relevant pages
2. Read those pages, synthesize and answer with citations
3. File valuable answers back as new wiki pages

### Lint (periodic)
- Check for: businesses missing pages, stale counts, broken links
- Flag new features worth speccing, missing contact info
- Suggest next businesses to add by category

---

## Conventions

- All pages use `[[wiki links]]` for cross-references
- Index files are always kept current
- `log.md` is append-only — never delete entries
- Dates: YYYY-MM-DD format always
- No PUD businesses — exception: Lisabella's only

## Key Rules

- No PUD developments (Cinnamon Shore, Palmilla, Sunflower Beach, etc.) — Lisabella's is the only exception
- JOY Cart Rentals (Nick & wife) = Tier 1 golf cart rental engine
- Billy Gaskins (Woody's Last Stand) = priority relationship 🔑
