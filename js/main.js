/* =================================================================
   ENTRY POINT — main.js
   Mengikat semua module, memasang listener input, dan render awal.
   Urutan import: fsm & render (inti) -> dialog/scenes/endings/phone
   -> tools. main.js terakhir dimuat (lihat <script type="module"> di
   index.html).
   ================================================================= */

import { $, render } from './render.js';
import { play, next } from './dialog.js';
// import efek-samping: phone.js & tools.js mengekspos fungsi ke window
// (closePhone, spin, toggleDebug, toggleSkip, jumpEnding) utk onclick HTML.
import './phone.js';
import './tools.js';

/* mulai permainan dari layar judul */
export function startGame(){ $('title-screen').style.display='none'; render(); play('prolog'); }

/* lanjut dgn Space / klik */
$('dialog').addEventListener('click',()=>{ if($('choices').style.display!=='flex') next(); });
document.addEventListener('keydown',e=>{
  if(e.code==='Space'){ e.preventDefault();
    if($('choices').style.display!=='flex' && $('phone-overlay').style.display!=='flex') next(); }
});

/* Ekspos ke window utk atribut onclick="startGame()" di index.html */
window.startGame = startGame;

/* render awal (sama seperti baris terakhir versi single-file) */
render();
