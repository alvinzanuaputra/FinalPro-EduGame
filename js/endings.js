/* =================================================================
   BAGIAN 6 — DATA ENDING
   ENDINGS, TIPS, dan showEnding(). Dipindah apa adanya.
   ================================================================= */

import { $ } from './render.js';

export const ENDINGS={
 1:{type:'happy',badge:'ENDING 1 / 6 — HAPPY',title:'Berhenti Sebelum Mulai',
    msg:'Benny menolak ajakan Yadi dan justru menyelamatkan temannya.<br><br><em>Semua kisah pahit kehancuran akibat judi dimulai dari kata "iseng".</em>'},
 2:{type:'happy',badge:'ENDING 2 / 6 — HAPPY',title:'Belum Terlambat',
    msg:'Benny kehilangan banyak uang, tapi menyadari kesalahannya dan berhenti bersama dukungan Nadia.<br><br><em>Detik pertama kamu sadar judi merugikanmu — itulah kesempatan emasmu untuk menyelamatkan diri.</em>',
    tips:true},
 3:{type:'bad',badge:'ENDING 3 / 6 — BAD',title:'Harga Sebuah Utang',
    msg:'Demi melunasi utang, Benny menyerahkan kedua ginjalnya pada sindikat ilegal — korban ke-217. Ia mati perlahan dalam penyesalan, utang pun tak lunas.<br><br><em>Pinjol & judol tidak menjanjikan jalan keluar. Mereka menjanjikan jurang yang lebih dalam.</em>'},
 4:{type:'bad',badge:'ENDING 4 / 6 — BAD',title:'Akhir di Atas Rel',
    msg:'Benny lolos dari rentenir, tapi kehilangan segalanya — keluarga, pekerjaan, harga diri. Ia mengakhiri hidupnya sendiri.<br><br><em>Judi tidak pernah menang. Yang kalah selalu pemainnya.</em>'},
 5:{type:'epilog',badge:'ENDING 5 / 6 — EPILOG',title:'Korban yang Ditinggalkan',
    msg:'Beberapa hari kemudian, Nadia & Kayla memulai hidup baru berjualan gorengan. Bu Fera mengabarkan kematian Benny. Pesan terakhir Benny tak pernah sampai — HP lama Nadia sudah dijual untuk modal usaha.<br><br>Karena utang Benny belum lunas, mereka pun terancam jadi target rentenir.<br><br><em>Korban pertama judi bukan penjudinya — tapi keluarga yang ia tinggalkan.</em>'},
 6:{type:'bad',badge:'ENDING 6 / 6 — BAD',title:'Tangan yang Terpaksa',
    msg:'Benny tega menjual istri dan anaknya demi modal judol. Nadia terpaksa membela diri dan keluarganya dengan caranya sendiri.<br><br>Kilas balik menunjukkan Benny dulu ayah penyayang — bukti bahwa adiksi judi bisa menghancurkan keluarga mana pun.<br><br><em>Yang hancur bukan cuma rekening, tapi seluruh kemanusiaan.</em>'},
};
export const TIPS=`<b>Tips berhenti judi online:</b><br>
1. Akui bahwa kamu kalah — house selalu menang.<br>
2. Hapus aplikasi & blokir situs/rekening judol.<br>
3. Cerita ke orang terdekat, jangan dipendam.<br>
4. Cari bantuan profesional / hubungi hotline kesehatan jiwa.<br>
5. Ganti kebiasaan dengan aktivitas produktif.`;

export function showEnding(n){
  const e=ENDINGS[n];
  const old=document.querySelector('.ending-screen'); if(old) old.remove();
  const div=document.createElement('div');
  div.className='fullscreen ending-screen';
  div.innerHTML=`
    <div class="ending-badge ${e.type}">${e.badge}</div>
    <div class="ending-title">${e.title}</div>
    <div class="ending-msg">${e.msg}</div>
    ${e.tips?`<div class="tips">${TIPS}</div>`:''}
    <button id="next-end-btn"></button>`;
  $('stage').appendChild(div);
  const btn=div.querySelector('#next-end-btn');
  if(n===4){ // ending 4 otomatis lanjut ke ending 5
    btn.textContent='LANJUT →';
    btn.onclick=()=>{div.remove();showEnding(5);};
  }else{
    btn.textContent='MAIN LAGI';
    btn.onclick=()=>location.reload();
  }
}
