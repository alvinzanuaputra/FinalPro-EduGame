# Prompt untuk Claude Code — Memperdalam Dampak Emosional Game "STOP!"

> Salin bagian yang kamu butuhkan ke Claude Code Desktop. Bagian 0 adalah **brief utama** (tempel dulu di awal sesi). Bagian 1–6 adalah prompt per-fitur yang bisa kamu jalankan satu per satu.

---

## 0. BRIEF UTAMA (tempel ini lebih dulu, sekali di awal sesi)

```
Kamu membantuku mengembangkan game web "STOP!" — visual novel edukasi berbasis
HTML + CSS + Vanilla JS (ES Modules) tentang bahaya judi online (judol) dan
pinjaman online (pinjol). Baca dulu file `isiGame.md` di root proyek: itu
dokumentasi teknis lengkap soal arsitektur (multi-FSM di js/fsm.js, dialog
engine di js/dialog.js, naskah di js/scenes.js, simulasi HP di js/phone.js,
ending di js/endings.js, audio di js/audio.js). Patuhi pola yang ada di sana
— terutama: fungsi yang dipanggil dari onclick HTML wajib di-assign ke window,
dan naikkan parameter cache-bust ?v= saat mengubah modul.

TUJUAN DESAIN (paling penting):
Game ini harus membuat pemain MERASAKAN jeratan dan PENYESALAN judol supaya
jera — BUKAN membuat mekanik yang terasa seru/memuaskan sampai mendorong orang
benar-benar ingin berjudi. Setiap penambahan sound/motion/feedback harus
mengarah ke disonansi: euforia palsu sesaat → diikuti kehampaan, rasa bersalah,
dan konsekuensi nyata pada keluarga. Kalau sebuah ide membuat judol terasa
"menang itu enak" tanpa harga emosional, JANGAN tambahkan — itu garis antara
game edukasi dan iklan judol.

ATURAN KERJA:
- Sebelum mengubah, ringkas dulu rencanamu dan file yang akan disentuh, tunggu
  aku setuju.
- Jangan menghapus fitur yang sudah ada; tambah secara aditif dan reversible.
- Jaga agar game tetap jalan tanpa error di setiap langkah (tes di server lokal).
- Beri komentar singkat di kode baru, pakai Bahasa Indonesia seperti kode yang ada.
- Aset (gambar/audio) yang belum ada: buat placeholder + catat di daftar TODO
  aset, jangan bikin game crash kalau file belum ada (pola probe gambar sudah
  ada di render.js — ikuti itu).

Konfirmasi kamu sudah membaca isiGame.md dan paham tujuan desainnya, lalu
tunggu instruksi fitur berikutnya.
```

---

## 1. AUDIT & RENCANA "EMOTIONAL BEATS"

```
Lakukan audit naratif-emosional, jangan ubah kode dulu. Telusuri js/scenes.js,
js/phone.js, js/endings.js, dan js/audio.js. Buat tabel "emotional beat map":
untuk tiap milestone cerita (prolog, judol pertama, spiral hari 6, pinjol,
KDRT, tiap ending), tuliskan:
  - emosi yang SEHARUSNYA dirasakan pemain di titik itu,
  - apakah sound/motion/visual sekarang sudah mendukung emosi itu,
  - gap-nya apa, dan
  - 1 usulan konkret paling berdampak untuk menutup gap (sound, animasi,
    haptic-visual, pacing, atau teks).
Output sebagai daftar prioritas (impact tinggi → rendah). Belum perlu menulis
kode.
```

---

## 2. SOUND & MOTION JUDOL — EUFORIA PALSU LALU HAMPA

```
Perdalam feedback sensorik di simulasi slot judol (js/phone.js) DAN audio
(js/audio.js), dengan tujuan disonansi edukatif, bukan kepuasan.

Saat MENANG (terutama 2 spin "hook" awal):
- suara & animasi sengaja megah/berlebihan (kilau, getar layar, koin, fanfare)
- TAPI tahan sebentar lalu beri "after-beat" hampa: musik berhenti mendadak,
  layar meredup, dan saldo/teks kecil mengingatkan total yang sudah dikeluarkan.

Saat KALAH (mayoritas spin setelah hook):
- escalating tension: nada makin nyaring/menekan, jeda makin pendek (ritme
  yang bikin gelisah, meniru desain adiktif justru untuk dibongkar)
- micro-pause + suara hampa, bukan langsung lanjut.

Tambahkan juga "running cost" yang selalu terlihat: total uang yang sudah
masuk ke judol sejak awal sesi, ditampilkan kecil tapi persisten, makin lama
makin terasa berat.

Implementasi: tetap pakai API audio yang ada (playSound/loopSound/stopSound).
Untuk file audio yang belum ada, daftarkan sebagai TODO aset dengan nama file
yang konsisten gaya yang sudah dipakai, dan pastikan kode tidak error bila file
belum tersedia. Tunjukkan rencana + daftar key audio baru sebelum menulis kode.
```

---

## 3. SISTEM "RASA BERSALAH" — KONSEKUENSI YANG TERLIHAT

```
Tambahkan lapisan visual-emosional yang membuat konsekuensi judol terasa
personal dan menumbuhkan rasa bersalah pemain (sebagai Benny). Ide:

- "Guilt meter" tersembunyi/half-visible yang naik tiap kali pemain memilih
  judol/pinjol di momen yang merugikan keluarga. Tidak perlu angka mentah ke
  pemain — wujudkan lewat perubahan lingkungan.
- Reaksi pasif keluarga di mode interaktif meja: foto keluarga di dinding
  perlahan pudar/miring, mainan Kayla tergeletak, pesan chat Nadia yang belum
  dibalas menumpuk, piring makan yang kosong. Detail kecil yang menumpuk.
- Kontras: di awal rumah hangat (warna, BGM lembut) → makin lama makin dingin,
  sepi, desaturasi, suara ambient rumah menghilang.

Pakai FSM yang ada (KL/FSM_Keluarga, KC, SL, PJ) sebagai pemicu kondisi, jangan
bikin sistem state paralel baru kalau bisa diturunkan dari yang sudah ada.
Jelaskan dulu kondisi-pemicunya (threshold FSM mana memicu perubahan apa)
sebelum menulis kode.
```

---

## 4. SUDUT PANDANG GANDA — KELUARGA & RENTENIR

```
Saat ini pemain hanya berperan sebagai Benny. Tambahkan segmen "ganti sudut
pandang" agar pemain juga merasakan sisi korban dan sisi penagih. Rancang
sebagai sisipan naratif pendek (bukan merombak alur utama), dipicu oleh
kondisi FSM tertentu.

A. SUDUT PANDANG NADIA (istri / keluarga):
   - dipicu saat KL mencapai konflik/KDRT (mis. KL>=2) atau menjelang hari 103.
   - pemain sesaat mengontrol/melihat dari sisi Nadia: membaca notifikasi
     tagihan diam-diam, menyembunyikan kecemasan dari Kayla, memilih bertahan
     atau pergi. Tujuan: empati pada korban.

B. SUDUT PANDANG RENTENIR / PENAGIH:
   - dipicu di jalur pinjol berat (PJ>=3).
   - perlihatkan judol/pinjol sebagai SISTEM yang dirancang untuk menjerat
     (script penagihan, target, cara mempermainkan rasa takut) — supaya pemain
     paham ini bukan "nasib", tapi mesin yang sengaja memangsa. JANGAN jadikan
     panduan/tutorial cara menagih atau menjerat orang; bingkai sebagai
     pembongkaran/edukasi, tetap dari sisi dampak ke korban.

Untuk tiap sudut pandang: tentukan scene baru di js/scenes.js, kondisi pemicu
(guard berbasis FSM), bagaimana kembali ke alur Benny, dan apakah perlu state
penanda agar tidak terulang. Tunjukkan diagram percabangan kecil + daftar scene
baru sebelum implementasi. Sesuaikan juga check_events / interactive_loop bila
perlu agar sisipan ini terhubung mulus.
```

---

## 5. PACING, TRANSISI & POLISH SINEMATIK

```
Tingkatkan kualitas "rasa" lewat pacing dan transisi tanpa mengubah cerita:
- transisi antar-scene yang mendukung emosi (fade lambat ke gelap untuk momen
  berat; cut tajam untuk kejutan; slow-fade desaturasi saat kondisi memburuk).
- "breathing room": jeda hening yang disengaja sebelum/ sesudah momen klimaks
  (mis. setelah Nadia kabur, beri layar sunyi beberapa detik sebelum dialog).
- micro-animasi karakter (idle bergetar saat sakau/cemas) bila aset memungkinkan;
  kalau tidak, simulasikan via CSS transform pada sprite yang ada.
- konsistensi audio: pastikan stopAllSounds dipanggil di titik transisi besar
  agar tidak ada BGM bertumpuk.
Kerjakan lewat css/style.css + helper transisi di dialog/render, reversible.
Tunjukkan daftar titik transisi yang akan diubah sebelum menulis kode.
```

---

## 6. QA & SAFETY PASS (jalankan terakhir)

```
Lakukan pengecekan akhir:
1. Mainkan setiap jalur via panel debug (jumpEnding 1–6) dan pastikan tidak ada
   error konsol, BGM bertumpuk, atau scene macet di langkah `call`.
2. Pastikan semua fungsi onclick baru sudah di window.*.
3. Pastikan game tetap jalan walau sebagian aset audio/gambar baru belum ada
   (placeholder/probe), tidak crash.
4. SAFETY: tinjau ulang seluruh tambahan dari kacamata "apakah ini membuat judol
   terasa menggoda/menyenangkan tanpa harga emosional?" Jika ada, perlemah sisi
   euforia atau perkuat sisi konsekuensi. Pastikan segmen rentenir membongkar
   mekanisme jeratan, BUKAN mengajari cara menjerat.
5. Update isiGame.md: catat fitur/scene/FSM/aset baru agar dokumentasi tetap
   akurat.
Beri ringkasan perubahan + daftar TODO aset yang masih perlu dibuat.
```

---

### Tips pakai di Claude Code
- Jalankan **satu bagian per giliran**, jangan tempel semua sekaligus — biar Claude Code fokus dan kamu bisa review tiap langkah.
- Selalu jalankan lewat server lokal (`python3 -m http.server 8080`) dan tes di browser setelah tiap perubahan.
- Kalau Claude Code mulai mengubah terlalu banyak, ingatkan: "aditif, reversible, satu fitur dulu".
- Simpan progres dengan `git commit` sebelum tiap bagian besar, supaya gampang mundur.
