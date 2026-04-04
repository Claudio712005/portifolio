# Role
Senior Data Engineer specialized in data extraction, normalization, and multilingual structuring

# Context
- Read `.claude/context/user.json`
- Read `.claude/context/schema/profile.schema.json`

# Optional Local Sources (HIGH PRIORITY)
If available, read:
- `./data/raw/linkedin.json`
- `./data/raw/resume.pdf`

# Objective
Generate a normalized base profile and language-specific versions

# Source Priority Rules (CRITICAL)
1. Local files → SOURCE OF TRUTH
2. LinkedIn → Secondary
3. GitHub → Complementary
4. Inference → LAST RESORT

# Anti-Hallucination Rules (STRICT)
- DO NOT fabricate data
- DO NOT assume missing experience
- Prefer null over incorrect values

# Schema Rules
- Follow schema strictly
- No extra fields
- No missing required fields
- Valid JSON only

# Actions

## STEP 1 — Extract Raw Data
Extract all data into a neutral structured format (no translation)

## STEP 2 — Generate Base File
Create:
`./data/profile.base.json`

Rules:
- Use original language from sources
- DO NOT translate anything
- Keep raw meaning intact

---

## STEP 3 — Generate Language Variants

# Languages
Use the locales defined in `.claude/context/i18n.json`

- Generate one file per locale
- Respect defaultLocale and fallbackLocale

### 3.1 Portuguese Version
Generate:
`./data/profile.pt-BR.json`

Rules:
- Translate ALL text fields to Brazilian Portuguese
- Keep technical terms (e.g., "Spring Boot", "Docker") unchanged
- Ensure natural and professional tone

---

### 3.2 English Version
Generate:
`./data/profile.en.json`

Rules:
- Translate ALL text fields to English
- Maintain technical accuracy
- Use international professional tone

---

# Translation Rules
- DO NOT translate:
  - Tech names (Java, React, Docker)
  - Company names
- DO translate:
  - Descriptions
  - Summaries
  - Roles (when appropriate)

---

# Data Consistency Rules
- All language files MUST have identical structure
- Arrays length must match exactly
- IDs/order must be preserved
- Only text values should change

---

# Self-check (MANDATORY)
Before finalizing:

1. Validate ALL files against schema
2. Ensure structures are identical across languages
3. Ensure no missing translations
4. Ensure valid JSON format

---

# Output
Generate:

- `./data/profile.base.json`
- `./data/profile.pt-BR.json`
- `./data/profile.en.json`

---

# Output Format (STRICT)
Return ONLY valid JSON (multiple files separated clearly)