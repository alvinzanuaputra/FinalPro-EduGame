# STOP! — Simulasi Jerat Judol

**STOP!** adalah sebuah game simulasi naratif interaktif yang dibuat sebagai media edukasi mengenai bahaya judi online (judol) dan pinjaman online (pinjol). Game ini merupakan *recreate* edukatif dari proyek "Pikabuu: STOP!".

> ⚠ **PERINGATAN KONTEN SENSITIF:**
> Game ini mengandung tema berat seperti perjudian, Kekerasan Dalam Rumah Tangga (KDRT), dan kekerasan. Dibuat murni untuk tujuan edukasi agar masyarakat lebih waspada. Bijaklah dalam bermain.

## Cerita

Berikut adalah skrip naskah dialog dari keenam *ending* (akhir cerita) yang dapat terjadi dalam permainan:

### 🌟 Ending 1: Berhenti Sebelum Mulai (Happy Ending)
*(Benny menolak ajakan Yadi bermain judol)*
**Benny**: "Yad, mending lu berhenti sekarang sebelum terlambat. Kaya cara instan itu mustahil."
**Yadi**: "Hehe iya juga ya... gua cuma iseng kok Ben."
**Benny**: "Iseng itu awal dari segalanya. Yuk malam ini kita ngopi, gua temenin lu berhenti."

> **Pesan Akhir:** Semua kisah pahit kehancuran akibat judi dimulai dari kata "iseng".

### 🌟 Ending 2: Belum Terlambat (Happy Ending)
*(Setelah uang habis, Benny menolak berutang ke Pinjol. Pak Heru menagih kontrakan dan pergi. Suasana canggung.)*
**Nadia**: "Mas... aku sebenarnya sudah lama tahu kamu main judol. Aku diam karena kamu jadi gampang marah. Dulu kamu sabar, bertanggung jawab, sayang keluarga. Berhenti ya mas, belum terlambat."
**Benny**: "...Maaf, Nad. Bukannya tambah kaya, judi malah bikin kita makin miskin. Aku janji berhenti."
**Nadia**: "Kita cari jalan keluar bareng-bareng. Pasti bisa."

> **Pesan Akhir:** Detik pertama kamu sadar judi merugikanmu — itulah kesempatan emasmu untuk menyelamatkan diri.

### 💀 Ending 3: Harga Sebuah Utang (Bad Ending)
*(Benny terjerat utang rentenir ratusan juta, dipecat, dan ditinggal kabur anak istrinya. Rentenir menyergapnya di rumah)*
**Rentenir**: "Ada satu cara terakhir buat lunasin utangmu. Ikut gua."
*(Benny dibawa ke ruang medis ilegal dan dipaksa tanda tangan persetujuan tanpa tahu isinya. Ia dibius total dan kedua ginjalnya diambil. Ginjalnya dilabeli "217". Benny adalah korban ke-217.)*
**Benny**: *(Sekarat, menulis di dinding)* "Nadia... Kayla... maafkan ayah..."

> **Pesan Akhir:** Pinjol & judol tidak menjanjikan jalan keluar. Mereka menjanjikan jurang yang lebih dalam.

### 💀 Ending 4: Akhir di Atas Rel (Bad Ending)
*(Benny melawan rentenir dengan melempar gelas lalu lari keluar rumah. Tak ada tetangga yang mau menolong. Ia tersungkur kelelahan)*
**Benny**: "Hidupku... sudah hancur total. Aku cuma mau mengakhiri semua ini."
*(Benny mencoba menelpon Nadia, namun tak diangkat. Ia mengirimkan SMS terakhir)*
**Benny**: "Maaf untuk semuanya. Aku gagal jadi suami & ayah."
*(Benny membaringkan tubuhnya di rel kereta)*

> **Pesan Akhir:** Judi tidak pernah menang. Yang kalah selalu pemainnya.

### 🥀 Ending 5: Korban yang Ditinggalkan (Epilog)
*(Merupakan epilog kelanjutan langsung dari Ending 4)*
*(Beberapa hari kemudian, Nadia & Kayla mencoba memulai hidup baru dengan berjualan gorengan. Bu Fera mengabarkan kematian Benny)*
*(Pesan SMS terakhir Benny tak pernah sampai, karena HP lama Nadia sudah terpaksa dijual untuk modal usaha)*
*(Karena utang Benny belum lunas sepenuhnya, Nadia dan Kayla kini terancam menjadi target pelunasan rentenir)*

> **Pesan Akhir:** Korban pertama judi bukan penjudinya — tapi keluarga yang ia tinggalkan.

### 🔪 Ending 6: Tangan yang Terpaksa (Bad Ending)
*(Benny kehabisan harta dan berniat mendapatkan modal dengan menjual istrinya pada pria hidung belang)*
**Benny**: "Nad, sebentar lagi ada pria datang. Tugas kamu... layani dia."
**Nadia**: "A-apa maksud kamu?! Kamu... menjualku?!"
*(Pria lain datang dan mencari putri mereka, Kayla. Mengetahui hal itu, kemarahan Nadia meledak. Ia menikam Benny hingga tewas dengan pisau dapur, mendobrak kamar Kayla, dan mengusir pria hidung belang itu)*
**Pria Hidung Belang**: "S-saya belum apa-apakan anak itu! Ampun!"
*(Nadia memeluk erat Kayla yang menangis ketakutan. Layar meredup berganti menjadi kilas balik ke hari-hari bahagia sebelum Benny kecanduan judol)*
**Benny (Kilas Balik)**: "Pinter anak ayah. Ayo kita belajar lagi ya, nak."
**Nadia (Kilas Balik)**: "Makan dulu yuk semuanya, sudah ibu siapkan."

> **Pesan Akhir:** Yang hancur bukan cuma rekening, tapi seluruh kemanusiaan. Adiksi judol bisa menyerang siapa saja—bahkan keluarga yang paling bahagia.

## Konsep Folder & Struktur Proyek

Proyek ini dibangun menggunakan HTML, CSS murni, dan Vanilla JavaScript (Modular/ES6). Berikut adalah penjelasan struktur foldernya:

- **`index.html`**
  File utama yang menampung kerangka antarmuka pengguna (UI), elemen game seperti HUD (Tabungan, Hari, Kecanduan), elemen layar dialog interaktif, layar *smartphone* (HP overlay), hingga panel *debug FSM* dan layar judul.

- **`css/`**
  Direktori untuk gaya visual.
  - `style.css`: Menangani seluruh tampilan antarmuka (styling), layout grid/flexbox, tipografi, serta animasi transisi layar. Memastikan game nyaman dimainkan tanpa adanya perubahan langsung pada elemen dari dalam file HTML.

- **`js/`**
  Direktori untuk logika permainan. Menggunakan pola arsitektur *ES Modules* sehingga skrip terpecah sesuai dengan tanggung jawab (*Separation of Concerns*):
  - `main.js`: *Entry point* yang menghubungkan semua modul secara berurutan dan menginisiasi berjalannya game.
  - `fsm.js`: Mengatur *Finite State Machine (FSM)*. Modul ini melacak seluruh *state* game, meliputi parameter: Hari, Saldo, tingkat Kecanduan, status utang Pinjol, tingkat keharmonisan Keluarga, dan total Utang (sistem kalkulasi skor).
  - `render.js`: Berperan me-render data dari FSM ke DOM/layar (HUD). Selain itu, mengatur transisi penggantian *background* (latar tempat) dan *sprite* gambar karakter yang muncul.
  - `scenes.js` & `dialog.js`: Jantung dari naratif game. `scenes.js` menyimpan data seluruh struktur adegan cerita, alur naskah, dan percabangan (*branching paths*). Sedangkan `dialog.js` mengeksekusi mesin teks untuk menampilkan percakapan baris demi baris, lengkap dengan tombol pilihan.
  - `endings.js`: Mengelola dan mendefinisikan ragam konklusi atau layar akhir (mencakup 6 ending berbeda) berdasarkan rute pilihan pemain.
  - `phone.js`: Menangani logika khusus untuk "Overlay Smartphone", contohnya simulasi percakapan via *chat*, simulasi bermain judol di layar, atau proses pendaftaran aplikasi pinjol fiktif.
  - `tools.js`: Kumpulan *helper* atau utilitas yang mendukung jalannya sistem, termasuk panel debug rahasia untuk memudahkan developer melewati adegan demi keperluan *testing*.
