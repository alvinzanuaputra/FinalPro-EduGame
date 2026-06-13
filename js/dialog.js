/* =================================================================
   BAGIAN 3 — DIALOG ENGINE
   Tiap "scene" = array of langkah. Langkah bisa:
   - {t:'say', who, text, bg?, char?}     dialog biasa
   - {t:'choice', q, opts:[{label,go}]}   percakapan bercabang
   - {t:'fx', run}                         efek (ubah FSM / buka HP)
   - {t:'goto', scene}                     pindah scene
   - {t:'ending', n}                       picu ending
   ================================================================= */

import { $, setScene } from './render.js?v=3';
import { SCENES } from './scenes.js?v=3';
import { showEnding } from './endings.js?v=3';

let current=[], idx=0, busy=false;

export function play(scene){ current=SCENES[scene]; idx=0; next(); }
export function next(){
  if(busy) return;
  if(idx>=current.length) return;
  const step=current[idx++];
  handle(step);
}
export function handle(step){
  hideChoices();
  if(step.bg!==undefined||step.char!==undefined) setScene(step.bg||$('bg-alt')._cur, step.char);
  switch(step.t){
    case 'say': 
      if(step.bg) { $('bg-alt').textContent='[ ALT: '+step.bg+' ]'; $('bg-alt')._cur=step.bg; }
      if('char' in step) setScene(step.bg||($('bg-alt')._cur||''), step.char);
      if(step.bgm) { import('./audio.js').then(a => { a.stopAllSounds(); a.loopSound(step.bgm); }); }
      if(step.sound) { import('./audio.js').then(a => a.playSound(step.sound)); }
      showDialog(step.who||'', step.text); break;
    case 'fx': 
      const prev = current;
      step.run();
      if(current === prev) next();
      break;
    case 'call': 
      document.getElementById('dialog').style.display='none';
      step.run(); 
      break;
    case 'choice': showChoices(step); break;
    case 'goto': play(step.scene); break;
    case 'ending': showEnding(step.n); break;
  }
}
export function showDialog(who,text){
  $('dialog').style.display='block';
  $('choices').style.display='none';
  $('speaker').textContent=who;
  $('line').textContent=text;
  $('hint').classList.remove('hidden');
  import('./audio.js').then(a => a.playSound('text_bip'));
}
export function showChoices(step){
  $('hint').classList.add('hidden');
  if(step.q){ $('speaker').textContent=''; $('line').textContent=step.q; }
  const box=$('choices'); box.innerHTML=''; box.style.display='flex';
  step.opts.forEach(o=>{
    const b=document.createElement('button');
    b.textContent='▸ '+o.label;
    b.onmouseenter=()=>import('./audio.js').then(a=>a.playSound('UI_select'));
    b.onclick=(e)=>{ 
      e.stopPropagation(); 
      import('./audio.js').then(a => a.playSound('UI_click_soft'));
      hideChoices(); 
      o.go(); 
    };
    box.appendChild(b);
  });
}
export function hideChoices(){ $('choices').style.display='none'; }

/* helper: sisipkan 1 dialog lalu lanjut ke scene lain */
export function cont(say, scene){
  current=[{t:'say',who:say[0],text:say[1]},{t:'goto',scene}];
  idx=0; next();
}
