/**
 * Chrome Dino: Heartbreak to Empire 🦖💔💼
 * Authentic Pixel Edition with < (Die) & C (Career) keys
 */

// =================== AUDIO SYNTHESIZER ===================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.sigmaLoop = null;
    this.isSigmaPlaying = false;
    this.sadLoop = null;
    this.isSadPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playJump() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  playCollect() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [587.33, 739.99, 880.00, 1174.66];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.04);
        gain.gain.setValueAtTime(0.18, this.ctx.currentTime + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + i * 0.04 + 0.14);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.04);
        osc.stop(this.ctx.currentTime + i * 0.04 + 0.14);
      });
    } catch (e) {}
  }

  playCrash() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(25, this.ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch (e) {}
  }

  startSadBGM() {
    if (this.muted || this.isSadPlaying) return;
    this.init();
    if (!this.ctx) return;
    this.isSadPlaying = true;

    // Melancholic chord progression: Am -> F -> C -> Em
    const chordSeq = [
      [220, 261.63, 329.63, 440], // Am
      [174.61, 220, 261.63, 349.23], // F
      [130.81, 196, 261.63, 329.63], // C
      [164.81, 196, 246.94, 329.63]  // Em
    ];
    let chordIdx = 0;

    const playChord = () => {
      if (!this.isSadPlaying || this.muted || !this.ctx) return;
      const notes = chordSeq[chordIdx % chordSeq.length];
      notes.forEach((freq, i) => {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.08);
          gain.gain.setValueAtTime(0.001, this.ctx.currentTime + i * 0.08);
          gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + i * 0.08 + 0.4);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.08 + 2.4);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(this.ctx.currentTime + i * 0.08);
          osc.stop(this.ctx.currentTime + i * 0.08 + 2.5);
        } catch (e) {}
      });
      chordIdx++;
    };

    playChord();
    this.sadLoop = setInterval(playChord, 2200);
  }

  stopSadBGM() {
    this.isSadPlaying = false;
    if (this.sadLoop) {
      clearInterval(this.sadLoop);
      this.sadLoop = null;
    }
  }

  playHeartbreak() {
    this.startSadBGM();
  }

  startSigmaPhonk() {
    if (this.muted || this.isSigmaPlaying) return;
    this.init();
    if (!this.ctx) return;
    this.isSigmaPlaying = true;
    
    let step = 0;
    const bassline = [110, 110, 130.8, 110, 146.8, 130.8, 98, 110];
    const bpm = 140;
    const interval = (60 / bpm / 2) * 1000;

    this.sigmaLoop = setInterval(() => {
      if (this.muted || !this.isSigmaPlaying || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = step % 2 === 0 ? 'sawtooth' : 'square';
        const freq = bassline[step % bassline.length];
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.16);

        if (step % 2 === 1) {
          const osc2 = this.ctx.createOscillator();
          const gain2 = this.ctx.createGain();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(1400, this.ctx.currentTime);
          gain2.gain.setValueAtTime(0.05, this.ctx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
          osc2.connect(gain2);
          gain2.connect(this.ctx.destination);
          osc2.start();
          osc2.stop(this.ctx.currentTime + 0.05);
        }
        step++;
      } catch (e) {}
    }, interval);
  }

  stopSigmaPhonk() {
    this.isSigmaPlaying = false;
    if (this.sigmaLoop) {
      clearInterval(this.sigmaLoop);
      this.sigmaLoop = null;
    }
  }

  playVictory() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const notes = [392, 523.25, 659.25, 783.99, 1046.50, 1318.5];
    notes.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime + i * 0.12);
      gain.gain.setValueAtTime(0.22, this.ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + i * 0.12 + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + i * 0.12);
      osc.stop(this.ctx.currentTime + i * 0.12 + 0.35);
    });
  }
}

// =================== GAME ENGINE ===================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const sound = new SoundFX();

// Game States
const STATE = {
  START: 'START',
  RUNNING: 'RUNNING',
  HEARTBREAK_PAUSE: 'HEARTBREAK_PAUSE',             // Looking at the cheating couple & crying
  RETREAT_TOWARDS_TREE: 'RETREAT_TOWARDS_TREE',     // Backing away towards tree after pressing <
  TREE_CRASH_DEATH: 'TREE_CRASH_DEATH',             // Crashed into tree
  CHAPTER_CLOSED: 'CHAPTER_CLOSED',
  MOVE_FORWARD_CAREER: 'MOVE_FORWARD_CAREER',       // Moving forward past them peacefully (no killing)
  CAREER_RUSH: 'CAREER_RUSH',                       // Career rush mode with tons of items
  CAREER_VICTORY: 'CAREER_VICTORY',
  GAME_OVER: 'GAME_OVER'
};

let gameState = STATE.RUNNING;
let score = 0;
let highScore = 0;
let gameSpeed = 6.2;
let groundY = 245;
let frameCount = 0;
let distance = 0;
let careerCollectiblesCount = 0;
let screenShake = 0;
let heartbreakTimer = 0;
let optionsAvailable = false;

// UI Elements
const hudCurrentScore = document.getElementById('current-score');
const hudHighScore = document.getElementById('high-score');
const hudModeBadge = document.getElementById('mode-badge');
const gameContainer = document.getElementById('game-container');
const reelCaption = document.getElementById('reel-caption');
const storyControlsHud = document.getElementById('story-controls-hud');

// Overlays
const startOverlay = document.getElementById('start-overlay');
const chapterClosedOverlay = document.getElementById('chapter-closed-overlay');
const careerVictoryOverlay = document.getElementById('career-victory-overlay');
const gameoverOverlay = document.getElementById('gameover-overlay');
const gameoverScore = document.getElementById('gameover-score');

// Buttons
const btnStart = document.getElementById('btn-start');
const btnRestartDie = document.getElementById('btn-restart-die');
const btnRestartWin = document.getElementById('btn-restart-win');
const btnRestartNormal = document.getElementById('btn-restart-normal');
const btnSound = document.getElementById('btn-sound');
const btnFullscreen = document.getElementById('btn-fullscreen');
const btnSkipRose = document.getElementById('btn-skip-rose');
const btnSkip = document.getElementById('btn-skip');
const btnTouchJump = document.getElementById('btn-touch-jump');
const btnTouchDuck = document.getElementById('btn-touch-duck');
const btnKeyBack = document.getElementById('btn-key-back');
const btnKeyCareer = document.getElementById('btn-key-career');

// Dino Character
const dino = {
  x: 140,
  y: groundY - 47,
  w: 44,
  h: 47,
  vy: 0,
  gravity: 0.65,
  jumpPower: -11.5,
  isGrounded: true,
  isDucking: false,
  legFrame: 0,
  isSigma: false,
  hasRose: false,
  isCollapsed: false,
  facingLeft: false,
  tears: []
};

// Cheating Couple
let cheatingCouple = {
  active: false,
  x: 950,
  y: groundY - 47,
  vx: 0,
  vy: 0,
  rotation: 0,
  isFlyingAway: false
};

// Back Tree for retreat crash
let backTree = {
  active: false,
  x: -120,
  w: 80,
  h: 140
};

// Rose Pickup
let rosePickup = {
  active: false,
  x: -100,
  y: groundY - 26,
  w: 24,
  h: 24
};

// Entities
let obstacles = [];
let careerItems = [];
let clouds = [];
let groundParticles = [];
let floatingTexts = [];
let confetti = [];
let raindrops = [];
let splinters = [];
let loveHearts = [];

// =================== RETRO PIXEL SPRITES ===================

function drawDinoSprite(x, y, isSigma, hasRose, ducking, legFrame, collapsed, facingLeft) {
  ctx.save();
  ctx.translate(x, y);

  if (facingLeft) {
    ctx.scale(-1, 1);
    ctx.translate(-dino.w, 0);
  }

  if (collapsed) {
    ctx.rotate(Math.PI / 2.2);
    ctx.translate(10, -30);
  }

  let color = isSigma ? '#f59e0b' : (gameState === STATE.CHAPTER_CLOSED ? '#64748b' : '#535353');
  ctx.fillStyle = color;

  if (ducking && !collapsed) {
    // Ducking Dino Body
    ctx.fillRect(0, 18, 55, 20);
    ctx.fillRect(35, 12, 24, 18);
    // Eye
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(50, 15, 4, 4);
    // Legs
    ctx.fillStyle = color;
    if (legFrame % 2 === 0) {
      ctx.fillRect(10, 38, 8, 8);
      ctx.fillRect(32, 38, 6, 6);
    } else {
      ctx.fillRect(10, 38, 6, 6);
      ctx.fillRect(32, 38, 8, 8);
    }
    if (isSigma) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(46, 15, 12, 5);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(47, 16, 2, 2);
    }
    ctx.restore();
    return;
  }

  // Tail
  ctx.fillRect(0, 16, 6, 8);
  ctx.fillRect(4, 20, 8, 12);

  // Body
  ctx.fillRect(10, 14, 20, 24);

  // Neck & Head
  ctx.fillRect(20, 4, 14, 16);
  ctx.fillRect(24, 0, 20, 16);
  ctx.fillRect(34, 4, 10, 12);

  // Eye
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(38, 3, 4, 4);

  // Arms
  ctx.fillStyle = color;
  ctx.fillRect(32, 20, 8, 4);
  ctx.fillRect(38, 22, 2, 4);

  // Legs Animation
  if (!dino.isGrounded && !collapsed) {
    ctx.fillRect(14, 38, 5, 8);
    ctx.fillRect(24, 38, 5, 8);
  } else if (!collapsed) {
    if (legFrame % 2 === 0) {
      ctx.fillRect(14, 38, 5, 10);
      ctx.fillRect(14, 46, 8, 3);
      ctx.fillRect(24, 38, 5, 6);
    } else {
      ctx.fillRect(14, 38, 5, 6);
      ctx.fillRect(24, 38, 5, 10);
      ctx.fillRect(24, 46, 8, 3);
    }
  }

  // Holding Red Rose 🌹
  if (hasRose && !collapsed) {
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(42, 10, 12, 3);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(52, 6, 8, 8);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(54, 8, 4, 4);
  }

  // Sigma Black Pixel Sunglasses 😎
  if (isSigma && !collapsed) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(36, 3, 12, 5);
    ctx.fillRect(44, 5, 4, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(37, 4, 2, 2);
  }

  // Heartbroken Tears 😢
  if (dino.tears && dino.tears.length > 0) {
    ctx.fillStyle = '#38bdf8';
    dino.tears.forEach(t => {
      ctx.fillRect(t.x, t.y, 3, 4);
    });
  }

  ctx.restore();
}

// Cheating Couple (GF + Lover Dino kissing as in screenshot)
function drawCheatingCouple(couple) {
  ctx.save();
  ctx.translate(couple.x, couple.y);

  if (couple.isFlyingAway) {
    ctx.rotate(couple.rotation);
  }

  // Partner 1 (facing right)
  ctx.save();
  ctx.fillStyle = '#535353';
  // Head
  ctx.fillRect(18, 0, 18, 16);
  ctx.fillRect(14, 4, 12, 16);
  // Body
  ctx.fillRect(8, 14, 18, 24);
  // Tail
  ctx.fillRect(0, 16, 6, 8);
  ctx.fillRect(4, 20, 8, 12);
  // Eye
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(26, 4, 3, 3);
  // Legs
  ctx.fillStyle = '#535353';
  ctx.fillRect(12, 38, 4, 9);
  ctx.fillRect(20, 38, 4, 9);
  // Cute pink ribbon on Girlfriend
  ctx.fillStyle = '#ec4899';
  ctx.fillRect(15, -4, 6, 4);
  ctx.fillRect(12, -3, 3, 2);
  ctx.fillRect(21, -3, 3, 2);
  ctx.restore();

  // Partner 2 (facing left, kissing snout to snout!)
  ctx.save();
  ctx.translate(56, 0);
  ctx.scale(-1, 1);
  ctx.fillStyle = '#535353';
  // Head
  ctx.fillRect(18, 0, 18, 16);
  ctx.fillRect(14, 4, 12, 16);
  // Body
  ctx.fillRect(8, 14, 18, 24);
  // Tail
  ctx.fillRect(0, 16, 6, 8);
  ctx.fillRect(4, 20, 8, 12);
  // Eye
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(26, 4, 3, 3);
  // Legs
  ctx.fillStyle = '#535353';
  ctx.fillRect(12, 38, 4, 9);
  ctx.fillRect(20, 38, 4, 9);
  ctx.restore();

  // Two Kissing Hearts floating directly above their snouts (as in the screenshot!)
  if (!couple.isFlyingAway) {
    const time = Date.now() * 0.003;
    const hY1 = -10 + Math.sin(time) * 3;
    const hY2 = -24 + Math.sin(time + 1.2) * 3;
    drawPixelHeart(24, hY1, 10, '#1c1917');
    drawPixelHeart(24, hY2, 9, '#3f3f46');
  }

  ctx.restore();
}

function drawPixelHeart(x, y, size, color) {
  ctx.fillStyle = color;
  const s = size / 4;
  ctx.fillRect(x + s, y, s, s);
  ctx.fillRect(x + s * 2, y, s, s);
  ctx.fillRect(x, y + s, s * 4, s);
  ctx.fillRect(x + s, y + s * 2, s * 2, s);
  ctx.fillRect(x + s * 1.5, y + s * 3, s, s);
}

// Tree for Back Crash
function drawDeadTree(x, y, w, h) {
  ctx.fillStyle = '#3f3f46';
  ctx.fillRect(x + 25, y + 20, 20, h - 20);
  ctx.fillRect(x + 10, y + h - 10, 50, 10);
  // Branches
  ctx.fillRect(x + 5, y + 40, 25, 8);
  ctx.fillRect(x + 5, y + 25, 8, 20);
  ctx.fillRect(x + 40, y + 30, 30, 8);
  ctx.fillRect(x + 60, y + 15, 8, 20);
}

// Cacti & Birds
function drawCactus(x, y, type) {
  ctx.fillStyle = '#535353';
  if (type === 'small') {
    ctx.fillRect(x + 4, y + 6, 6, 26);
    ctx.fillRect(x, y + 12, 4, 10);
    ctx.fillRect(x + 10, y + 16, 4, 8);
  } else if (type === 'large') {
    ctx.fillRect(x + 6, y, 8, 38);
    ctx.fillRect(x, y + 10, 6, 14);
    ctx.fillRect(x + 14, y + 14, 6, 12);
  } else if (type === 'triple') {
    ctx.fillRect(x + 4, y + 6, 6, 26);
    ctx.fillRect(x + 14, y, 7, 34);
    ctx.fillRect(x + 24, y + 10, 6, 22);
  }
}

function drawPterodactyl(x, y, frame) {
  ctx.fillStyle = '#535353';
  ctx.fillRect(x + 10, y + 10, 18, 8);
  ctx.fillRect(x, y + 12, 10, 4);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x + 12, y + 11, 2, 2);
  ctx.fillStyle = '#535353';
  if (frame % 2 === 0) {
    ctx.fillRect(x + 16, y, 6, 12);
    ctx.fillRect(x + 14, y - 6, 8, 8);
  } else {
    ctx.fillRect(x + 16, y + 14, 6, 12);
    ctx.fillRect(x + 14, y + 20, 8, 8);
  }
}

// Career Items
function drawCareerItem(item) {
  ctx.save();
  ctx.translate(item.x, item.y);
  const floatY = Math.sin(Date.now() * 0.008 + item.x) * 4;
  ctx.translate(0, floatY);

  if (item.type === 'briefcase') {
    ctx.fillStyle = '#854d0e';
    ctx.fillRect(0, 6, 28, 20);
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(10, 2, 8, 4);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(6, 14, 16, 4);
  } else if (item.type === 'crypto') {
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(14, 14, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('$', 10, 19);
  } else if (item.type === 'book') {
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(0, 4, 24, 22);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(2, 6, 20, 4);
    ctx.fillRect(2, 12, 20, 4);
  } else if (item.type === 'gym') {
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(0, 8, 6, 14);
    ctx.fillRect(6, 13, 14, 4);
    ctx.fillRect(20, 8, 6, 14);
  } else if (item.type === 'car') {
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(0, 8, 32, 12);
    ctx.fillRect(8, 2, 16, 8);
  } else if (item.type === 'rocket') {
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(4, 0, 16, 20);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(8, 6, 8, 6);
  }

  ctx.fillStyle = '#fde047';
  ctx.font = '9px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(item.label, 14, 38);
  ctx.restore();
}

function drawScenery() {
  ctx.strokeStyle = (gameState === STATE.CAREER_RUSH || gameState === STATE.CAREER_VICTORY) ? '#eab308' : '#535353';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(canvas.width, groundY);
  ctx.stroke();

  ctx.fillStyle = (gameState === STATE.CAREER_RUSH || gameState === STATE.CAREER_VICTORY) ? '#ca8a04' : '#737373';
  for (let p of groundParticles) {
    ctx.fillRect(p.x, groundY + p.y, p.size, 1);
  }

  if (gameState === STATE.CAREER_RUSH || gameState === STATE.CAREER_VICTORY) {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(80, groundY - 120, 50, 120);
    ctx.fillRect(160, groundY - 170, 70, 170);
    ctx.fillRect(260, groundY - 100, 40, 100);
    ctx.fillRect(340, groundY - 200, 80, 200);
    ctx.fillRect(460, groundY - 140, 60, 140);
    ctx.fillRect(560, groundY - 180, 70, 180);
    ctx.fillRect(670, groundY - 110, 50, 110);
    ctx.fillRect(750, groundY - 160, 70, 160);

    ctx.fillStyle = '#fbbf24';
    for (let bx = 90; bx < 850; bx += 28) {
      if ((bx + frameCount) % 36 < 18) {
        ctx.fillRect(bx, groundY - 90, 6, 8);
        ctx.fillRect(bx, groundY - 50, 6, 8);
      }
    }
  } else {
    ctx.fillStyle = '#d4d4d8';
    clouds.forEach(c => {
      ctx.fillRect(c.x, c.y, 40, 12);
      ctx.fillRect(c.x + 8, c.y - 6, 24, 6);
      ctx.fillRect(c.x + 14, c.y - 10, 12, 4);
    });
  }

  if (gameState === STATE.CHAPTER_CLOSED || gameState === STATE.RETREAT_TOWARDS_TREE || gameState === STATE.TREE_CRASH_DEATH) {
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.lineWidth = 1.5;
    raindrops.forEach(r => {
      ctx.beginPath();
      ctx.moveTo(r.x, r.y);
      ctx.lineTo(r.x - 3, r.y + 12);
      ctx.stroke();
    });
  }
}

function drawLuxuryFinale() {
  const lx = 480;
  const ly = groundY - 45;

  ctx.fillStyle = '#dc2626';
  ctx.fillRect(lx + 40, ly + 15, 120, 20);
  ctx.fillRect(lx + 60, ly + 2, 70, 16);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(lx + 70, ly + 4, 30, 12);
  ctx.fillRect(lx + 105, ly + 4, 20, 12);
  ctx.fillStyle = '#18181b';
  ctx.beginPath();
  ctx.arc(lx + 65, ly + 36, 10, 0, Math.PI * 2);
  ctx.arc(lx + 135, ly + 36, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 12px "Press Start 2P", monospace';
  ctx.fillText('★ DINO TOWER ★', lx + 20, ly - 70);
}

// =================== LOGIC & UPDATES ===================

function initScenery() {
  clouds = [
    { x: 120, y: 40 },
    { x: 380, y: 60 },
    { x: 620, y: 35 },
    { x: 840, y: 55 }
  ];

  groundParticles = [];
  for (let i = 0; i < 40; i++) {
    groundParticles.push({
      x: Math.random() * canvas.width,
      y: Math.floor(Math.random() * 24) + 4,
      size: Math.floor(Math.random() * 4) + 2
    });
  }

  raindrops = [];
  for (let i = 0; i < 60; i++) {
    raindrops.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 6 + 8
    });
  }
}

function resetGame() {
  score = 0;
  distance = 0;
  gameSpeed = 6.0;
  gameState = STATE.RUNNING;
  obstacles = [];
  careerItems = [];
  floatingTexts = [];
  confetti = [];
  splinters = [];
  loveHearts = [];
  careerCollectiblesCount = 0;
  screenShake = 0;
  heartbreakTimer = 0;
  optionsAvailable = false;

  dino.x = 140;
  dino.y = groundY - dino.h;
  dino.vy = 0;
  dino.isGrounded = true;
  dino.isDucking = false;
  dino.isSigma = false;
  dino.hasRose = false;
  dino.isCollapsed = false;
  dino.facingLeft = false;
  dino.tears = [];

  cheatingCouple.active = false;
  cheatingCouple.x = canvas.width + 100;
  cheatingCouple.y = groundY - 47;
  cheatingCouple.vx = 0;
  cheatingCouple.vy = 0;
  cheatingCouple.rotation = 0;
  cheatingCouple.isFlyingAway = false;

  backTree.active = false;
  backTree.x = -120;
  rosePickup.active = false;

  gameContainer.className = '';
  reelCaption.classList.add('hidden');
  storyControlsHud.classList.add('hidden');
  storyControlsHud.classList.remove('fade-in-slide');
  sound.stopSadBGM();
  sound.stopSigmaPhonk();

  hudModeBadge.textContent = 'RUNNING FOR LOVE 🌹';
  hudModeBadge.style.display = 'inline-block';

  hideAllOverlays();
  initScenery();
}

function hideAllOverlays() {
  [startOverlay, chapterClosedOverlay, careerVictoryOverlay, gameoverOverlay, storyControlsHud].forEach(el => {
    if (el) {
      el.classList.add('hidden');
      el.style.display = 'none';
    }
  });
}

function showOverlay(el, displayType = 'flex') {
  if (el) {
    el.classList.remove('hidden');
    el.style.display = displayType;
  }
}

function handleObstacleSpawning() {
  if (score >= 920 || cheatingCouple.active) return;

  // Rose appears at score 800 - dino picks it up and runs 200 points with rose to 1000
  if (score >= 800 && !rosePickup.active && !dino.hasRose) {
    rosePickup.active = true;
    rosePickup.x = canvas.width + 80;
    rosePickup.y = groundY - 26;
  }

  if (obstacles.length === 0 || (canvas.width - obstacles[obstacles.length - 1].x > (240 + Math.random() * 180))) {
    const r = Math.random();
    if (score > 350 && r < 0.28) {
      obstacles.push({
        type: 'bird',
        x: canvas.width + 20,
        y: groundY - (Math.random() > 0.5 ? 55 : 30),
        w: 28,
        h: 22,
        frame: 0
      });
    } else {
      let cType = 'small';
      let w = 18;
      let h = 32;
      if (r > 0.65) {
        cType = 'triple';
        w = 34;
        h = 36;
      } else if (r > 0.35) {
        cType = 'large';
        w = 22;
        h = 40;
      }
      obstacles.push({
        type: cType,
        x: canvas.width + 20,
        y: groundY - h,
        w: w,
        h: h
      });
    }
  }
}

function handleCareerItemSpawning() {
  if (careerItems.length === 0 || (canvas.width - careerItems[careerItems.length - 1].x > 160)) {
    const itemPool = [
      { type: 'briefcase', label: 'TECH JOB +$50k' },
      { type: 'crypto', label: 'BITCOIN +$100k' },
      { type: 'book', label: 'SKILLS +IQ' },
      { type: 'gym', label: 'SIGMA GYM +AURA' },
      { type: 'car', label: 'SUPERCAR +SPEED' },
      { type: 'rocket', label: 'STARTUP IPO +$1M' }
    ];
    const item = itemPool[Math.floor(Math.random() * itemPool.length)];
    careerItems.push({
      ...item,
      x: canvas.width + 30,
      y: groundY - (Math.random() > 0.4 ? 40 : 80),
      w: 28,
      h: 28
    });
  }
}

// MAIN UPDATE LOOP
function update() {
  frameCount++;

  if (screenShake > 0) screenShake--;

  if (gameState === STATE.RUNNING || gameState === STATE.CAREER_RUSH) {
    clouds.forEach(c => {
      c.x -= gameSpeed * 0.2;
      if (c.x < -60) c.x = canvas.width + 40;
    });

    groundParticles.forEach(p => {
      p.x -= gameSpeed;
      if (p.x < -10) p.x = canvas.width + 10;
    });
  }

  if (!dino.isGrounded && !dino.isCollapsed) {
    dino.vy += dino.gravity;
    dino.y += dino.vy;

    if (dino.y >= groundY - dino.h) {
      dino.y = groundY - dino.h;
      dino.vy = 0;
      dino.isGrounded = true;
    }
  }

  // ================= STATE MACHINE =================

  if (gameState === STATE.RUNNING) {
    distance += gameSpeed;
    score = Math.floor(distance / 10);

    if (gameSpeed < 10) gameSpeed += 0.0006;

    // Rose Pickup at score 800
    if (rosePickup.active && !dino.hasRose) {
      rosePickup.x -= gameSpeed;
      if (dino.x + dino.w > rosePickup.x && dino.x < rosePickup.x + rosePickup.w) {
        dino.hasRose = true;
        rosePickup.active = false;
        sound.playCollect();
        hudModeBadge.textContent = '🌹 RUNNING TO HER (+200 SCORE) 💕';
        floatingTexts.push({
          text: '🌹 প্রেমিকার জন্য লাল গোলাপ নিলাম! (+200 স্কোর চলো) ❤️',
          x: dino.x,
          y: dino.y - 25,
          alpha: 1,
          color: '#ec4899'
        });
      }
    }

    // Floating love hearts while running with rose
    if (dino.hasRose) {
      if (frameCount % 18 === 0) {
        loveHearts.push({
          x: dino.x + 50,
          y: dino.y + 6,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -1.3 - Math.random() * 0.7,
          alpha: 1
        });
      }
    }

    handleObstacleSpawning();

    for (let i = obstacles.length - 1; i >= 0; i--) {
      let obs = obstacles[i];
      obs.x -= gameSpeed;
      if (obs.type === 'bird' && frameCount % 12 === 0) obs.frame++;

      const pad = 6;
      if (
        dino.x + pad < obs.x + obs.w &&
        dino.x + dino.w - pad > obs.x &&
        dino.y + pad < obs.y + obs.h &&
        dino.y + dino.h - pad > obs.y
      ) {
        sound.playCrash();
        gameState = STATE.GAME_OVER;
        gameoverScore.textContent = score;
        showOverlay(gameoverOverlay);
        return;
      }

      if (obs.x < -60) obstacles.splice(i, 1);
    }

    // At score 930+: Cheating couple appears in the distance ahead!
    if (score >= 930 && !cheatingCouple.active) {
      cheatingCouple.active = true;
      cheatingCouple.x = canvas.width + 160;
      cheatingCouple.y = groundY - 47;
      backTree.active = true;
      backTree.x = -160;
    }

    // Scroll couple and backTree towards their spots as dino runs
    if (cheatingCouple.active) {
      if (cheatingCouple.x > canvas.width - 150) {
        cheatingCouple.x -= gameSpeed;
      }
      if (backTree.x < 25) {
        backTree.x += gameSpeed * 0.4;
        if (backTree.x > 25) backTree.x = 25;
      }
    }

    // Reach 1000: Dino gets close, smoothly slows down to a stop, drops the rose, and cutscene triggers!
    if (score >= 1000 && cheatingCouple.active) {
      if (gameSpeed > 0.4) {
        gameSpeed *= 0.92;
      } else {
        gameSpeed = 0;
        gameState = STATE.HEARTBREAK_PAUSE;
        heartbreakTimer = 0;
        optionsAvailable = false;
        cheatingCouple.x = Math.min(canvas.width - 120, Math.max(260, canvas.width * 0.8));
        backTree.x = 25;
        obstacles = [];
        loveHearts = [];
        reelCaption.classList.remove('hidden');
        storyControlsHud.classList.add('hidden');
        storyControlsHud.classList.remove('fade-in-slide');

        clouds = [
          { x: canvas.width / 2 - 35, y: 72 },
          { x: 90, y: 50 },
          { x: canvas.width - 100, y: 55 }
        ];

        dino.hasRose = false;
        sound.startSadBGM();
        gameContainer.classList.add('sad-theme');
        hudModeBadge.textContent = 'BETRAYAL 💔';
      }
    }
  }

  // 1. STANDING IN SHOCK & HELPLESSNESS (age dekhbe, koshto pabe, sad bg bajbe, then option asbe)
  else if (gameState === STATE.HEARTBREAK_PAUSE) {
    heartbreakTimer++;

    // Stage 1 (0-1.5 sec): Frozen in shock & disbelief looking at the couple kissing
    if (heartbreakTimer === 25) {
      floatingTexts.push({
        text: '💔 এ কি দেখছি...',
        x: dino.x,
        y: dino.y - 25,
        alpha: 1,
        color: '#f87171'
      });
    }

    // Stage 2 (1.5-3.5 sec): Rose drops, tears start flowing heavily, feeling completely helpless
    if (heartbreakTimer >= 60) {
      if (frameCount % 4 === 0) {
        dino.tears.push({ x: 38, y: 10 });
      }
    }
    dino.tears.forEach(t => t.y += 1.8);

    if (heartbreakTimer === 95) {
      floatingTexts.push({
        text: '🥀 নিজেকে বড্ড নিঃস্ব ও অসহায় লাগছে...',
        x: dino.x - 10,
        y: dino.y - 30,
        alpha: 1,
        color: '#cbd5e1'
      });
    }

    // Stage 3 (After ~3.5 seconds / frame 190): Show options smoothly at TOP
    if (heartbreakTimer === 190 && !optionsAvailable) {
      optionsAvailable = true;
      showOverlay(storyControlsHud, 'flex');
      storyControlsHud.classList.add('fade-in-slide');

      floatingTexts.push({
        text: '⚖️ এখন তোমার সিদ্ধান্ত...',
        x: dino.x + 10,
        y: dino.y - 45,
        alpha: 1,
        color: '#fbbf24'
      });
    }
  }

  // 2. PLAYER PRESSED < : DINO TRIES TO BACK AWAY BUT CRASHES INTO TREE & DIES!
  else if (gameState === STATE.RETREAT_TOWARDS_TREE) {
    dino.x -= 3.2;
    dino.facingLeft = true;

    if (frameCount % 4 === 0) {
      dino.tears.push({ x: 38, y: 10 });
    }
    dino.tears.forEach(t => t.y += 2);

    if (dino.x <= backTree.x + 45) {
      gameState = STATE.TREE_CRASH_DEATH;
      sound.playCrash();
      screenShake = 24;
      dino.isCollapsed = true;

      for (let i = 0; i < 35; i++) {
        splinters.push({
          x: backTree.x + 35,
          y: groundY - 20,
          vx: (Math.random() - 0.5) * 10,
          vy: -Math.random() * 9,
          color: '#3f3f46'
        });
      }

      setTimeout(() => {
        gameState = STATE.CHAPTER_CLOSED;
        showOverlay(chapterClosedOverlay);
      }, 1400);
    }
  }

  // 3. TREE CRASH HIT (DEATH)
  else if (gameState === STATE.TREE_CRASH_DEATH || gameState === STATE.CHAPTER_CLOSED) {
    splinters.forEach(s => {
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.35;
    });

    raindrops.forEach(r => {
      r.y += r.speed;
      if (r.y > canvas.height) {
        r.y = -10;
        r.x = Math.random() * canvas.width;
      }
    });
  }

  // 4. PLAYER PRESSED C / FORWARD : NO KILLING, DINO CHOOSES LIFE & RUNS FORWARD PAST THEM!
  else if (gameState === STATE.MOVE_FORWARD_CAREER) {
    dino.facingLeft = false;
    dino.isSigma = true;
    
    // Dino advances forward while world/couple smoothly scroll backward into the past
    cheatingCouple.x -= 8;
    backTree.x -= 8;
    
    // Clouds & particles scroll
    clouds.forEach(c => c.x -= 2);
    groundParticles.forEach(p => p.x -= 8);

    // Once the cheating couple has scrolled off screen behind
    if (cheatingCouple.x < -140) {
      gameState = STATE.CAREER_RUSH;
      cheatingCouple.active = false;
      backTree.active = false;
      dino.x = 60;

      gameContainer.className = 'sigma-theme';
      hudModeBadge.textContent = '👑 SIGMA EMPIRE RUSH';
      sound.startSigmaPhonk();

      floatingTexts.push({
        text: '🔥 FUTURE IS BRIGHT! 💼🚀',
        x: dino.x + 20,
        y: dino.y - 30,
        alpha: 1,
        color: '#fbbf24'
      });
    }
  }

  // 6. CAREER RUSH (SIGMA CHAD EMPIRE BUILD)
  else if (gameState === STATE.CAREER_RUSH) {
    gameSpeed = 13;
    distance += gameSpeed * 5;
    score = Math.floor(distance);

    handleCareerItemSpawning();

    for (let i = careerItems.length - 1; i >= 0; i--) {
      let item = careerItems[i];
      item.x -= gameSpeed;

      if (
        dino.x < item.x + item.w &&
        dino.x + dino.w > item.x &&
        dino.y < item.y + item.h &&
        dino.y + dino.h > item.y
      ) {
        sound.playCollect();
        careerCollectiblesCount++;
        floatingTexts.push({
          text: `+${item.label}`,
          x: dino.x + 10,
          y: dino.y - 25,
          alpha: 1,
          color: '#fbbf24'
        });
        careerItems.splice(i, 1);
      } else if (item.x < -60) {
        careerItems.splice(i, 1);
      }
    }

    if (careerCollectiblesCount >= 14) {
      gameState = STATE.CAREER_VICTORY;
      sound.stopSigmaPhonk();
      sound.playVictory();
      showOverlay(careerVictoryOverlay);
    }
  }

  // 7. CAREER VICTORY FINALE
  else if (gameState === STATE.CAREER_VICTORY) {
    if (confetti.length < 80) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: -10,
        size: Math.random() * 6 + 4,
        color: ['#fbbf24', '#ef4444', '#3b82f6', '#10b981', '#a855f7'][Math.floor(Math.random() * 5)],
        vy: Math.random() * 3 + 2,
        vx: (Math.random() - 0.5) * 2
      });
    }
    confetti.forEach(c => {
      c.y += c.vy;
      c.x += c.vx;
    });
  }

  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    let ft = floatingTexts[i];
    ft.y -= 0.8;
    ft.alpha -= 0.02;
    if (ft.alpha <= 0) floatingTexts.splice(i, 1);
  }

  for (let i = loveHearts.length - 1; i >= 0; i--) {
    let h = loveHearts[i];
    h.x += h.vx;
    h.y += h.vy;
    h.alpha -= 0.02;
    if (h.alpha <= 0) loveHearts.splice(i, 1);
  }

  // HUD Score Formatting (999999999999999... as in screenshot)
  if (gameState === STATE.CAREER_RUSH) {
    hudCurrentScore.textContent = '99999999' + Math.floor(score % 999999);
  } else {
    hudCurrentScore.textContent = String(score).padStart(5, '0');
    if (score > highScore) {
      highScore = score;
      hudHighScore.textContent = String(highScore).padStart(5, '0');
    }
  }
}

// RENDER LOOP
function draw() {
  ctx.save();

  if (screenShake > 0) {
    const sx = (Math.random() - 0.5) * screenShake * 1.5;
    const sy = (Math.random() - 0.5) * screenShake * 1.5;
    ctx.translate(sx, sy);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawScenery();

  // Floating Rose Pickup
  if (rosePickup.active && !dino.hasRose) {
    const floatY = Math.sin(Date.now() * 0.008) * 4;
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(rosePickup.x + 4, rosePickup.y + floatY, 16, 16);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(rosePickup.x + 8, rosePickup.y + 4 + floatY, 8, 8);
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(rosePickup.x + 8, rosePickup.y + 16 + floatY, 6, 8);
  }

  // Love Hearts while running with rose
  loveHearts.forEach(h => {
    ctx.save();
    ctx.globalAlpha = h.alpha;
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(h.x + 1, h.y, 2, 2);
    ctx.fillRect(h.x + 5, h.y, 2, 2);
    ctx.fillRect(h.x, h.y + 2, 8, 3);
    ctx.fillRect(h.x + 2, h.y + 5, 4, 2);
    ctx.fillRect(h.x + 3, h.y + 7, 2, 2);
    ctx.restore();
  });

  // Dropped Rose on Ground 🥀
  if (gameState === STATE.HEARTBREAK_PAUSE || gameState === STATE.RETREAT_TOWARDS_TREE || gameState === STATE.TREE_CRASH_DEATH || gameState === STATE.CHAPTER_CLOSED) {
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(dino.x + 35, groundY - 6, 14, 6);
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(dino.x + 28, groundY - 4, 7, 3);
  }

  // Iconic Reel 9s Wall in the Sky during Heartbreak scene (as in the screenshot!)
  if (gameState === STATE.HEARTBREAK_PAUSE || gameState === STATE.RETREAT_TOWARDS_TREE || gameState === STATE.TREE_CRASH_DEATH) {
    ctx.save();
    ctx.fillStyle = '#535353';
    const fontSize = Math.max(9, Math.min(14, Math.floor(canvas.width / 42)));
    ctx.font = 'bold ' + fontSize + 'px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    const charWidth = fontSize * 1.15;
    const repeatCount = Math.max(Math.floor(canvas.width / charWidth), 18);
    const line9s = '9'.repeat(repeatCount);
    ctx.fillText(line9s, canvas.width / 2, fontSize * 2.3);
    ctx.fillText('999999999', canvas.width / 2, fontSize * 3.9);
    ctx.restore();
  }

  // Back Tree for retreat crash
  if (backTree.active) {
    drawDeadTree(backTree.x, groundY - backTree.h, backTree.w, backTree.h);
  }

  // Obstacles
  obstacles.forEach(obs => {
    if (obs.type === 'bird') {
      drawPterodactyl(obs.x, obs.y, obs.frame);
    } else {
      drawCactus(obs.x, obs.y, obs.type);
    }
  });

  // Career Rush Items
  careerItems.forEach(item => {
    drawCareerItem(item);
  });

  // Cheating Couple
  if (cheatingCouple.active) {
    drawCheatingCouple(cheatingCouple);
  }

  // Splinters
  splinters.forEach(s => {
    ctx.fillStyle = s.color;
    ctx.fillRect(s.x, s.y, 4, 4);
  });

  // Finale Luxury Setting
  if (gameState === STATE.CAREER_VICTORY) {
    drawLuxuryFinale();
    confetti.forEach(c => {
      ctx.fillStyle = c.color;
      ctx.fillRect(c.x, c.y, c.size, c.size);
    });
  }

  // Dinosaur Player
  const isSigma = (gameState === STATE.CAREER_RUSH || gameState === STATE.CAREER_VICTORY || gameState === STATE.MOVE_FORWARD_CAREER);
  const legStep = Math.floor(frameCount / 4);
  drawDinoSprite(dino.x, dino.y, isSigma, dino.hasRose, dino.isDucking, legStep, dino.isCollapsed, dino.facingLeft);

  // Floating Labels
  floatingTexts.forEach(ft => {
    ctx.save();
    ctx.fillStyle = ft.color || '#ef4444';
    ctx.font = 'bold 12px "Hind Siliguri", sans-serif';
    ctx.globalAlpha = ft.alpha;
    ctx.fillText(ft.text, ft.x, ft.y);
    ctx.restore();
  });

  ctx.restore();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// =================== < (DIE) & C (CAREER) CONTROLS ===================

// Pressed < : Back away in grief & crash into tree
function triggerBackDeath() {
  if (gameState === STATE.HEARTBREAK_PAUSE && optionsAvailable) {
    gameState = STATE.RETREAT_TOWARDS_TREE;
    storyControlsHud.classList.add('hidden');
    reelCaption.classList.add('hidden');
    sound.stopSadBGM();

    floatingTexts.push({
      text: '💔 আর বেঁচে থেকে কি লাভ...',
      x: dino.x,
      y: dino.y - 20,
      alpha: 1,
      color: '#ef4444'
    });
  }
}

// Pressed C : Advance forward past them & build career empire!
function triggerCareerRush() {
  if (gameState === STATE.HEARTBREAK_PAUSE && optionsAvailable) {
    gameState = STATE.MOVE_FORWARD_CAREER;
    storyControlsHud.classList.add('hidden');
    reelCaption.classList.add('hidden');
    sound.stopSadBGM();

    floatingTexts.push({
      text: '✨ অতীত ভুলে সামনে চলি! 💼🔥',
      x: dino.x,
      y: dino.y - 20,
      alpha: 1,
      color: '#f59e0b'
    });
  }
}

function jump() {
  if (gameState === STATE.START || gameState === STATE.GAME_OVER) {
    resetGame();
    dino.vy = dino.jumpPower;
    dino.isGrounded = false;
    sound.playJump();
    return;
  }
  if (dino.isGrounded && (gameState === STATE.RUNNING || gameState === STATE.CAREER_RUSH)) {
    dino.vy = dino.jumpPower;
    dino.isGrounded = false;
    sound.playJump();
  }
}

function duck(isDucking) {
  if (gameState === STATE.RUNNING || gameState === STATE.CAREER_RUSH) {
    dino.isDucking = isDucking;
    dino.h = isDucking ? 30 : 47;
  }
}

// Event Listeners
if (btnKeyBack) btnKeyBack.addEventListener('click', triggerBackDeath);
if (btnKeyCareer) btnKeyCareer.addEventListener('click', triggerCareerRush);

if (btnSkipRose) {
  btnSkipRose.addEventListener('click', () => {
    if (gameState !== STATE.RUNNING) {
      resetGame();
    }
    score = 770;
    distance = 770 * 10;
    gameSpeed = 6.2;
    dino.hasRose = false;
    rosePickup.active = true;
    rosePickup.x = canvas.width + 120;
    rosePickup.y = groundY - 26;
    obstacles = [];
    cheatingCouple.active = false;
    backTree.active = false;
  });
}

if (btnSkip) {
  btnSkip.addEventListener('click', () => {
    if (gameState !== STATE.RUNNING) {
      resetGame();
    }
    score = 920;
    distance = 920 * 10;
    gameSpeed = 6.2;
    dino.hasRose = true;
    obstacles = [];
    cheatingCouple.active = false;
    backTree.active = false;
  });
}

if (startOverlay) {
  startOverlay.addEventListener('click', () => {
    resetGame();
  });
}

if (btnStart) {
  btnStart.addEventListener('click', (e) => {
    e.stopPropagation();
    resetGame();
  });
}

if (btnRestartNormal) btnRestartNormal.addEventListener('click', resetGame);
if (btnRestartDie) btnRestartDie.addEventListener('click', resetGame);
if (btnRestartWin) btnRestartWin.addEventListener('click', resetGame);

if (btnFullscreen) {
  btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      if (gameContainer && gameContainer.requestFullscreen) {
        gameContainer.requestFullscreen();
      } else if (gameContainer && gameContainer.webkitRequestFullscreen) {
        gameContainer.webkitRequestFullscreen();
      }
      btnFullscreen.textContent = '✕';
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      btnFullscreen.textContent = '⛶';
    }
    setTimeout(resizeCanvas, 100);
  });
}

if (btnSound) {
  btnSound.addEventListener('click', () => {
    sound.muted = !sound.muted;
    btnSound.textContent = sound.muted ? '🔇' : '🔊';
    if (sound.muted) {
      sound.stopSadBGM();
      sound.stopSigmaPhonk();
    } else {
      if (gameState === STATE.CAREER_RUSH) sound.startSigmaPhonk();
      else if (gameState === STATE.HEARTBREAK_PAUSE) sound.startSadBGM();
    }
  });
}

if (btnTouchJump) {
  btnTouchJump.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (gameState === STATE.START) resetGame();
    else if (gameState === STATE.HEARTBREAK_PAUSE) {
      if (optionsAvailable) triggerCareerRush();
    } else jump();
  });
  btnTouchJump.addEventListener('mousedown', () => {
    if (gameState === STATE.START) resetGame();
    else if (gameState === STATE.HEARTBREAK_PAUSE) {
      if (optionsAvailable) triggerCareerRush();
    } else jump();
  });
}

if (btnTouchDuck) {
  btnTouchDuck.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (gameState === STATE.HEARTBREAK_PAUSE) {
      if (optionsAvailable) triggerBackDeath();
    } else duck(true);
  });
  btnTouchDuck.addEventListener('touchend', (e) => { e.preventDefault(); duck(false); });
  btnTouchDuck.addEventListener('mousedown', () => {
    if (gameState === STATE.HEARTBREAK_PAUSE) {
      if (optionsAvailable) triggerBackDeath();
    } else duck(true);
  });
  btnTouchDuck.addEventListener('mouseup', () => duck(false));
}

if (canvas) {
  canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    if (gameState === STATE.START) {
      resetGame();
    } else if (gameState === STATE.HEARTBREAK_PAUSE) {
      if (optionsAvailable) triggerCareerRush();
    } else {
      jump();
    }
  });
}

// Keyboard
window.addEventListener('keydown', (e) => {
  if (gameState === STATE.START) {
    e.preventDefault();
    resetGame();
    return;
  }
  
  if (gameState === STATE.HEARTBREAK_PAUSE) {
    if (!optionsAvailable) return;
    // If player presses < (Comma/Less-than), ArrowLeft, A, Backspace
    if (e.code === 'Comma' || e.code === 'ArrowLeft' || e.code === 'KeyA' || e.code === 'Backspace' || e.key === '<') {
      e.preventDefault();
      triggerBackDeath();
    }
    // If player presses C, Space, ArrowRight, KeyD, Enter
    else if (e.code === 'KeyC' || e.code === 'Space' || e.code === 'ArrowRight' || e.code === 'KeyD' || e.code === 'Enter') {
      e.preventDefault();
      triggerCareerRush();
    }
  } else {
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Enter') {
      e.preventDefault();
      jump();
    } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
      e.preventDefault();
      duck(true);
    }
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowDown' || e.code === 'KeyS') {
    duck(false);
  }
});

function resizeCanvas() {
  const wrapper = document.getElementById('canvas-wrapper');
  if (wrapper) {
    const rect = wrapper.getBoundingClientRect();
    canvas.width = Math.max(Math.floor(rect.width), 320);
    canvas.height = Math.max(Math.floor(rect.height), 180);
    groundY = Math.floor(canvas.height - 35);
    if (dino.isGrounded && !dino.isCollapsed) {
      dino.y = groundY - dino.h;
    }
    if (cheatingCouple.active && !cheatingCouple.isFlyingAway) {
      cheatingCouple.y = groundY - 47;
    }
  }
}
window.addEventListener('resize', resizeCanvas);
window.addEventListener('orientationchange', () => setTimeout(resizeCanvas, 150));
resizeCanvas();
initScenery();
resetGame();
gameLoop();
