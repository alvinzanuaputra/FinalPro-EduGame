/* =================================================================
   ENTRY POINT — main.js?v=3
   Mengikat semua module, memasang listener input, dan render awal.
   Urutan import: fsm & render (inti) -> dialog/scenes/endings/phone
   -> tools. main.js?v=3 terakhir dimuat (lihat <script type="module"> di
   index.html).
   ================================================================= */

import { $, render } from './render.js?v=3';
import { play, next } from './dialog.js?v=3';
// import efek-samping: phone.js?v=3 & tools.js?v=3 mengekspos fungsi ke window
// (closePhone, spin, toggleDebug, toggleSkip, jumpEnding) utk onclick HTML.
import './phone.js?v=3';
import './tools.js?v=3';

/* mulai permainan dari layar judul */
export function startGame(){ $('title-screen').style.display='none'; render(); play('prolog'); }

/* lanjut dgn Space / klik */
$('dialog').addEventListener('click',()=>{ if($('choices').style.display!=='flex') next(); });
document.addEventListener('keydown',e=>{
  if(e.code==='Space'){ e.preventDefault();
    if($('choices').style.display!=='flex' && $('phone-overlay').style.display!=='flex') next(); }
});

/* ekspos ke window utk atribut onclick="startGame()" di index.html */
window.startGame = startGame;

import { phoneJudol } from './phone.js?v=3';
import { setScene } from './render.js?v=3';

export let hasPisang = true;

export function enterInteractiveMode() {
  $('dialog').style.display = 'none';
  $('choices').style.display = 'none';
  $('char-container').innerHTML = ''; // clear chars
  $('interactive-layer').style.display = 'block';
  setScene('bg_meja_interaktif.png', '');
}
window.enterInteractiveMode = enterInteractiveMode;

$('hitbox-hp').onclick = () => {
  $('interactive-layer').style.display = 'none';
  phoneJudol(() => {
    // Setelah main HP selesai, kembali ke scene checker
    import('./dialog.js?v=3').then(d => d.play('check_events'));
  });
};

$('hitbox-pisang').onclick = () => {
  if(!hasPisang) return;
  hasPisang = false;
  $('img-pisang').style.display = 'none';
  $('interactive-layer').style.display = 'none';
  import('./dialog.js?v=3').then(d => d.cont(['Saya (Benny)', 'Nyam nyam... enak juga pisang goreng bikinan Nadia.'], 'interactive_loop'));
};

$('hitbox-kopi').onclick = () => {
  $('interactive-layer').style.display = 'none';
  import('./dialog.js?v=3').then(d => d.cont(['Saya (Benny)', 'Sruput... ah mantap, kopi hitam memang the best.'], 'interactive_loop'));
};

$('hitbox-tv').onclick = () => {
  $('interactive-layer').style.display = 'none';
  const news = Math.random() > 0.5 ? 'Berita hari ini: Harga sembako kembali naik...' : 'Sinetron: "Kumenangis..."';
  import('./dialog.js?v=3').then(d => d.cont(['TV', news], 'interactive_loop'));
};

/* render awal */
render();
