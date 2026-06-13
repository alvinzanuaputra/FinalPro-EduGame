/* =================================================================
   BAGIAN 1 — DEFINISI MULTI-FSM
   Tiap FSM = object { nama, singkatan, state, states[], transit() }
   Inti penilaian: beberapa FSM jalan paralel & guard antar-FSM.

   Catatan refactor: definisi & nama fungsi DIPINDAH apa adanya
   (FSM, setKC, naikKC, setSaldo, tambahUtang, setPJ, setKL, setHari).
   Tidak ada perubahan logika.
   ================================================================= */

import { render } from './render.js?v=3';

export const FSM = {
  // --- FSM_Hari : mesin utama pengatur progres cerita ---
  HR:{ nama:'FSM_Hari', s:0, label:'Hari 0' },

  // --- FSM_Kecanduan : naik tiap main judol ---
  KC:{ nama:'FSM_Kecanduan', s:0,
       states:['Iseng','Penasaran','Kebiasaan','Kecanduan','Sakau'] },

  // --- FSM_Saldo : kondisi keuangan (+ angka rupiah) ---
  SL:{ nama:'FSM_Saldo', s:0, uang:3000000,
       states:['Aman','Menipis','Kritis','Minus'] },

  // --- FSM_Pinjol : jeratan utang ---
  PJ:{ nama:'FSM_Pinjol', s:0, utang:0,
       states:['Belum pinjam','Pinjam Bang-Keen','Gali lubang','Ditagih','Diancam'] },

  // --- FSM_Keluarga : 0..3, lalu 4=kabur / 5=bertahan ---
  KL:{ nama:'FSM_Keluarga', s:0,
       states:['Harmonis','Curiga','Konflik','KDRT','Nadia kabur','Nadia bertahan'] },
};

/* ---- transisi terkontrol + guard ---- */
export function setKC(v){ FSM.KC.s = Math.max(FSM.KC.s, v); if(v>FSM.KC.s)FSM.KC.s=v; FSM.KC.s=v; render(); }
export function naikKC(){ if(FSM.KC.s<4) FSM.KC.s++; render(); }   // act: main_judol
export function setSaldo(v){
  FSM.SL.uang = v;
  // guard: tentukan state saldo dari angka
  if(v<=0) FSM.SL.s=3; else if(v<100000) FSM.SL.s=2;
  else if(v<1000000) FSM.SL.s=1; else FSM.SL.s=0;
  render();
}
export function tambahUtang(v){ FSM.PJ.utang+=v; render(); }
export function setPJ(v){ FSM.PJ.s=v; render(); }
export function setKL(v){ FSM.KL.s=v; render(); }
export function setHari(h){ FSM.HR.s=h; FSM.HR.label='Hari '+h; render(); }
