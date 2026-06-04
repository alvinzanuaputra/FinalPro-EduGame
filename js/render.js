/* =================================================================
   BAGIAN 2 — RENDER UI dari STATE
   Berisi: helper $, rupiah, render(), dan setScene() (slot gambar).
   ================================================================= */

import { FSM } from './fsm.js';

export const $=id=>document.getElementById(id);
export function rupiah(n){ return 'Rp '+n.toLocaleString('id-ID'); }

export function render(){
  $('saldo').textContent = rupiah(FSM.SL.uang);
  $('hari').textContent = 'Hari ke-'+FSM.HR.s;
  // bar kecanduan
  const pct=(FSM.KC.s/4)*100;
  const fill=$('kc-fill');
  fill.style.width=pct+'%';
  fill.style.background = FSM.KC.s>=4?'var(--danger)':FSM.KC.s>=2?'var(--warn)':'var(--accent)';
  $('kc-name').textContent=FSM.KC.states[FSM.KC.s];
  // panel debug
  $('d-hr').textContent=FSM.HR.s;
  $('d-kc').textContent=FSM.KC.s+' '+FSM.KC.states[FSM.KC.s];
  $('d-sl').textContent=FSM.SL.s+' '+FSM.SL.states[FSM.SL.s];
  $('d-pj').textContent=FSM.PJ.s+' '+FSM.PJ.states[FSM.PJ.s];
  $('d-kl').textContent=FSM.KL.s+' '+FSM.KL.states[FSM.KL.s];
  $('d-utang').textContent=rupiah(FSM.PJ.utang);
}

/* =================================================================
   SLOT GAMBAR — PENANGANAN PATH
   --------------------------------------------------------------
   Gambar dimuat dari folder sesuai kategori. TINGGAL TARUH FILE
   gambarmu di folder berikut (lihat assets/README_ASSETS.md):
     - background -> assets/images/backgrounds/<file>
     - character  -> assets/images/characters/<file>
     - phone      -> assets/images/phone/<file>   (dipakai di js/phone.js)
   Jika gambar BELUM ADA / gagal dimuat, otomatis fallback ke
   label "[ ALT: namafile ]" supaya game tetap jalan walau folder
   gambar masih kosong (lihat onerror di applySlot()).
   ================================================================= */
export const IMG_BASE = {
  background: 'assets/images/backgrounds/',
  character:  'assets/images/characters/',
  phone:      'assets/images/phone/',
};
export function imgPath(category, file){ return IMG_BASE[category] + file; }

/* Pasang gambar ke sebuah slot, dgn fallback label "[ ALT: ... ]". */
function applySlot(slotId, labelId, category, file){
  const slot  = $(slotId);
  const label = $(labelId);
  if(!file){
    label.textContent = '';
    label.style.display = 'none';
    slot.style.backgroundImage = '';
    return;
  }
  // Default: tampilkan label sbg fallback (perilaku asli kalau gambar belum ada)
  label.textContent = '[ ALT: '+file+' ]';
  label.style.display = 'block';
  // Coba muat gambar dari folder yang benar. Kalau ada -> tampilkan,
  // kalau gagal (onerror) -> biarkan label "[ ALT: ... ]" tetap tampil.
  const url = imgPath(category, file);
  const probe = new Image();
  probe.onload  = ()=>{ slot.style.backgroundImage = "url('"+url+"')"; label.style.display='none'; };
  probe.onerror = ()=>{ slot.style.backgroundImage = ''; label.style.display='block'; };
  probe.src = url;
}

/* gant latar & karakter (SLOT GAMBAR) -------------------------- */
/* ALT = petunjuk nama file gambar yang harus kamu cari/buat.    */
export function setScene(bgAlt, charAlt){
  applySlot('bg-slot',  'bg-alt',  'background', bgAlt);
  applySlot('char-slot','char-alt','character',  charAlt);
}
