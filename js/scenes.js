/* =================================================================
   BAGIAN 5 — NASKAH / SCENES (dialog lengkap 6 ending)
   Karakter: Saya(Benny), Nadia(istri), Kayla(anak), Yadi(teman),
             Pak Heru(kontrakan), Rentenir, Bu Fera(tetangga)

   Catatan refactor: SELURUH naskah/dialog dipindah apa adanya.
   Tidak ada teks, urutan, maupun logika yang diubah.
   ================================================================= */

import { FSM, setSaldo, tambahUtang, setPJ, setKL, setHari } from './fsm.js';
import { render } from './render.js';
import { play, cont } from './dialog.js';
import { phoneJudol, phoneRegisterPinjol, phoneChatYadi } from './phone.js';

export const SCENES={

/* ---------- PROLOG ---------- */
prolog:[
 {t:'say',who:'',text:'— HARI KE-0 —',bg:'latar_ruang_tamu.png',char:''},
 {t:'fx',run:()=>{setHari(0);setSaldo(3000000);}},
 {t:'say',who:'',text:'Benny bersantai menonton bola sambil merokok. Hidup keluarganya tenang dan harmonis.',char:'benny_neutral.png'},
 {t:'say',who:'Nadia',text:'Mas, ini pisang gorengnya 😊',char:'nadia_happy.png, benny_neutral.png'},
 {t:'say',who:'Saya (Benny)',text:'Wah, istriku makin cantik aja kalau bikin pisang goreng.',char:'benny_happy.png, nadia_happy.png'},
 {t:'say',who:'Nadia',text:'Ih, gombal. Mas, minta uang belanja dong buat ke pasar.',char:'nadia_happy.png, benny_happy.png'},
 {t:'choice',q:'Berapa uang belanja untuk Nadia?',opts:[
   {label:'Rp 50.000',go:()=>{setSaldo(FSM.SL.uang-50000);cont(['Nadia','Makasih mas, aku ke pasar dulu ya 🥰'],'prologKayla')}},
   {label:'Rp 40.000',go:()=>{setSaldo(FSM.SL.uang-40000);cont(['Nadia','Yaudah cukup kok, makasih ya mas.'],'prologKayla')}},
   {label:'Rp 30.000',go:()=>{setSaldo(FSM.SL.uang-30000);cont(['Nadia','Hmm pas-pasan ya, tapi gapapa deh.'],'prologKayla')}},
 ]},
],
prologKayla:[
 {t:'say',who:'',text:'Nadia pamit ke pasar. Tak lama, Kayla datang berpamitan sekolah.',char:'benny_neutral.png'},
 {t:'say',who:'Kayla',text:'Ayah, Kayla berangkat sekolah ya. Minta uang jajan dong.',char:'kayla_smp.png, benny_neutral.png'},
 {t:'say',who:'Saya (Benny)',text:'Ini nak. Ayah antar pakai motor, yuk?',char:'benny_happy.png, kayla_smp.png'},
 {t:'say',who:'Kayla',text:'Gak usah yah, Kayla jalan kaki aja biar gak ngerepotin. Dadah ayah! 👋',char:'kayla_smp.png, benny_happy.png'},
 {t:'say',who:'',text:'Di TV, berita lonjakan harga kebutuhan pokok. Benny kesal — gajinya tak pernah naik.',char:'benny_sad.png'},
 {t:'fx',run:()=>{phoneChatYadi(()=>play('prologYadi'));}},
],
prologYadi:[
 {t:'say',who:'',text:'Pesan dari Yadi, teman yang sering pinjam uang. Kali ini ia mengaku menang jackpot judi online dan ingin mengajak Benny ikut.',char:'benny_neutral.png'},
 {t:'say',who:'Yadi',text:'Gampang kok Ben, sekali main bisa langsung cuan. Mau ikut ga?',char:'yadi.png, benny_neutral.png'},
 {t:'choice',q:'Benny harus memutuskan. Ikut bermain judi online?',opts:[
   {label:'TOLAK — "Gak, itu bahaya. Berhenti deh Yad."',go:()=>play('ending1')},
   {label:'TERIMA — "Hmm... iseng-iseng dikit gapapa kali ya."',go:()=>play('terima')},
 ]},
],

/* ---------- ENDING 1 (TOLAK) ---------- */
ending1:[
 {t:'say',who:'Saya (Benny)',text:'Yad, mending lu berhenti sekarang sebelum terlambat. Kaya cara instan itu mustahil.',char:'benny_neutral.png, yadi.png'},
 {t:'say',who:'Yadi',text:'Hehe iya juga ya... gua cuma iseng kok Ben.',char:'yadi.png, benny_neutral.png'},
 {t:'say',who:'Saya (Benny)',text:'Iseng itu awal dari segalanya. Yuk malam ini kita ngopi, gua temenin lu berhenti.',char:'benny_happy.png, yadi.png'},
 {t:'ending',n:1},
],

/* ---------- CABANG TERIMA: spiral judol ---------- */
terima:[
 {t:'say',who:'',text:'Benny mendaftar di situs judol. Top-up kecil dulu...',char:'benny_neutral.png'},
 {t:'fx',run:()=>{setSaldo(2940000);}},
 {t:'say',who:'Saya (Benny)',text:'Lho, menang? Gampang banget ternyata. Naikin taruhan ah.',char:'benny_happy.png'},
 {t:'fx',run:()=>{phoneJudol(()=>play('terima2'));}},
],
terima2:[
 {t:'say',who:'',text:'Menang-kalah silih berganti. Tanpa sadar, level kecanduan Benny terus naik. Hari demi hari habis untuk judol.',char:'benny_sad.png'},
 {t:'fx',run:()=>{setHari(6);setSaldo(1000000);if(FSM.KC.s<2)FSM.KC.s=2;render();}},
 {t:'say',who:'',text:'— HARI KE-6 — Tabungan tinggal Rp 1.000.000.',bg:'latar_ruang_tamu.png',char:'benny_sad.png'},
 {t:'say',who:'Nadia',text:'Mas, jangan lupa bayar kontrakan ya, 1,2 juta. Sudah mau jatuh tempo.',char:'nadia_neutral.png, benny_sad.png'},
 {t:'say',who:'Saya (Benny)',text:'(Mati aku... uangnya gak cukup.) I-iya nanti aku bayar.',char:'benny_sad.png, nadia_neutral.png'},
 {t:'say',who:'Nadia',text:'Ini uang belanjanya dikurangin ya mas? Yawes deh...',char:'nadia_sad.png, benny_sad.png'},
 {t:'say',who:'',text:'Benny kesal memikirkan uang. Daripada pusing, ia memilih main judol lagi — yakin kali ini jackpot.',char:'benny_angry.png'},
 {t:'fx',run:()=>{phoneJudol(()=>play('terima3'));}},
],
terima3:[
 {t:'fx',run:()=>{setHari(10);setSaldo(460000);if(FSM.KC.s<3)FSM.KC.s=3;render();}},
 {t:'say',who:'',text:'— HARI KE-10 — Tabungan tinggal Rp 460.000.',char:'benny_sad.png'},
 {t:'say',who:'',text:'Notifikasi bank: gaji masuk Rp 4.000.000. Benny langsung berniat menjadikannya modal judol.',char:'benny_happy.png'},
 {t:'fx',run:()=>{setSaldo(4460000);}},
 {t:'say',who:'Kayla',text:'Ayah, minta uang jajan sama uang kelas renang ya, Rp 50.000.',char:'kayla_smp.png, benny_neutral.png'},
 {t:'say',who:'Saya (Benny)',text:'Ngapain sih kamu berenang-renang? Jangan suka buang-buang uang ah!',char:'benny_angry.png, kayla_smp.png'},
 {t:'say',who:'Kayla',text:'Tapi yah, renang itu masuk nilai olahraga...',char:'kayla_smp.png, benny_angry.png'},
 {t:'say',who:'Saya (Benny)',text:'Bawel! Sudah sana belajar.',char:'benny_angry.png, kayla_smp.png'},
 {t:'fx',run:()=>{setKL(1);}}, // keluarga: curiga/retak
 {t:'say',who:'',text:'Kayla pergi tanpa pamit. Tak lama Nadia menagih soal kontrakan — dan tahu Benny berbohong belum membayar.',char:'nadia_angry.png, benny_sad.png'},
 {t:'say',who:'Nadia',text:'Mas bohong? Pak Heru bilang belum dibayar sama sekali!',char:'nadia_angry.png, benny_sad.png'},
 {t:'say',who:'Saya (Benny)',text:'Berisik! Bawel banget sih jadi orang.',char:'benny_angry.png, nadia_sad.png'},
 {t:'fx',run:()=>{setHari(17);setSaldo(35000);FSM.KC.s=4;render();}},
 {t:'say',who:'',text:'— HARI KE-17 — Dari 4,2 juta kini tinggal Rp 35.000. Belum tengah bulan.',char:'benny_sad.png'},
 {t:'say',who:'Saya (Benny)',text:'Gila, sisa 35 ribu doang. Gimana ini... pinjam Yadi aja deh.',char:'benny_sad.png'},
 {t:'say',who:'Yadi',text:'Waduh Ben, gua juga lagi bokek, baru kalah banyak. Tapi... lu pinjol aja gimana? Cair instan!',char:'yadi.png, benny_sad.png'},
 {t:'choice',q:'Yadi menyarankan pinjol. Benny mengikuti?',opts:[
   {label:'TOLAK pinjol — coba bertahan',go:()=>play('jalurSadar')},
   {label:'TERIMA pinjol — "Cair instan? Boleh juga."',go:()=>play('jalurPinjol')},
 ]},
],

/* ---------- ENDING 2 (tolak pinjol, lalu sadar) ---------- */
jalurSadar:[
 {t:'say',who:'',text:'Benny menolak pinjol, tapi tetap nekat main judol dengan taruhan kecil. Lalu pintu diketuk...',char:'benny_sad.png'},
 {t:'say',who:'Pak Heru',text:'Pak Benny, kontrakan sudah telat hampir 10 hari. Kalau hari ini tak bayar, terpaksa pindah.',char:'pakheru.png, benny_sad.png'},
 {t:'say',who:'',text:'Pak Heru pergi. Suasana rumah canggung. Nadia akhirnya bicara.',char:'benny_sad.png, nadia_sad.png'},
 {t:'say',who:'Nadia',text:'Mas... aku sebenarnya sudah lama tahu kamu main judol. Aku diam karena kamu jadi gampang marah.',char:'nadia_sad.png, benny_sad.png'},
 {t:'say',who:'Nadia',text:'Dulu kamu sabar, bertanggung jawab, sayang keluarga. Berhenti ya mas, belum terlambat.',char:'nadia_neutral.png, benny_sad.png'},
 {t:'say',who:'Saya (Benny)',text:'...Maaf, Nad. Bukannya tambah kaya, judi malah bikin kita makin miskin. Aku janji berhenti.',char:'benny_sad.png, nadia_neutral.png'},
 {t:'say',who:'Nadia',text:'Kita cari jalan keluar bareng-bareng. Pasti bisa.',char:'nadia_happy.png, benny_happy.png'},
 {t:'ending',n:2},
],

/* ---------- JALUR PINJOL (menuju ending 3/4/6) ---------- */
jalurPinjol:[
 {t:'say',who:'Yadi',text:'Nih link-nya, namanya "Bangke". Gampang, tinggal foto KTP sama selfie.',char:'yadi.png, benny_happy.png'},
 {t:'fx',run:()=>{phoneRegisterPinjol('Bangke — Pinjol','pinjol',()=>play('jalurPinjol2'));}},
],
jalurPinjol2:[
 {t:'fx',run:()=>{setPJ(1);setSaldo(FSM.SL.uang+2000000);tambahUtang(2600000);}},
 {t:'say',who:'',text:'Uang cair! Tapi terpotong biaya admin, dan utang membengkak karena bunga. Benny tak peduli — uang itu langsung dipakai judol.',char:'benny_happy.png'},
 {t:'say',who:'Saya (Benny)',text:'Pinjam uang semudah ini? Berarti gua bisa pinjam sepuasnya dong!',char:'benny_happy.png'},
 {t:'fx',run:()=>{phoneJudol(()=>play('jalurPinjol3'));}},
],
jalurPinjol3:[
 {t:'say',who:'Pak Heru',text:'Pak Benny, kontrakannya?',char:'pakheru.png, benny_neutral.png'},
 {t:'say',who:'Saya (Benny)',text:'Oh ini Pak, saya bayar sekarang.',char:'benny_happy.png, pakheru.png'},
 {t:'fx',run:()=>{setSaldo(Math.max(0,FSM.SL.uang-1200000));}},
 {t:'say',who:'Nadia',text:'Mas, kok bisa sampai telat bayar kontrakan? Uang kita ke mana?',char:'nadia_angry.png, benny_sad.png'},
 {t:'say',who:'Saya (Benny)',text:'BERISIK! Urusan laki-laki jangan ikut campur!',char:'benny_angry.png, nadia_sad.png'},
 {t:'fx',run:()=>{setKL(2);setHari(20);setSaldo(250000);}},
 {t:'say',who:'',text:'— HARI KE-20 — Tabungan tinggal Rp 250.000. Kalah terus.',char:'benny_sad.png'},
 {t:'say',who:'Saya (Benny)',text:'Nyesel gua... bukan nyesel main judi. Nyesel kenapa tadi bayar kontrakan!',char:'benny_angry.png'},
 {t:'say',who:'',text:'Benny coba pinjam lagi di Bangke — ditolak karena belum lunas. "Mati satu tumbuh seribu," pikirnya, lalu mendaftar pinjol lain.',char:'benny_sad.png'},
 {t:'fx',run:()=>{phoneRegisterPinjol('Bank Miskin — Pinjol','pinjol',()=>play('jalurPinjol4'));}},
],
jalurPinjol4:[
 {t:'fx',run:()=>{setPJ(2);tambahUtang(5000000);setSaldo(FSM.SL.uang+3000000);}},
 {t:'fx',run:()=>{setHari(23);}},
 {t:'say',who:'',text:'— HARI KE-23 — Telepon dari "Melarat Finance": cicilan motor menunggak, denda Rp 670.000.',char:'benny_sad.png'},
 {t:'say',who:'Saya (Benny)',text:'Nanti-nanti aja. Mau main dulu.',char:'benny_neutral.png'},
 {t:'say',who:'Kayla',text:'Ayah, ini pisang goreng. Kayla mau nonton TV ya...',char:'kayla_rumah_revisi.png, benny_neutral.png'},
 {t:'say',who:'Saya (Benny)',text:'Hari gini nonton TV?! Sana belajar!',char:'benny_angry.png, kayla_rumah_revisi.png'},
 {t:'say',who:'Kayla',text:'Tapi yah ini hari Minggu...',char:'kayla_rumah_revisi.png, benny_angry.png'},
 {t:'say',who:'Saya (Benny)',text:'PERGI SANA!',char:'benny_angry.png, kayla_rumah_revisi.png'},
 {t:'fx',run:()=>{setHari(30);setKL(2);}},
 {t:'say',who:'',text:'— HARI KE-30 — Saldo nyaris habis lagi. Nadia sedang keluar. Pikiran jahat muncul: uang simpanan istri.',char:'benny_neutral.png'},
 {t:'say',who:'Saya (Benny)',text:'(Ketemu... cuma Rp 133.000? Yah, Nadia emang bukan orang kaya.)',char:'benny_happy.png'},
 {t:'fx',run:()=>{setSaldo(FSM.SL.uang+133000);}},
 {t:'say',who:'Kayla',text:'Ayah, minta uang jajan...',char:'kayla_smp.png, benny_neutral.png'},
 {t:'say',who:'Saya (Benny)',text:'Gak ada uang!',char:'benny_angry.png, kayla_smp.png'},
 {t:'say',who:'Kayla',text:'Bohong! Kayla lihat ayah pegang uang tadi!',char:'kayla_smp.png, benny_angry.png'},
 {t:'say',who:'Saya (Benny)',text:'Itu buat bayar sekolah! Bawel banget sih kamu!',char:'benny_angry.png, kayla_smp.png'},
 {t:'say',who:'',text:'Kayla menangis. Saat Nadia pulang dan menanyakan uang simpanannya yang hilang, Benny menyangkal — lalu tersudut.',char:'nadia_angry.png, benny_sad.png'},
 {t:'say',who:'Nadia',text:'Itu dana darurat kita mas! Kenapa kamu ambil?!',char:'nadia_angry.png, benny_sad.png'},
 {t:'say',who:'Saya (Benny)',text:'HORMATI suamimu! (PLAK!)',char:'benny_angry.png, nadia_sad.png'},
 {t:'fx',run:()=>{setKL(3);}}, // KDRT
 {t:'say',who:'',text:'Benny menampar Nadia. Sejak hari itu, kekerasan semakin sering terjadi.',char:'benny_angry.png, nadia_sad.png'},
 {t:'fx',run:()=>{setHari(103);setPJ(3);}},
 {t:'say',who:'',text:'— HARI KE-103 — Wajah Nadia babak belur. Sambil menangis, ia bertanya pada dirinya sendiri...',char:'nadia_sad.png'},
 {t:'choice',q:'Nadia harus memutuskan: bertahan atau kabur?',opts:[
   {label:'KABUR — pergi bersama Kayla',go:()=>play('jalurKabur')},
   {label:'BERTAHAN — tetap tinggal',go:()=>play('jalurBertahan')},
 ]},
],

/* ---------- JALUR KABUR -> klimaks rentenir (ending 3/4) ---------- */
jalurKabur:[
 {t:'fx',run:()=>{setKL(4);}}, // Nadia kabur
 {t:'say',who:'',text:'Nadia mengemas koper dan pergi bersama Kayla, meminjam ongkos dari tetangga, Bu Fera.',char:'nadia_sad.png'},
 {t:'fx',run:()=>{setHari(113);tambahUtang(115000000);setSaldo(0);}},
 {t:'say',who:'',text:'Malam hari, Benny pulang ke rumah gelap. Utang sudah Rp 127 juta. Nadia & Kayla hilang. Dapur kosong.',bg:'latar_rumah_gelap.png',char:'benny_sad.png'},
 {t:'say',who:'Rentenir',text:'(TELEPON) Bayar utangmu SEKARANG! Gua tahu di mana keluargamu, jangan macam-macam!',char:'rentenir.png, benny_sad.png'},
 {t:'say',who:'Saya (Benny)',text:'I-iya pak, maaf... besok saya lunasi.',char:'benny_sad.png'},
 {t:'fx',run:()=>{setHari(114);setSaldo(2000);}},
 {t:'say',who:'',text:'— HARI KE-114 — Perabotan dijual semua. Sisa Rp 2.000. Benny dipecat seminggu lalu karena ketahuan mencuri. KTP-nya sudah di-blacklist.',char:'benny_sad.png'},
 {t:'say',who:'',text:'Ia coba tarik saldo judol Rp 1 juta — tapi error. Situs tiba-tiba hilang. Benny menangis. Air galon habis, keran mati; ia terpaksa minum dari air toilet.',char:'benny_sad.png'},
 {t:'say',who:'',text:'Keluar dari toilet, Benny menyadari sang rentenir sudah ada di dalam rumahnya.',char:'benny_sad.png, rentenir.png'},
 {t:'say',who:'Rentenir',text:'Mau lari ke mana lagi? Utangmu segunung. Pilih: kita nego, atau lu kabur?',char:'rentenir.png, benny_sad.png'},
 {t:'choice',q:'Benny menghadapi rentenir:',opts:[
   {label:'NEGOSIASI — ikuti maunya rentenir',go:()=>play('ending3')},
   {label:'KABUR — lempar gelas & lari',go:()=>play('ending4')},
 ]},
],

/* ---------- ENDING 3 (jual ginjal) ---------- */
ending3:[
 {t:'say',who:'Rentenir',text:'Ada satu cara terakhir buat lunasin utangmu. Ikut gua.',char:'rentenir.png, benny_sad.png'},
 {t:'say',who:'',text:'Benny dibawa ke ruangan kecil berisi box peralatan medis. Diberi dokumen, disuruh tanda tangan tanpa tahu isinya.',bg:'latar_ruang_medis.png',char:'benny_sad.png'},
 {t:'say',who:'',text:'Setelah tanda tangan, ia memakai kostum pasien. Tubuhnya dibius total. Kedua ginjalnya diambil dokter ilegal — karena Benny sendiri telah menandatangani persetujuannya.',char:'benny_sad.png'},
 {t:'say',who:'',text:'Kedua ginjal disimpan di kotak es bertuliskan "217". Benny adalah korban ke-217.',char:'benny_sad.png'},
 {t:'fx',run:()=>{setHari(119);tambahUtang(135000000-FSM.PJ.utang);}},
 {t:'say',who:'',text:'— HARI KE-119 — Benny sekarat, kesakitan tanpa henti di perutnya. Utang tak terhapus penuh: masih sisa Rp 135 juta.',char:'benny_sad.png'},
 {t:'say',who:'Saya (Benny)',text:'(Menulis di dinding) Nadia... Kayla... maafkan ayah...',char:'benny_sad.png'},
 {t:'ending',n:3},
],

/* ---------- ENDING 4 (lari -> akhir tragis) ---------- */
ending4:[
 {t:'say',who:'',text:'Benny melempar gelas tepat ke kepala rentenir, lalu berlari keluar rumah.',char:'benny_angry.png'},
 {t:'say',who:'',text:'Para tetangga melihat — sempat ingin menolong, tapi mengurungkan niat. Mereka tahu reputasi Benny: tukang pukul istri.',bg:'latar_gang.png',char:'benny_sad.png'},
 {t:'say',who:'',text:'Rentenir tersandung dan jatuh. Benny lolos, berlari jauh hingga akhirnya tersungkur kelelahan.',char:'benny_sad.png'},
 {t:'say',who:'Saya (Benny)',text:'Hidupku... sudah hancur total. Aku cuma mau mengakhiri semua ini.',char:'benny_sad.png'},
 {t:'choice',q:'Benny mengeluarkan ponsel...',opts:[
   {label:'Telepon Nadia',go:()=>cont(['Saya (Benny)','(Tak diangkat...) Maafkan aku, Nad...'],'ending4final')},
   {label:'Kirim pesan ke Nadia',go:()=>cont(['Saya (Benny)','(Mengetik) Maaf untuk semuanya. Aku gagal jadi suami & ayah.'],'ending4final')},
 ]},
],
ending4final:[
 {t:'say',who:'',text:'Pada akhirnya, Benny membaringkan tubuhnya di rel kereta — mengakhiri hidupnya yang terasa tak berarti.',bg:'railway.png',char:''},
 {t:'ending',n:4},
],

/* ---------- JALUR BERTAHAN -> ending 6 ---------- */
jalurBertahan:[
 {t:'fx',run:()=>{setKL(5);}}, // Nadia bertahan
 {t:'say',who:'',text:'Meski menyakitkan, Nadia memilih bertahan demi keluarga.',char:'nadia_sad.png'},
 {t:'fx',run:()=>{setHari(118);}},
 {t:'say',who:'',text:'— HARI KE-118 — Benny pulang berantakan, baru dipecat karena ketahuan mencuri. Tak ada makanan di dapur.',bg:'latar_rumah_gelap.png',char:'benny_sad.png'},
 {t:'say',who:'Saya (Benny)',text:'KENAPA GAK ADA MAKANAN?! (memukul Nadia berulang kali)',char:'benny_angry.png, nadia_sad.png'},
 {t:'fx',run:()=>{setHari(132);}},
 {t:'say',who:'',text:'— HARI KE-132 — TV sudah dijual, uangnya habis lagi untuk judol. Benny memikirkan cara dapat modal... lalu mendapat "ide".',char:'benny_sad.png'},
 {t:'fx',run:()=>{setHari(134);}},
 {t:'say',who:'Saya (Benny)',text:'Nad, sebentar lagi ada pria datang. Tugas kamu... layani dia.',char:'benny_neutral.png, nadia_sad.png'},
 {t:'say',who:'Nadia',text:'A-apa maksud kamu?! Kamu... menjualku?!',char:'nadia_angry.png, benny_neutral.png'},
 {t:'say',who:'',text:'Inilah titik terendah Benny — tega menjual istrinya demi modal judol. Nadia hancur, menangis sejadi-jadinya di kamar.',char:'nadia_sad.png, benny_neutral.png'},
 {t:'say',who:'',text:'Lalu datang pria kedua — mencari Kayla. Mengetahui Benny juga menjual putrinya, kemarahan Nadia berubah jadi tekad.',char:'nadia_angry.png'},
 {t:'say',who:'Nadia',text:'AKU HARUS SELAMATKAN KAYLA!',char:'nadia_angry.png'},
 {t:'say',who:'',text:'Benny menghalangi, mendorongnya tiap kali Nadia melawan. Tak ada pilihan lain — Nadia meraih pisau dapur.',char:'nadia_angry.png, benny_angry.png'},
 {t:'say',who:'',text:'Nadia menikam Benny hingga tewas. Dengan pisau berlumur darah, ia mendobrak pintu kamar Kayla.',char:'nadia_angry.png'},
 {t:'say',who:'Pria',text:'(ketakutan) S-saya belum apa-apakan anak itu! Ampun!',char:'rentenir.png, nadia_angry.png'},
 {t:'choice',q:'Nadia dengan pisau di tangan:',opts:[
   {label:'Usir pria itu',go:()=>cont(['','Pria itu lari terbirit-birit ketakutan.'],'ending6flashback')},
   {label:'Habisi pria itu',go:()=>cont(['','Nadia menikamnya di tempat.'],'ending6flashback')},
 ]},
],
ending6flashback:[
 {t:'say',who:'',text:'Nadia memeluk Kayla yang menangis keras.',char:'nadia_sad.png, kayla_rumah_revisi.png'},
 {t:'say',who:'',text:'— HARI KE −1 — Sehari sebelum Benny kecanduan judol.',bg:'latar_ruang_tamu.png',char:'benny_happy.png, nadia_happy.png'},
 {t:'say',who:'Saya (Benny)',text:'Pinter anak ayah. Ayo kita belajar lagi ya, nak.',char:'benny_happy.png, kayla_rumah_revisi.png'},
 {t:'say',who:'Nadia',text:'Makan dulu yuk semuanya, sudah ibu siapkan 😊',char:'nadia_happy.png, benny_happy.png'},
 {t:'say',who:'',text:'Dulu Benny adalah ayah & suami yang sangat penyayang. Mereka tertawa bersama. Adiksi judol bisa menyerang siapa saja — bahkan keluarga yang paling bahagia.',char:'benny_happy.png, nadia_happy.png, kayla_rumah_revisi.png'},
 {t:'ending',n:6},
],
};
