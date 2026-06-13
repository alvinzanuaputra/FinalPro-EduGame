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

import { initAudio, playSound } from './audio.js';

/* mulai permainan dari layar judul */
export function startGame(){ 
  initAudio();
  playSound('UI_click_soft');
  $('title-screen').style.display='none'; 
  render(); 
  play('prolog'); 
}

/* lanjut dgn Space / klik */
$('dialog').addEventListener('click',()=>{ if($('choices').style.display!=='flex') { playSound('UI_click_soft'); next(); } });
document.addEventListener('keydown',e=>{
  if(e.code==='Space'){ e.preventDefault();
    if($('choices').style.display!=='flex' && $('phone-overlay').style.display!=='flex') { playSound('UI_click_soft'); next(); } }
});

/* ekspos ke window utk atribut onclick="startGame()" di index.html */
window.startGame = startGame;

import { phoneJudol } from './phone.js?v=3';
import { setScene } from './render.js?v=3';

export let hasPisang = true;

export function enterInteractiveMode() {
  playSound('Whoosh_transition');
  $('dialog').style.display = 'none';
  $('choices').style.display = 'none';
  $('char-container').innerHTML = ''; // clear chars
  $('interactive-layer').style.display = 'block';
  
  setScene('bg_meja_interaktif.png', '');
}
window.enterInteractiveMode = enterInteractiveMode;

$('hitbox-hp').onclick = () => {
  playSound('UI_click_soft');
  $('interactive-layer').style.display = 'none';
  playSound('Smartphone_unlock');
  phoneJudol(() => {
    // Setelah main HP selesai, kembali ke scene checker
    import('./dialog.js?v=3').then(d => d.play('check_events'));
  });
};

$('hitbox-pisang').onclick = () => {
  if(!hasPisang) return;
  hasPisang = false;
  playSound('UI_click_soft');
  playSound('banana_Crunch');
  
  // Show only-banana image and animate it
  const animPisang = $('anim-pisang');
  animPisang.style.display = 'block';
  animPisang.classList.add('anim-lift');
  
  // Hide the animated banana after it finishes so it doesn't replay later
  setTimeout(() => {
    animPisang.classList.remove('anim-lift');
    animPisang.style.display = 'none';
  }, 600);
  
  // Empty the plate immediately
  $('img-pisang').src = 'assets/images/characters/piring_kosong.png';
  
  import('./dialog.js?v=3').then(d => d.cont(['Saya (Benny)', 'Nyam nyam... enak juga pisang goreng bikinan Nadia.'], 'interactive_loop'));
};

export let isCoffeeFull = true;
$('hitbox-kopi').onclick = () => {
  if(!isCoffeeFull) return;
  isCoffeeFull = false;
  playSound('UI_click_soft');
  playSound('Sip_coffee');
  
  const imgKopi = $('img-kopi');
  imgKopi.classList.add('anim-lift');
  
  // Swap to empty cup after animation finishes
  setTimeout(() => {
    imgKopi.classList.remove('anim-lift');
    imgKopi.src = 'assets/images/characters/gelas_kopi_kosong.png';
  }, 600);
  
  import('./dialog.js?v=3').then(d => d.cont(['Saya (Benny)', 'Sruput... ah mantap, kopi hitam memang the best.'], 'interactive_loop'));
};

export let isTvChannel1 = true;
$('hitbox-remote').onclick = () => {
  playSound('UI_click_soft');
  isTvChannel1 = !isTvChannel1;
  $('img-tv').src = isTvChannel1 ? 'assets/images/characters/tv_layar1.png' : 'assets/images/characters/tv_layar2.png';
  const news = isTvChannel1 ? 'Berita hari ini: Harga sembako kembali naik...' : 'GOOOOLLL!!! Pertandingan yang menegangkan!';
  if(isTvChannel1) playSound('TV_news'); else playSound('Crowd_cheer');
  import('./dialog.js?v=3').then(d => d.cont(['TV', news], 'interactive_loop'));
};

/* =========================================================
   RESIZING LOGIC UNTUK RESPONSIVITAS
   ========================================================= */
function resizeGame() {
  const stage = document.getElementById('stage');
  if (!stage) return;
  const gameW = 900;
  const gameH = 506.25;
  // Hitung rasio layar agar game selalu pas tanpa terpotong
  const scale = Math.min(window.innerWidth / gameW, window.innerHeight / gameH);
  stage.style.transform = `scale(${scale})`;
}
window.addEventListener('resize', resizeGame);
resizeGame();

/* render awal */
render();
