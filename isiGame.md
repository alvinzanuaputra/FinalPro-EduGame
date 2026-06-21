# Catatan Teknis untuk Claude — STOP! Simulasi Jerat Judol

Dokumen ini menjelaskan cara kerja kode dan game agar Claude (atau developer lain) dapat memahami, memodifikasi, atau melanjutkan proyek tanpa harus membaca seluruh codebase dari nol.

---

## 1. Ringkasan Game

**STOP!** adalah game simulasi naratif interaktif edukasi tentang bahaya judi online (judol) dan pinjaman online (pinjol). Pemain berperan sebagai **Benny**, suami Nadia dan ayah Kayla.

- **Genre:** Visual novel / story game dengan elemen simulasi (HP, slot judol, mode interaktif meja)
- **Tech stack:** HTML + CSS murni + Vanilla JavaScript (ES Modules)
- **Entry point:** `index.html` → memuat `js/main.js?v=3`
- **Resolusi stage:** 900×506.25 px, di-scale responsif via `transform: scale()` di `main.js`
- **Konten sensitif:** perjudian, KDRT, kekerasan — murni edukatif

### 6 Ending

| # | Tipe | Judul | Ringkasan jalur |
|---|------|-------|-----------------|
| 1 | Happy | Berhenti Sebelum Mulai | Tolak ajakan Yadi di prolog |
| 2 | Happy | Belum Terlambat | Terima judol → tolak pinjol → sadar bersama Nadia |
| 3 | Bad | Harga Sebuah Utang | Pinjol → Nadia kabur → nego rentenir → jual ginjal |
| 4 | Bad | Akhir di Atas Rel | Pinjol → Nadia kabur → kabur dari rentenir → bunuh diri |
| 5 | Epilog | Korban yang Ditinggalkan | Otomatis setelah Ending 4 |
| 6 | Bad | Tangan yang Terpaksa | Pinjol → Nadia bertahan → Benny jual istri → Nadia menikam Benny |

Detail naskah dialog tiap ending ada di `README.md`.

---

## 2. Struktur Folder

```
OneMore-storyGames/
├── index.html          # Kerangka UI: stage, HUD, dialog, HP overlay, debug, title screen
├── css/style.css       # Semua styling (layout, animasi, tema)
├── js/
│   ├── main.js         # Entry point, input listener, mode interaktif meja
│   ├── fsm.js          # Multi-FSM state & transisi
│   ├── render.js       # Render HUD + setScene (background & karakter)
│   ├── dialog.js       # Dialog engine (play/next/handle)
│   ├── scenes.js       # SELURUH naskah cerita (data scene)
│   ├── endings.js      # Data & tampilan layar ending
│   ├── phone.js        # Simulasi HP (judol, pinjol, chat)
│   ├── audio.js        # Preload & playback efek suara/BGM
│   └── tools.js        # Panel debug FSM & skip ke ending
└── assets/
    ├── images/backgrounds/
    ├── images/characters/
    ├── images/phone/
    ├── audio/
    └── README_ASSETS.md
```

**Pola import:** Semua modul memakai query `?v=3` untuk cache-busting. Urutan ketergantungan:

```
fsm.js ← render.js ← dialog.js, endings.js, phone.js, tools.js
scenes.js ← fsm, render, dialog, phone
main.js ← render, dialog, phone, tools, audio
```

---

## 3. Arsitektur Inti

Game dibangun di atas **tiga pilar**:

### A. Multi-FSM (Finite State Machine Paralel)

Didefinisikan di `js/fsm.js`. Lima mesin state berjalan paralel dan saling mempengaruhi lewat *guard* di naskah scene:

| Singkatan | Nama | State | Fungsi setter |
|-----------|------|-------|---------------|
| `HR` | FSM_Hari | Angka hari (0, 6, 10, 17, …) | `setHari(h)` |
| `KC` | FSM_Kecanduan | 0–4: Iseng → Penasaran → Kebiasaan → Kecanduan → Sakau | `setKC(v)`, `naikKC()` |
| `SL` | FSM_Saldo | 0–3: Aman → Menipis → Kritis → Minus + `uang` (angka) | `setSaldo(v)` |
| `PJ` | FSM_Pinjol | 0–4: Belum → Pinjam → Gali lubang → Ditagih → Diancam + `utang` | `setPJ(v)`, `tambahUtang(v)` |
| `KL` | FSM_Keluarga | 0–5: Harmonis → Curiga → Konflik → KDRT → Nadia kabur → Nadia bertahan | `setKL(v)` |

Setiap setter memanggil `render()` agar HUD & panel debug ter-update.

**Guard saldo otomatis** (`setSaldo`):
- `uang > 1.000.000` → state 0 (Aman)
- `100.000 ≤ uang < 1.000.000` → state 1 (Menipis)
- `0 < uang < 100.000` → state 2 (Kritis)
- `uang ≤ 0` → state 3 (Minus)

### B. Dialog Engine

Didefinisikan di `js/dialog.js`. Cerita disimpan sebagai **array langkah** di `SCENES` (`js/scenes.js`).

**Tipe langkah (`step.t`):**

| Tipe | Properti | Perilaku |
|------|----------|----------|
| `say` | `who`, `text`, `bg?`, `char?`, `bgm?`, `sound?` | Tampilkan dialog; Space/klik lanjut |
| `choice` | `q`, `opts: [{label, go}]` | Tampilkan tombol pilihan bercabang |
| `fx` | `run: () => {}` | Jalankan efek (ubah FSM, buka mode interaktif, dll.) lalu auto `next()` |
| `call` | `run: () => {}` | Sembunyikan dialog, jalankan callback async (HP overlay) — **tidak** auto next |
| `goto` | `scene` | Pindah ke scene lain via `play(scene)` |
| `ending` | `n` | Panggil `showEnding(n)` |

**API utama:**
- `play('namaScene')` — mulai scene dari awal
- `next()` — lanjut ke langkah berikutnya
- `cont([who, text], 'sceneTujuan')` — sisipkan 1 dialog lalu goto scene

**Input pemain:** Space atau klik `#dialog` memanggil `next()`, kecuali saat pilihan (`#choices`) atau HP overlay terbuka.

### C. Render & Scene Visual

`js/render.js`:
- `render()` — update HUD (saldo, hari, bar kecanduan) + panel debug
- `setScene(bgAlt, charAlt)` — ganti background & karakter
  - `charAlt` bisa string dipisah koma untuk multi-karakter: `'nadia_happy.png, benny_sad.png'`
  - Gambar di-probe dulu; jika gagal load → tampilkan `[ ALT: namafile ]`

**Path gambar:**
- Background: `assets/images/backgrounds/`
- Karakter: `assets/images/characters/`
- Phone: `assets/images/phone/`

---

## 4. Alur Cerita (Story Flow)

### Diagram percabangan utama

```
[Title Screen] → startGame() → prolog
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
              TOLAK judol                      TERIMA judol
                    │                               │
              ending1 (H1)                    terima → [mode interaktif]
                                                    │
                                          check_events (berdasarkan HR.s)
                                                    │
                    ┌───────────────────────────────┼───────────────────────────────┐
                    │                               │                               │
               HR=0 → terima2                  HR=6 → terima3                 HR=17 → jalurPinjol3
               (Hari 6)                        (Hari 10)                      (Hari 17+)
                                                    │                               │
                                          pilihan pinjol?                    [interaktif loop]
                                    ┌───────────────┴───────────┐                   │
                                    │                           │              HR=23, 30, 103...
                              TOLAK pinjol                 TERIMA pinjol            │
                                    │                           │                   │
                              jalurSadar                  jalurPinjol → ...    jalur_103
                              ending2 (H2)                      │              pilihan Nadia
                                                                │           ┌──────┴──────┐
                                                         [pinjol spiral]   KABUR      BERTAHAN
                                                                                │           │
                                                                          jalurKabur   jalurBertahan
                                                                                │           │
                                                                         ending3/4     ending6
                                                                         (H3/H4→H5)
```

### Scene `check_events` — penghubung mode interaktif

Setelah pemain selesai main HP (judol) di mode interaktif, callback memanggil `play('check_events')`. Scene ini memeriksa `FSM.HR.s`:

```javascript
hr === 0  → terima2      // setelah pertama kali main judol
hr === 6  → terima3      // setelah spiral hari 6
hr === 17 → jalurPinjol3 // setelah pinjol pertama
hr === 23 → jalur_30     // setelah pinjol kedua
hr === 30 → jalur_103    // setelah KDRT
else      → interactive_loop  // kembali ke meja interaktif
```

Ini adalah **mekanisme progresi waktu**: setiap kali pemain selesai sesi judol di HP, cerita maju ke milestone berikutnya.

### Mode Interaktif Meja (`enterInteractiveMode`)

Diaktifkan dari `main.js` saat Benny "duduk di meja". Fitur:

| Hitbox | Aksi |
|--------|------|
| `#hitbox-hp` | Buka overlay judol (`phoneJudol`) → setelah tutup → `check_events` |
| `#hitbox-pisang` | Animasi makan (sekali), dialog singkat |
| `#hitbox-kopi` | Animasi minum kopi (sekali) |
| `#hitbox-remote` | Ganti channel TV (berita vs bola) |

State one-shot: `hasPisang`, `isCoffeeFull`, `isTvChannel1` di `main.js`.

Background mode interaktif: `bg_meja_interaktif.png` (atau `.svg`).

---

## 5. Simulasi HP (`js/phone.js`)

Overlay smartphone (`#phone-overlay`) menampilkan mini-app HTML yang di-generate dinamis.

### Fungsi utama

| Fungsi | Dipakai untuk |
|--------|---------------|
| `phoneChatYadi(cb)` | Chat prolog dari Yadi |
| `phoneJudol(cb)` | Mini-game slot judol |
| `phoneRegisterPinjol(name, cls, cb)` | Form registrasi pinjol fiktif |
| `phoneNotification(title, msg, cb)` | Notifikasi (mis. gaji masuk) |
| `closePhone()` | Tutup overlay, jalankan callback `_afterPhone` |

### Mekanisme judol (edukatif)

1. Pemain pilih taruhan (Rp 5k–25k) dan multiplier spin (3x/5x/7x)
2. Slot reel animasi — **2 spin pertama selalu menang** (hook), setelahnya win rate ~10%
3. Setiap spin: potong saldo → `naikKC()` → update FSM
4. Tombol "Top up" menawarkan pinjol instan (lingkaran setan edukatif)
5. `backToMenu()` / `closePhone()` kembali ke cerita via callback

**Penting:** Fungsi yang dipanggil dari `onclick=""` di HTML hasil generate **harus diekspos ke `window`**:
`closePhone`, `spin`, `openBetPopup`, `selectBet`, `selectMultiplier`, `judolTopup`, `backToMenu`

---

## 6. Sistem Ending (`js/endings.js`)

`showEnding(n)` membuat overlay fullscreen dengan badge, judul, pesan, dan tombol:
- Ending 1, 2, 3, 5, 6 → tombol **MAIN LAGI** (`location.reload()`)
- Ending 4 → tombol **LANJUT →** otomatis ke Ending 5 (epilog)
- Ending 2 saja yang menampilkan blok `TIPS` berhenti judol

Audio: Happy ending (1, 2) vs Sad ending (sisanya).

---

## 7. Audio (`js/audio.js`)

- Preload semua file `.mp3` dari `assets/audio/` saat `startGame()` → `initAudio()`
- API: `playSound(key)`, `loopSound(key)`, `stopSound(key)`, `stopAllSounds()`
- Key = nama file tanpa `.mp3` (mis. `sunday_Morning1`, `Slot_spin`)
- Scene bisa set `bgm` dan `sound` di langkah `say`

---

## 8. Tools Debug (`js/tools.js`)

| Tombol | Fungsi |
|--------|--------|
| `FSM ▸` | Toggle panel debug multi-FSM |
| `⏭ Demo Ending` | Menu lompat langsung ke ending 1–6 |

`jumpEnding(n)` meng-set state FSM agar konsisten dengan konteks ending, lalu `showEnding(n)`.

Fungsi diekspos ke `window`: `toggleDebug`, `toggleSkip`, `jumpEnding`.

---

## 9. Pola Kode Penting (untuk modifikasi aman)

### ES Modules + onclick HTML

Karena ES module scope lokal, fungsi yang dipanggil dari atribut `onclick=""` di `index.html` atau HTML dinamis **wajib** di-assign ke `window`:

```javascript
window.startGame = startGame;       // main.js
window.toggleDebug = toggleDebug;   // tools.js
window.closePhone = closePhone;     // phone.js
```

### Menambah scene baru

1. Tambah entry di `SCENES` di `js/scenes.js`
2. Hubungkan via `play('namaScene')`, `goto`, atau `choice.go`
3. Ubah FSM lewat `setHari`, `setSaldo`, dll. di langkah `fx`
4. Tambah gambar di folder `assets/images/` sesuai nama di `char` / `bg`

### Menambah langkah dialog

```javascript
{
  t: 'say',
  who: 'Nadia',
  text: 'Teks dialog di sini.',
  bg: 'latar_ruang_tamu.png',           // opsional
  char: 'nadia_happy.png, benny_neutral.png',  // opsional, koma = multi
  bgm: 'sunday_Morning1',               // opsional
  sound: 'Whoosh_transition'            // opsional
}
```

### Menambah pilihan bercabang

```javascript
{
  t: 'choice',
  q: 'Pertanyaan untuk pemain?',
  opts: [
    { label: 'Opsi A', go: () => play('sceneA') },
    { label: 'Opsi B', go: () => play('sceneB') },
  ]
}
```

### Menambah ending

1. Tambah data di objek `ENDINGS` di `endings.js`
2. Tambah scene dengan `{ t: 'ending', n: 7 }`
3. Update menu skip di `index.html` dan `jumpEnding()` di `tools.js` jika perlu

---

## 10. Karakter & Konteks Naratif

| ID | Nama | Peran |
|----|------|-------|
| Saya (Benny) | Benny | Protagonis / pemain |
| Nadia | Istri Benny | Korban KDRT, pilihan kabur/bertahan di hari 103 |
| Kayla | Anak SMP | Korban dampak finansial & emosional |
| Yadi | Teman | Penggoda awal judol |
| Pak Heru | Pemilik kontrakan | Penagih sewa |
| Rentenir | Penagih utang | Klimaks ending 3/4 |
| Bu Fera | Tetangga | Epilog ending 5 |

---

## 11. Cara Menjalankan

Buka `index.html` di browser (perlu server lokal jika browser memblokir ES module dari `file://`):

```bash
# Contoh dengan Python
cd OneMore-storyGames
python3 -m http.server 8080
# Buka http://localhost:8080
```

Atau gunakan Live Server di VS Code/Cursor.

---

## 12. Hal yang Sering Dimodifikasi

| Kebutuhan | File yang disentuh |
|-----------|-------------------|
| Ubah dialog / alur cerita | `js/scenes.js` |
| Ubah threshold FSM / saldo awal | `js/fsm.js` |
| Ubah tampilan HUD / layout | `css/style.css`, `index.html` |
| Ubah mekanik slot judol | `js/phone.js` (`doSpinRun`, win rate) |
| Ubah teks ending | `js/endings.js` |
| Tambah efek suara | `js/audio.js` + file di `assets/audio/` |
| Tambah gambar | `assets/images/` + referensi nama di scene |

---

## 13. Catatan untuk Claude saat Debugging

1. **Cerita tidak maju setelah main HP?** Periksa callback `_afterPhone` di `phoneJudol` — harus memanggil `play('check_events')` atau scene lain.
2. **onclick tidak jalan di HP?** Pastikan fungsi sudah di `window.*`.
3. **Gambar tidak muncul?** Cek nama file persis sama dengan string di `char`/`bg`. Lihat `assets/README_ASSETS.md`.
4. **FSM tidak update di HUD?** Pastikan setter (`setSaldo`, dll.) dipanggil, bukan mutasi langsung `FSM.X.s` tanpa `render()` (kecuali sudah ada `render()` setelahnya).
5. **Scene macet di `call`?** Langkah `call` tidak auto-advance — callback harus memanggil `next()` atau `play()` sendiri.
6. **Cache modul lama?** Naikkan `?v=3` di import dan `<script>` tag.

---

*Dokumen ini dibuat sebagai konteks kerja untuk AI/developer. Untuk sinopsis ending dan peringatan konten, lihat `README.md`.*
