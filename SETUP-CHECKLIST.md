# Setup checklist

## 1. Supabase
- Maak een nieuw Supabase project
- Open de SQL Editor
- Plak `supabase-schema.sql` en voer hem uit

## 2. Omgevingsvariabelen
- Kopieer `.env.example` naar `.env.local`
- Vul in:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

## 3. Dependencies installeren
```bash
npm install
```

## 4. App starten
```bash
npm run dev
```

## 5. Openen
- Ga naar `http://localhost:3000`
- Gebruik op pc de voorraad, dashboard en printflows
- Gebruik op telefoon binnenkomst en scans
- Bluetooth scanner werkt als toetsenbord in het scanveld

## 6. Eerst testen
- Voeg 1 onderdeel toe via `/binnenkomst`
- Scan hem uit via `/uitgifte`
- Controleer dashboard cijfers
- Maak een kar aan
- Test label print route

## 7. Daarna bouwen
- echte auth met Supabase
- OCR met telefooncamera
- voertuig herkenning via OCR + partnummer
- server-side PDF voor karren
- DYMO koppeling
