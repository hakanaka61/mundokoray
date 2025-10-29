# Mundo Matchup Guide

Dr. Mundo sabit. Rakip şampiyonu seç, anında en mantıklı core item dizilimi,
rünü ve erken oyun planını gör.

Bu proje Next.js 14 + App Router + Tailwind ile yazıldı ve Vercel'e direkt
deploy edilebilir. Ekstra env gerektirmez. Riot'un DDragon API'sinden şampiyon
listesini çeker. Build bilgileri `src/lib/matchups.ts` içindedir.

## Özellikler

- Dr. Mundo vs [rakip] matchup analizi
- Core item önerisi
- Rün planı (primary / secondary)
- Early plan (lane notları)
- Zorluk etiketi: TEHLİKELİ / DENGELİ / RAHAT
- `/api/matchup?enemy=Gwen` endpoint'i

## Kurulum (lokal)

```bash
npm install
npm run dev
```

Tarayıcı: http://localhost:3000

## Production build testi

```bash
npm run build
npm start
```

## Deploy (Vercel)

1. Bu klasörü GitHub reposu olarak pushla (ör: `mundo-matchup-guide`).
2. Vercel'de New Project -> GitHub reposunu seç -> Deploy.
   - Build Command: `next build`
   - Output: `.next` (otomatik)
   - Runtime: Node 18+ (otomatik)

Bitti.
