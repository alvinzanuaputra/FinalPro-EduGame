/* =================================================================
   BAGIAN 4 — SIMULASI HP (judol & pinjol)
   --------------------------------------------------------------
   Catatan ekspos ke window:
   HTML hasil generate di dalam #phone-screen memakai atribut
   onclick="closePhone()" dan onclick="spin()". Karena ES module
   ber-scope lokal, kedua fungsi itu DIEKSPOS ke window di bawah
   (window.closePhone / window.spin) supaya atribut onclick tetap
   menemukannya. Pendekatan dipilih konsisten: fungsi yang dipanggil
   dari string HTML onclick = diekspos ke window; selebihnya import biasa.
   ================================================================= */

import { $, rupiah } from './render.js';
import { FSM, setSaldo, naikKC } from './fsm.js';

export function openPhone(html){ $('phone-screen').innerHTML=html; $('phone-overlay').style.display='flex'; }
export function closePhone(){ $('phone-overlay').style.display='none'; if(_afterPhone){const f=_afterPhone;_afterPhone=null;f();} }
let _afterPhone=null;

/* layar registrasi pinjol */
export function phoneRegisterPinjol(appName, cls, after){
  _afterPhone=after;
  openPhone(`
    <div class="phone-appbar ${cls}">📱 ${appName}</div>
    <div class="phone-body">
      <h4>Registrasi Pinjaman</h4>
      <p style="color:#aaa;font-size:13px">Lengkapi data untuk mencairkan dana instan.</p>
      <div class="ktp-slot" style="padding:4px"><img src="assets/images/phone/ktp.png" style="width:100%;border-radius:4px"><br>📷 Foto KTP</div>
      <div class="selfie-slot" style="padding:4px"><img src="assets/images/phone/selfie_ktp.png" style="width:100%;border-radius:4px"><br>🤳 Selfie memegang KTP</div>
      <button class="phone-btn danger" onclick="closePhone()">Ajukan Pinjaman →</button>
    </div>`);
}
/* layar judol – mini taruhan */
export function phoneJudol(after){
  _afterPhone=after;
  openPhone(`
    <div class="phone-appbar judol">🎰 SLOT GACOR88</div>
    <div class="phone-body">
      <div class="phone-saldo">Saldo Akun<div class="v">${rupiah(FSM.SL.uang)}</div></div>
      <p style="text-align:center;color:#aaa;font-size:13px">Tekan SPIN untuk bermain</p>
      <button class="phone-btn purple" onclick="spin()">🎰 SPIN (taruhan Rp 100.000)</button>
      <div id="spin-res" class="phone-result"></div>
      <button class="phone-btn" onclick="closePhone()" style="background:#444;margin-top:18px">Tutup</button>
    </div>`);
}
export function spin(){
  const win=Math.random()<0.32; // sengaja kalah lebih sering (house always wins)
  if(win){
    setSaldo(FSM.SL.uang+150000);
    $('spin-res').className='phone-result win'; $('spin-res').textContent='🎉 MENANG +Rp 150.000';
  }else{
    setSaldo(Math.max(0,FSM.SL.uang-100000));
    $('spin-res').className='phone-result lose'; $('spin-res').textContent='💀 KALAH −Rp 100.000';
  }
  naikKC();
  document.querySelector('#phone .phone-saldo .v').textContent=rupiah(FSM.SL.uang);
}
/* chat dgn Yadi */
export function phoneChatYadi(after){
  _afterPhone=after;
  openPhone(`
    <div class="phone-appbar">💬 Yadi Harmoko</div>
    <div class="phone-chat">
      <div class="phone-msg them">Ben! Gua abis JACKPOT gede 🤑</div>
      <div class="phone-msg them">Ntar gua traktir ngopi. Lu mau ikutan main ga?</div>
      <div class="phone-msg me">Hah judi online? 🤨</div>
      <div class="phone-msg them">Iseng2 aja bro, cuan kok 😎 nih linknya</div>
    </div>
    <button class="phone-btn" onclick="closePhone()" style="margin:12px">Tutup chat</button>`);
}

/* Ekspos ke window utk atribut onclick di HTML hasil generate */
window.closePhone = closePhone;
window.spin = spin;
