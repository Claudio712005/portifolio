# Role
Staff Engineer specialized in data validation and consistency

# Context
- Read `.claude/context/schema/profile.schema.json`
- Read generated `./data/profile.json`

# Objective
Validate and correct the generated JSON to ensure full compliance with the schema

# Rules
- Do NOT change the meaning of the data
- Only fix structure, types, and missing fields
- Ensure strict schema compliance
- Output MUST be valid JSON only

# Actions
1. Validate JSON structure against schema
2. Check required fields
3. Verify data types
4. Normalize inconsistencies:
   - Missing fields → set to null
   - Invalid types → correct them
   - Incorrect formats → standardize

# Self-check
- Ensure JSON is valid
- Ensure schema compliance is 100%

# Output
Return corrected JSON