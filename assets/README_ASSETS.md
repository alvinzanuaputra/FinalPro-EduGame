# Daftar Aset Gambar — STOP! Simulasi Jerat Judol

Taruh file gambar di folder yang sesuai. Nama file **harus persis** seperti di tabel
(itulah nama yang dipakai engine). Selama file belum ada, game tetap jalan dan
menampilkan label `[ ALT: namafile ]` sebagai placeholder (fallback `onerror`
di `js/render.js`).

Path dimuat otomatis berdasarkan kategori:

| Kategori   | Folder                          |
|------------|---------------------------------|
| background | `assets/images/backgrounds/`    |
| character  | `assets/images/characters/`     |
| phone      | `assets/images/phone/`          |

---

## Backgrounds (`assets/images/backgrounds/`)

Rekomendasi ukuran: **1600×900 px** (rasio 16:9), JPG. Slot memakai `background-size: cover`.

| Nama file              | Dipakai di scene                                                       | Ukuran rekomendasi |
|------------------------|------------------------------------------------------------------------|--------------------|
| `latar_ruang_tamu.jpg` | Prolog (Hari ke-0), `terima2` (Hari ke-6), `ending6flashback` (Hari −1) | 1600×900 JPG       |
| `latar_rumah_gelap.jpg`| `jalurKabur` (rumah gelap), `jalurBertahan`, klimaks Nadia              | 1600×900 JPG       |
| `latar_ruang_medis.jpg`| `ending3` (ruang operasi ilegal / jual ginjal)                         | 1600×900 JPG       |
| `latar_gang.jpg`       | `ending4` (Benny kabur di gang, tetangga menonton)                      | 1600×900 JPG       |

## Characters (`assets/images/characters/`)

Rekomendasi: **PNG transparan**, tinggi ±800 px (badan/setengah badan), latar transparan.
Slot memakai `background-size: contain`, menempel di bawah-tengah panggung.

| Nama file           | Karakter / ekspresi          | Dipakai di scene (contoh)                                     | Ukuran rekomendasi      |
|---------------------|------------------------------|---------------------------------------------------------------|-------------------------|
| `nadia_senyum.png`  | Nadia — tersenyum            | Prolog, akhir `jalurSadar` (ending 2)                         | PNG transparan, ~800px  |
| `nadia_netral.png`  | Nadia — netral               | `terima2`, `jalurPinjol3`                                     | PNG transparan, ~800px  |
| `nadia_sedih.png`   | Nadia — sedih/menangis       | `terima3`, `jalurSadar`, `jalurPinjol4`, `jalurBertahan`      | PNG transparan, ~800px  |
| `kayla_seragam.png` | Kayla — seragam sekolah      | `prologKayla`, `terima3`                                      | PNG transparan, ~800px  |
| `kayla_rumah.png`   | Kayla — baju rumah           | `jalurPinjol4`                                                | PNG transparan, ~800px  |
| `yadi.png`          | Yadi (teman)                 | `prologYadi`, `ending1`, `terima3`, `jalurPinjol`             | PNG transparan, ~800px  |
| `pakheru.png`       | Pak Heru (pemilik kontrakan) | `jalurSadar`, `jalurPinjol3`                                  | PNG transparan, ~800px  |
| `rentenir.png`      | Rentenir                     | `jalurKabur`, `ending3`                                       | PNG transparan, ~800px  |
| `benny_baik.png`    | Benny — versi penyayang      | `ending6flashback` (Hari −1)                                  | PNG transparan, ~800px  |

## Phone (`assets/images/phone/`)

Dipakai pada layar registrasi pinjol (simulasi HP) di `js/phone.js`.
Saat ini tampil sebagai slot bertanda `[ ALT: ... ]` di dalam form pinjol.

| Nama file               | Dipakai di                                   | Ukuran rekomendasi        |
|-------------------------|----------------------------------------------|---------------------------|
| `foto_ktp_benny.png`    | Form registrasi pinjol — slot "Foto KTP"     | ~600×380 PNG (rasio KTP)  |
| `selfie_ktp_benny.png`  | Form registrasi pinjol — slot "Selfie + KTP" | ~600×600 PNG              |

---

### Catatan
- Tidak wajib mengisi semua gambar sekaligus — isi bertahap, label placeholder otomatis hilang
  begitu file dengan nama yang benar tersedia.
- Jangan mengganti nama file; engine mencarinya berdasarkan nama persis di tabel ini.
