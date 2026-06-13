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

import { $, rupiah } from './render.js?v=3';
import { FSM, setSaldo, naikKC, tambahUtang } from './fsm.js?v=3';
import { playSound, stopSound } from './audio.js';

export function openPhone(html){ $('phone-screen').innerHTML=html; $('phone-overlay').style.display='flex'; }
export function closePhone(){ 
  playSound('UI_click_soft');
  $('phone-overlay').style.display='none'; 
  const phoneEl = document.getElementById('phone');
  if(phoneEl) phoneEl.classList.remove('judol-active');
  if(_afterPhone){const f=_afterPhone;_afterPhone=null;f();} 
}
let _afterPhone=null;

/* layar registrasi pinjol */
export function phoneRegisterPinjol(appName, cls, after){
  _afterPhone=after;
  playSound('Whoosh_transition');
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

export function phoneNotification(title, message, after) {
  _afterPhone = after;
  playSound('Notification');
  openPhone(`
    <div class="phone-appbar notif">💬 Notifikasi</div>
    <div class="phone-body" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;">
      <div style="background:#fff; color:#000; padding:20px; border-radius:12px; width:90%; text-align:center; box-shadow:0 4px 10px rgba(0,0,0,0.5);">
        <h4 style="margin:0 0 10px 0; border-bottom:1px solid #ddd; padding-bottom:10px;">${title}</h4>
        <p style="margin-bottom:20px;">${message}</p>
        <button class="phone-btn" onclick="closePhone()">Tutup</button>
      </div>
    </div>
  `);
}

let spinCount = 0;
let currentBet = 0;
let currentMultiplier = 1;

export function phoneJudol(after){
  _afterPhone=after;
  playSound('Whoosh_transition');
  const phoneEl = document.getElementById('phone');
  if(phoneEl) phoneEl.classList.add('judol-active');
  
  // Reset state on open
  currentBet = 0;
  currentMultiplier = 1;
  
  openPhone(`
    <div class="judol-bg">
      <div class="judol-header">
        <div class="judol-title">
          <div class="judol-coin-icon">💰</div>
          <div class="judol-title-text">
            <h3>リ屮特릿</h3>
            <p>Hello, Benny</p>
          </div>
        </div>
        <div class="judol-topup" onclick="judolTopup()">
          <div class="judol-topup-icon">💵</div>
          <span>Top up</span>
        </div>
      </div>
      
      <div class="judol-balance-label">Your balance:</div>
      <div class="judol-balance-box">
        <div class="judol-balance-value" id="judol-bal">${rupiah(FSM.SL.uang)}</div>
      </div>
      
      <div class="judol-bet-section">
        <div class="judol-bet-label">Place your bet :</div>
        <div class="judol-bet-input-box" onclick="openBetPopup()">
          👉 <span id="judol-bet-display">Rp 0</span>
        </div>
      </div>
      
      <div class="judol-spins-section">
        <div class="judol-bet-label">Number of spins:</div>
        <div class="judol-spins-buttons">
          <div class="spin-multiplier spin-m-3" id="btn-m-3" onclick="selectMultiplier(3)">3x</div>
          <div class="spin-multiplier spin-m-5" id="btn-m-5" onclick="selectMultiplier(5)">5x</div>
          <div class="spin-multiplier spin-m-7" id="btn-m-7" onclick="selectMultiplier(7)">7x</div>
        </div>
      </div>
      
      <div id="spin-res" class="phone-result" style="margin-top:10px; min-height: 20px; padding: 5px;"></div>
      
      <div class="judol-actions">
        <button class="judol-btn judol-btn-play" id="btn-play" onclick="spin()">🎰 Play</button>
        <button class="judol-btn judol-btn-back" onclick="closePhone()">↩ Back</button>
      </div>
      
      <!-- Popup -->
      <div class="bet-popup-container" id="bet-popup">
        <div class="bet-popup-close" onclick="closeBetPopup()">X</div>
        <div class="bet-popup-header">
          <div class="judol-coin-icon">🎰</div>
          <div class="bet-popup-title">Place your bet</div>
        </div>
        <div class="bet-option" onclick="selectBet(5000)">Rp 5,000</div>
        <div class="bet-option" onclick="selectBet(10000)">Rp 10,000</div>
        <div class="bet-option" onclick="selectBet(20000)">Rp 20,000</div>
        <div class="bet-option" onclick="selectBet(25000)">Rp 25,000</div>
      </div>
    </div>`);
    
    // Highlight initial multiplier
    updateMultiplierUI();
}

export function openBetPopup() {
  playSound('UI_click_soft');
  document.getElementById('bet-popup').classList.add('show');
}

export function closeBetPopup() {
  playSound('UI_click_soft');
  document.getElementById('bet-popup').classList.remove('show');
}

export function selectBet(amount) {
  playSound('UI_click_soft');
  currentBet = amount;
  document.getElementById('judol-bet-display').textContent = rupiah(amount);
  closeBetPopup();
}

export function selectMultiplier(val) {
  playSound('UI_click_soft');
  currentMultiplier = val;
  updateMultiplierUI();
}

function updateMultiplierUI() {
  document.querySelectorAll('.spin-multiplier').forEach(el => el.classList.remove('active'));
  const activeBtn = document.getElementById('btn-m-' + currentMultiplier);
  if (activeBtn) activeBtn.classList.add('active');
}

export function judolTopup() {
  playSound('UI_click_soft');
  // Simulasi topup pinjol instan untuk edukasi lingkaran setan judol-pinjol
  const confirmTopup = confirm("Saldo kurang? Mau top-up instan Rp 1.000.000 dari Pinjol Bang-Keen? (Bunga 5% per hari!)");
  if(confirmTopup) {
    playSound('Digital_transaction');
    tambahUtang(1000000);
    setSaldo(FSM.SL.uang + 1000000);
    document.getElementById('judol-bal').textContent = rupiah(FSM.SL.uang);
    const msgEl = document.getElementById('edu-msg');
    if (msgEl) msgEl.textContent = "[Sistem Edukasi]: Kamu baru saja meminjam uang berbunga tinggi untuk berjudi. Lingkaran setan dimulai.";
    alert("Top up berhasil! Utang pinjolmu bertambah.");
  }
}

export function spin(){
  playSound('UI_click_soft');
  if (currentBet === 0) {
    document.getElementById('spin-res').className='phone-result lose'; 
    document.getElementById('spin-res').textContent='Pilih nominal taruhan dulu!';
    return;
  }
  const totalCost = currentBet * currentMultiplier;
  if (FSM.SL.uang < totalCost) {
    document.getElementById('spin-res').className='phone-result lose'; 
    document.getElementById('spin-res').textContent='Saldo tidak cukup!';
    return;
  }
  
  startSpinScreen(currentMultiplier, currentBet);
}

function startSpinScreen(spinsLeft, betAmount) {
  openPhone(`
    <div class="spin-screen-bg">
      <div class="judol-hex-container">
        <div class="judol-hex-label">Prize :</div>
        <div class="judol-hex-box hex-yellow">
          <span class="hex-icon">🎁</span> <span id="spin-prize">Rp 0</span>
        </div>
      </div>
      
      <div class="reels-wrapper" id="reels-box">
        <div class="reel"><div class="reel-strip" id="reel-1"><div class="reel-symbol">💣</div></div></div>
        <div class="reel"><div class="reel-strip" id="reel-2"><div class="reel-symbol">🍓</div></div></div>
        <div class="reel"><div class="reel-strip" id="reel-3"><div class="reel-symbol">🍒</div></div></div>
      </div>
      
      <div class="judol-hex-container">
        <div class="judol-hex-label">Spins:</div>
        <div class="judol-hex-box hex-red">
          <span class="hex-icon">🎲</span> <span id="spin-count">${spinsLeft}x</span>
        </div>
      </div>
      
      <div class="judol-hex-container">
        <div class="judol-hex-label">Your bet :</div>
        <div class="judol-hex-box hex-purple">
          <span class="hex-icon">🎰</span> <span>${rupiah(betAmount)}</span>
        </div>
      </div>
      
      <div class="judol-hex-container">
        <div class="judol-hex-label">Your balance</div>
        <div class="judol-hex-box hex-green">
          <span class="hex-icon">💵</span> <span id="spin-bal">${rupiah(FSM.SL.uang)}</span>
        </div>
      </div>
      
      <div style="text-align:center; margin-top: 10px;">
        <button id="btn-back-menu" class="judol-btn judol-btn-back" style="display:none; width:100%;" onclick="backToMenu()">Kembali ke Menu</button>
      </div>
    </div>
  `);
  
  // Mulai game loop
  setTimeout(() => {
    doSpinRun(spinsLeft, betAmount, 0);
  }, 800);
}

const SYMBOLS = ['💣', '🍓', '🍒', '💎', '🍋', '🔔'];

function buildReelStrip(targetSymbol) {
  let html = '';
  // Add 15 random symbols for the blur effect
  for(let i=0; i<15; i++) {
    html += `<div class="reel-symbol">${SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]}</div>`;
  }
  // The last symbol is the target
  html += `<div class="reel-symbol">${targetSymbol}</div>`;
  return html;
}

function doSpinRun(spinsLeft, betAmount, totalPrize) {
  if (spinsLeft <= 0) {
    document.getElementById('btn-back-menu').style.display = 'block';
    return;
  }
  if (FSM.SL.uang < betAmount) {
    alert("Saldo habis di tengah putaran!");
    document.getElementById('btn-back-menu').style.display = 'block';
    return;
  }
  
  // 1. Potong saldo
  setSaldo(FSM.SL.uang - betAmount);
  document.getElementById('spin-bal').textContent = rupiah(FSM.SL.uang);
  
  // Update spins UI
  spinsLeft--;
  document.getElementById('spin-count').textContent = spinsLeft + 'x';
  
  // Jeda sebentar biar sadar uang kepotong sebelum muter
  setTimeout(() => {
    spinCount++;
    
    // Logic win/lose (Hook & drain)
    let win = false;
    let multiplierWin = 0;

    if (spinCount <= 2) {
      win = true;
      multiplierWin = 3 + Math.floor(Math.random() * 5); 
    } else {
      win = Math.random() < 0.10; 
      multiplierWin = 1.5; 
    }
    
    let r1, r2, r3;
    if (win) {
      const wSym = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      r1 = r2 = r3 = wSym;
    } else {
      r1 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      r2 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      do { r3 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]; } while (r1===r2 && r2===r3);
    }
    
    // Setup strips
    const strip1 = document.getElementById('reel-1');
    const strip2 = document.getElementById('reel-2');
    const strip3 = document.getElementById('reel-3');
    
    strip1.style.transition = 'none';
    strip2.style.transition = 'none';
    strip3.style.transition = 'none';
    strip1.style.transform = 'translateY(0)';
    strip2.style.transform = 'translateY(0)';
    strip3.style.transform = 'translateY(0)';
    
    strip1.innerHTML = buildReelStrip(r1);
    strip2.innerHTML = buildReelStrip(r2);
    strip3.innerHTML = buildReelStrip(r3);
    
    // Mulai animasi putaran ke bawah
    setTimeout(() => {
      playSound('Slot_spin');
      strip1.style.transition = 'transform 2s cubic-bezier(0.1, 0.7, 0.1, 1)';
      strip2.style.transition = 'transform 2.5s cubic-bezier(0.1, 0.7, 0.1, 1)';
      strip3.style.transition = 'transform 3s cubic-bezier(0.1, 0.7, 0.1, 1)';
      
      const dist = -(15 * 100); // geser 15 simbol x tinggi 100px
      strip1.style.transform = `translateY(${dist}px)`;
      strip2.style.transform = `translateY(${dist}px)`;
      strip3.style.transform = `translateY(${dist}px)`;
      
      // Tunggu reel terlama (3 detik) berhenti
      setTimeout(() => {
        if (win) {
          if (multiplierWin >= 5) playSound('Jackpot'); else playSound('Coin_reward');
          const hadiah = betAmount * multiplierWin;
          totalPrize += hadiah;
          setSaldo(FSM.SL.uang + hadiah);
          document.getElementById('spin-prize').textContent = rupiah(totalPrize);
          document.getElementById('spin-bal').textContent = rupiah(FSM.SL.uang);
        } else {
          playSound('Lose');
        }
        naikKC();
        
        // Jeda 1 detik sebelum putaran otomatis berikutnya
        setTimeout(() => {
          doSpinRun(spinsLeft, betAmount, totalPrize);
        }, 1000); 
        
      }, 3000);
    }, 50);
  }, 500); // 500ms melihat saldo dipotong
}

export function backToMenu() {
  phoneJudol(_afterPhone); 
}
/* chat dgn Yadi */
export function phoneChatYadi(after){
  _afterPhone=after;
  playSound('Notification');
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
window.openBetPopup = openBetPopup;
window.closeBetPopup = closeBetPopup;
window.selectBet = selectBet;
window.selectMultiplier = selectMultiplier;
window.judolTopup = judolTopup;
window.backToMenu = backToMenu;
