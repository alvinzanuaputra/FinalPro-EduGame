export const sounds = {};
const AUDIO_PATH = 'assets/audio/';

const fileNames = [
  "Coin_reward.mp3",
  "Crowd_cheer.mp3",
  "Digital_transaction.mp3",
  "Happy_ending.mp3",
  "Jackpot.mp3",
  "Lose.mp3",
  "Notification.mp3",
  "Sad_ending.mp3",
  "Sip_coffee.mp3",
  "Slot_spin.mp3",
  "Smartphone_unlock.mp3",
  "TV_news.mp3",
  "UI_click_soft.mp3",
  "UI_select.mp3",
  "Warning_buzzer.mp3",
  "Whoosh_transition.mp3",
  "banana_Crunch.mp3",
  "dramatic_hit.mp3",
  "sunday_Morning1.mp3",
  "sunday_Morning2.mp3",
  "text_bip.mp3",
  "warning_notif.mp3",
  "Tense_BGM.mp3",
  "Resolution.mp3"
];

export function initAudio() {
  fileNames.forEach(fn => {
    const key = fn.replace('.mp3', '');
    const audio = new Audio(AUDIO_PATH + fn);
    audio.preload = 'auto';
    sounds[key] = audio;
  });
}

export function playSound(key) {
  if (sounds[key]) {
    sounds[key].currentTime = 0;
    sounds[key].play().catch(e => console.warn("Audio play blocked", e));
  }
}

export function loopSound(key) {
  if (sounds[key]) {
    sounds[key].loop = true;
    sounds[key].play().catch(e => console.warn("Audio loop blocked", e));
  }
}

export function stopSound(key) {
  if (sounds[key]) {
    sounds[key].pause();
    sounds[key].currentTime = 0;
  }
}

export function stopAllSounds() {
  Object.values(sounds).forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
}
