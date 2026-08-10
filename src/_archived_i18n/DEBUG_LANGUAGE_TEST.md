# 🐛 DEBUG INSTRUCTIONS - Language Switching Test

## CARA TEST YANG BENAR:

### ❌ JANGAN Pakai curl
Curl hanya melihat HTML server-side, TIDAK bisa test JavaScript hydration!

### ✅ HARUS Pakai Browser

## LANGKAH-LANGKAH TEST:

### 1. Buka Browser DevTools
- Tekan F12 atau Ctrl+Shift+I
- Buka tab **Console**

### 2. Buka Homepage
```
http://localhost:4321/
```

### 3. Perhatikan yang Muncul:

#### A. Di kanan bawah ada DEBUG BOX:
```
🐛 Language Debug
Current Lang: id
URL Param: none
localStorage: id (atau none)
Full URL: http://localhost:4321/
```

#### B. Di Console Browser harus ada:
```
[I18nText] Key: intro.label, Detected lang: id, Text: Halo!
[I18nText] Key: badge.backend, Detected lang: id, Text: Sistem Backend
[I18nText] Key: intro.heading, Detected lang: id, Text: Saya berkontribusi...
... dst
```

#### C. Di halaman harus terlihat:
- ✅ "Halo!" (bukan kosong)
- ✅ "Sistem Backend" (bukan kosong)
- ✅ "Tentang Pekerjaan Saya" (bukan kosong)

### 4. Test Switching ke English:

#### A. Klik Globe Icon di Navbar (kanan atas)
#### B. Pilih "English 🇬🇧"
#### C. Page akan RELOAD dengan URL baru:
```
http://localhost:4321/?lang=en
```

#### D. Setelah reload, perhatikan:

**Debug Box harus berubah jadi:**
```
🐛 Language Debug
Current Lang: en  ← HARUS JADI 'en'!
URL Param: en     ← HARUS JADI 'en'!
localStorage: en  ← HARUS JADI 'en'!
```

**Console harus ada:**
```
[I18nText] Key: intro.label, Detected lang: en, Text: Hello!
[I18nText] Key: badge.backend, Detected lang: en, Text: Backend System
```

**Halaman harus berubah jadi:**
- ✅ "Hello!" (bukan "Halo!")
- ✅ "Backend System" (bukan "Sistem Backend")
- ✅ "About My Work" (bukan "Tentang Pekerjaan Saya")

## KALAU MASIH GAGAL, SCREENSHOT INI:

1. **Screenshot Debug Box** (kanan bawah)
2. **Screenshot Console** (tekan F12, tab Console)
3. **Screenshot teks yang muncul** di halaman
4. **Screenshot Network tab** → cari file yang di-load

## POSSIBLE PROBLEMS:

### Problem 1: Debug box tidak muncul
**Cause:** React component tidak hydrate
**Fix:** Cek Console error

### Problem 2: Debug box muncul tapi "Current Lang" tetap "id"
**Cause:** `getCurrentLanguage()` tidak baca URL parameter dengan benar
**Fix:** Cek apakah URL benar-benar ada `?lang=en`

### Problem 3: Debug box sudah "en" tapi text tetap Indonesia
**Cause:** I18nText component tidak re-render setelah detect language
**Fix:** Cek Console apakah ada log dari I18nText

### Problem 4: Console ada error
**Cause:** JavaScript error blocking hydration
**Fix:** Screenshot error message

## QUICK MANUAL TEST:

Buka browser console dan ketik:
```javascript
// Test 1: Cek getCurrentLanguage
const { getCurrentLanguage } = await import('./src/lib/i18n.ts');
getCurrentLanguage(); // harus return 'id' atau 'en'

// Test 2: Cek URL parameter
new URLSearchParams(window.location.search).get('lang'); // harus return 'en' kalau ada

// Test 3: Cek localStorage
localStorage.getItem('language'); // harus return 'id' atau 'en'

// Test 4: Manual switch
localStorage.setItem('language', 'en');
window.location.reload();
```

---

## EXPECTED BEHAVIOR:

1. **Initial load (`http://localhost:4321/`):**
   - Server HTML: Bahasa Indonesia ✅
   - Setelah hydration (0.1-0.5 detik): Tetap Indonesia ✅
   - Debug box: "Current Lang: id" ✅

2. **After clicking English:**
   - URL berubah jadi: `http://localhost:4321/?lang=en` ✅
   - Page reload ✅
   - Server HTML: Tetap Indonesia (normal untuk SSG) ✅
   - Setelah hydration: BERUBAH jadi English ✅
   - Debug box: "Current Lang: en" ✅

3. **After clicking Indonesia again:**
   - URL berubah jadi: `http://localhost:4321/?lang=id` ✅
   - Page reload ✅
   - Kembali ke Indonesia ✅

---

**CATATAN PENTING:**
Karena Astro menggunakan Static Site Generation (SSG), akan selalu ada "flash" singkat 
bahasa Indonesia sebelum berubah ke English. Ini NORMAL dan tidak bisa dihindari kecuali 
kita ganti ke Server-Side Rendering (SSR) mode.

Yang penting: **Setelah 0.5 detik page load, text HARUS berubah ke English!**
