# Magazijn App

Next.js + Supabase basis voor:
- onderdelen scannen
- binnenkomst en uitgifte
- voorraadbeheer
- maandcijfers
- label printen
- PDF per kar
- pc + telefoon + bluetooth scanner

## Starten

1. Maak een Supabase project.
2. Plak de SQL migratie die eerder is gemaakt in Supabase SQL editor.
3. Kopieer `.env.example` naar `.env.local` en vul de keys in.
4. Installeer dependencies:

```bash
npm install
```

5. Start lokaal:

```bash
npm run dev
```

## Belangrijke routes

- `/dashboard`
- `/binnenkomst`
- `/uitgifte`
- `/voorraad`
- `/karren`

## Wat nog slim is om hierna te bouwen

- echte auth met Supabase
- OCR met telefooncamera
- betere voertuigherkenning via partnummer + OCR
- echte DYMO integratie
- server-side PDF export voor karren
- rechten per bedrijf/gebruiker
