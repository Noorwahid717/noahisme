# Booking Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         PRICING SECTION                         │
│                         (Homepage /)                            │
└─────────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┴───────────────┐
                │                               │
        ┌───────▼────────┐              ┌──────▼───────┐
        │   MODE: HOURLY │              │ MODE: PROJECT│
        │   (Per Jam)    │              │ (Per Proyek) │
        └───────┬────────┘              └──────┬───────┘
                │                               │
     ┌──────────┴──────────┐          ┌────────┴─────────┐
     │                     │          │                  │
┌────▼────────┐    ┌──────▼──────┐   │                  │
│ PRIMARY CTA │    │SECONDARY CTA│   │                  │
│ "Mulai dari │    │"Cek Keter-  │   │                  │
│  2 Jam"     │    │ sediaan"    │   │                  │
└────┬────────┘    └──────┬──────┘   │                  │
     │                    │           │                  │
     │                    │           │                  │
     ▼                    ▼           │                  │
┌─────────────┐    ┌─────────────┐   │                  │
│/book/hourly │    │/book/intro  │   │                  │
│             │    │  #calendar  │   │                  │
└─────────────┘    └─────────────┘   │                  │
     │                    │           │                  │
     │                    │           ▼                  ▼
     │                    │    ┌──────────────┐   ┌──────────────┐
     │                    │    │ PRIMARY CTA  │   │SECONDARY CTA │
     │                    │    │"Minta Estimasi│   │"Jadwalkan   │
     │                    │    │  Proyek"     │   │ Discovery"   │
     │                    │    └──────┬───────┘   └──────┬───────┘
     │                    │           │                  │
     │                    │           ▼                  ▼
     │                    │     ┌──────────┐      ┌──────────────┐
     │                    │     │  /brief  │      │/book/project │
     │                    │     └──────────┘      └──────────────┘
     │                    │           │                  │
     │                    │           │                  │
     ▼                    ▼           ▼                  ▼
┌────────────────────────────────────────────────────────────────┐
│                      BOOKING OPTIONS                           │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  1. Cal.com Calendar Embed                                    │
│     └─ Direct booking dengan pilihan tanggal/waktu            │
│                                                                │
│  2. WhatsApp Fallback                                         │
│     └─ Pre-filled message template                            │
│                                                                │
│  3. Email Fallback                                            │
│     └─ Pre-filled subject & body                              │
│                                                                │
│  4. Form Submission (/brief only)                             │
│     └─ FormSubmit.co integration                              │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## Routing Structure

```
/
├── /book/
│   ├── intro          → Intro Call (20m)
│   ├── tech           → Tech Consultation (60m)
│   ├── project        → Discovery Workshop (60-90m)
│   └── hourly         → Hourly Dev Support (min 2h)
│
└── /brief             → Project Estimation Form
```

---

## Decision Tree untuk User

```
Apakah user sudah tahu yang dibutuhkan?
│
├─ TIDAK → /book/intro (Intro Call 20m)
│          └─ Gratis, validasi kebutuhan
│
└─ YA → Seberapa besar scopenya?
        │
        ├─ KECIL (< 8 jam) → /book/hourly
        │                    └─ Task terdefinisi, eksekusi cepat
        │
        └─ BESAR → Butuh diskusi teknis dulu?
                   │
                   ├─ YA → /book/tech (Tech Consultation 60m)
                   │       └─ Validasi arsitektur, tech stack
                   │
                   └─ TIDAK → Sudah siap dengan scope?
                              │
                              ├─ SUDAH → /book/project (Discovery Workshop)
                              │          └─ Scoping detail & sprint planning
                              │
                              └─ BELUM → /brief (Form Estimation)
                                        └─ Isi brief, tunggu estimasi 1-2 hari
```

---

## Cal.com URLs Mapping

| Route           | Cal.com Event                      |
| --------------- | ---------------------------------- |
| `/book/intro`   | https://cal.com/noahisme/intro     |
| `/book/tech`    | https://cal.com/noahisme/tech      |
| `/book/project` | https://cal.com/noahisme/discovery |
| `/book/hourly`  | https://cal.com/noahisme/hourly    |

---

## User Journey Timeline

```
┌─────────────┐
│  Discovery  │  User baca Pricing Section
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Evaluation  │  User pilih mode (Hourly vs Project)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Action    │  User klik CTA → Redirect ke booking page
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Booking    │  User pilih jadwal atau isi form
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Confirmation │  Cal.com/FormSubmit konfirmasi
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Follow-up   │  Email/WhatsApp/Call sesuai booking
└─────────────┘
```

---

## Page Load Performance

Semua halaman booking di-optimize untuk:

- Fast page load (< 2s)
- No JavaScript required untuk Cal.com embed
- Fallback options jika embed gagal load
- Mobile responsive
- Accessibility compliant (ARIA labels, keyboard nav)
