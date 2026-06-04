/* =================================================================
   BAGIAN 7 — KONTROL & DEMO TOOLS
   --------------------------------------------------------------
   toggleDebug, toggleSkip, jumpEnding dipanggil dari atribut
   onclick="" di index.html. Karena ES module ber-scope lokal,
   ketiganya DIEKSPOS ke window di bawah agar atribut onclick
   tetap menemukannya (lihat catatan yang sama di js/phone.js).
   ================================================================= */

import { $, render } from './render.js';
import { FSM, setSaldo, setPJ, setKL, setHari } from './fsm.js';
import { showEnding } from './endings.js';

export function toggleDebug(){
  const p=$('fsm-debug'),b=$('toggle-debug');
  if(p.style.display==='none'){p.style.display='block';b.classList.remove('collapsed');b.textContent='FSM ▸';}
  else{p.style.display='none';b.classList.add('collapsed');b.textContent='◂ FSM';}
}
export function toggleSkip(){ const m=$('skip-menu'); m.style.display=m.style.display==='flex'?'none':'flex'; }

/* lompat ke ending untuk demo — set state FSM agar konsisten */
export function jumpEnding(n){
  $('title-screen').style.display='none';
  toggleSkip();
  const old=document.querySelector('.ending-screen'); if(old)old.remove();
  if(n===1){ setHari(0);FSM.KC.s=0;setSaldo(3000000);setPJ(0);setKL(0); }
  if(n===2){ setHari(17);FSM.KC.s=3;setSaldo(35000);setPJ(0);setKL(2); }
  if(n===3){ setHari(119);FSM.KC.s=4;setSaldo(0);setPJ(4);FSM.PJ.utang=135000000;setKL(4); }
  if(n===4){ setHari(114);FSM.KC.s=4;setSaldo(2000);setPJ(4);FSM.PJ.utang=127000000;setKL(4); }
  if(n===5){ setHari(120);FSM.KC.s=4;setSaldo(0);setPJ(4);setKL(4); }
  if(n===6){ setHari(134);FSM.KC.s=4;setSaldo(0);setPJ(2);setKL(5); }
  render();
  showEnding(n);
}

/* Ekspos ke window utk atribut onclick di index.html */
window.toggleDebug = toggleDebug;
window.toggleSkip  = toggleSkip;
window.jumpEnding  = jumpEnding;
