let state = "INIT"; // INIT, START, PLAY, GAMEOVER
let countdownTimer = 3;
let lastTick = 0;
let gameOverTime = 0;
let winner = "";

let p1, p2;
let sparks = [];

// Audio variables (Removed sfxStart)
let sfxJump, sfxHit, sfxGameOver, bgMusic;

function preload() {
  // IMPORTANT: Make sure your 4 files are named EXACTLY like this in your folder.
  // Delete the /* and */ once your files are in the folder!
  /*
  sfxJump = loadSound('jump.mp3');
  sfxHit = loadSound('hit.mp3');
  sfxGameOver = loadSound('gameover.mp3');
  bgMusic = loadSound('music.mp3');
  */
}

function setup() {
  createCanvas(800, 500);
  noSmooth(); // Forces a pixelated, sharp look
  outputVolume(0.8); // Ensures p5 is outputting audio at 80% volume

  // Initialize Fighters (x, y, color, controls)
  p1 = new Fighter(200, 400, color(0, 166, 255), {
    left: 65,
    right: 68,
    jump: 87,
    punch: 70,
  }); // WASD + F
  p2 = new Fighter(600, 400, color(255, 115, 0), {
    left: 37,
    right: 39,
    jump: 38,
    punch: 191,
  }); // Arrows + /
  p2.facing = -1; // P2 faces left initially

  // Notice we REMOVED the bgMusic from setup. It must trigger after the click!
}

function draw() {
  drawAtmosphere();

  if (state === "INIT") {
    // 1. CLICK TO START SCREEN
    p1.draw();
    p2.draw();

    fill(0, 150);
    rect(0, 0, width, height);

    fill(255);
    textAlign(CENTER, CENTER);
    textFont("monospace");
    textSize(30);

    if (frameCount % 60 < 30) {
      text("CLICK ANYWHERE TO INITIATE TEST", width / 2, height / 2);
    }
  } else if (state === "START") {
    // 2. COUNTDOWN SCREEN
    p1.draw();
    p2.draw();
    drawCountdown();
  } else if (state === "PLAY") {
    // 3. MAIN GAMEPLAY LOOP
    handleCombat();

    p1.update();
    p2.update();
    p1.draw();
    p2.draw();

    drawHUD();
    updateSparks();
  } else if (state === "GAMEOVER") {
    // 4. GAME OVER SCREEN
    p1.draw();
    p2.draw();
    drawGameOver();
  }
}

// --- AUDIO UNLOCK PROTOCOL ---
function mousePressed() {
  if (state === "INIT") {
    userStartAudio(); // Force unlock browser audio

    // Play music ONLY AFTER the user clicks
    if (bgMusic && !bgMusic.isPlaying()) {
      bgMusic.loop();
    }

    state = "START";
    lastTick = millis();
  }
}

// --- GAME ENVIRONMENTS ---
function drawAtmosphere() {
  background(20, 22, 24);

  stroke(40, 45, 48);
  strokeWeight(2);
  for (let i = 0; i < width; i += 50) {
    line(i, 0, i, height);
  }
  for (let i = 0; i < height; i += 50) {
    line(0, i, width, i);
  }

  fill(30, 32, 35);
  noStroke();
  rect(150, 100, 200, 300);
  rect(450, 100, 200, 300);
  fill(15);
  rect(160, 110, 180, 290);
  rect(460, 110, 180, 290);

  fill(50, 55, 60);
  rect(0, 400, width, 100);
  fill(35, 40, 45);
  rect(0, 420, width, 80);
}

function drawCountdown() {
  fill(0, 150);
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER, CENTER);
  textFont("monospace");
  textSize(80);

  if (millis() - lastTick > 1000) {
    countdownTimer--;
    lastTick = millis();
    // Removed sfxStart logic from here entirely
  }

  if (countdownTimer > 0) {
    text(countdownTimer, width / 2, height / 2);
  } else {
    text("GO!", width / 2, height / 2);
    if (millis() - lastTick > 800) {
      state = "PLAY";
    }
  }
}

function drawHUD() {
  noStroke();
  fill(50);
  rect(50, 30, 200, 20);
  fill(0, 166, 255);
  rect(50, 30, map(p1.health, 0, 6, 0, 200), 20);

  fill(50);
  rect(550, 30, 200, 20);
  fill(255, 115, 0);
  let p2w = map(p2.health, 0, 6, 0, 200);
  rect(550 + (200 - p2w), 30, p2w, 20);
}

function drawGameOver() {
  fill(0, 180);
  rect(0, 0, width, height);

  textAlign(CENTER, CENTER);
  textFont("monospace");

  fill(255);
  textSize(60);
  text("TEST CONCLUDED", width / 2, height / 2 - 40);

  textSize(30);
  let winColor =
    winner === "PLAYER 1" ? color(0, 166, 255) : color(255, 115, 0);
  fill(winColor);
  text(winner + " SURVIVES", width / 2, height / 2 + 20);

  if (millis() - gameOverTime > 2000) {
    if (frameCount % 60 < 30) {
      fill(255);
      textSize(20);
      text("PRESS [R] TO RESTART PROTOCOL", width / 2, height / 2 + 90);
    }
  }
}

// --- COMBAT LOGIC ---
function handleCombat() {
  if (p1.isPunching && p1.punchFrame === 5) {
    if (
      abs(p1.x - p2.x) < 80 &&
      abs(p1.y - p2.y) < 50 &&
      p1.facing === (p2.x > p1.x ? 1 : -1)
    ) {
      p2.takeDamage();
      createSparks(p2.x, p2.y - 30, color(255, 115, 0));
    }
  }

  if (p2.isPunching && p2.punchFrame === 5) {
    if (
      abs(p2.x - p1.x) < 80 &&
      abs(p1.y - p2.y) < 50 &&
      p2.facing === (p1.x > p2.x ? 1 : -1)
    ) {
      p1.takeDamage();
      createSparks(p1.x, p1.y - 30, color(0, 166, 255));
    }
  }
}

function keyPressed() {
  if (state === "PLAY") {
    if (keyCode === p1.controls.punch && !p1.isPunching) p1.punch();
    if (keyCode === p2.controls.punch && !p2.isPunching) p2.punch();

    if (keyCode === p1.controls.jump && p1.y === 400) {
      p1.vy = -12;
      if (sfxJump && sfxJump.isLoaded()) sfxJump.play();
    }
    if (keyCode === p2.controls.jump && p2.y === 400) {
      p2.vy = -12;
      if (sfxJump && sfxJump.isLoaded()) sfxJump.play();
    }
  }

  if (state === "GAMEOVER" && millis() - gameOverTime > 2000) {
    if (key === "r" || key === "R") {
      resetGame();
    }
  }
}

function resetGame() {
  p1.health = 6;
  p2.health = 6;
  p1.x = 200;
  p2.x = 600;
  p1.y = 400;
  p2.y = 400;
  countdownTimer = 3;
  state = "INIT";

  // Stop music when resetting to click screen, it restarts on click
  if (bgMusic && bgMusic.isPlaying()) bgMusic.stop();
}

// ============================================================
// THE FIGHTER CLASS
// ============================================================
class Fighter {
  constructor(x, y, themeColor, controls) {
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.themeColor = themeColor;
    this.facing = 1;
    this.controls = controls;
    this.health = 6;
    this.isPunching = false;
    this.punchFrame = 0;
    this.isHit = false;
    this.hitTimer = 0;
  }

  update() {
    this.handleInput();
    this.applyPhysics();
    this.updateAnimations();
  }

  handleInput() {
    if (!this.isPunching && !this.isHit) {
      if (keyIsDown(this.controls.left)) {
        this.x -= 5;
        this.facing = -1;
      }
      if (keyIsDown(this.controls.right)) {
        this.x += 5;
        this.facing = 1;
      }
    }
  }

  applyPhysics() {
    this.vy += 0.6;
    this.y += this.vy;
    if (this.y > 400) {
      this.y = 400;
      this.vy = 0;
    }
    this.x = constrain(this.x, 20, width - 20);
  }

  updateAnimations() {
    if (this.isPunching) {
      this.punchFrame++;
      if (this.punchFrame > 15) {
        this.isPunching = false;
        this.punchFrame = 0;
      }
    }
    if (this.isHit) {
      this.hitTimer--;
      if (this.hitTimer <= 0) this.isHit = false;
    }
  }

  punch() {
    this.isPunching = true;
    this.punchFrame = 0;
  }

  takeDamage() {
    if (!this.isHit) {
      this.health--;
      this.isHit = true;
      this.hitTimer = 20;
      if (sfxHit && sfxHit.isLoaded()) sfxHit.play();

      if (this.health <= 0) {
        state = "GAMEOVER";
        winner = this === p1 ? "PLAYER 2" : "PLAYER 1";
        gameOverTime = millis();

        if (bgMusic && bgMusic.isPlaying()) bgMusic.stop(); // Stop music on game over
        if (sfxGameOver && sfxGameOver.isLoaded()) sfxGameOver.play();
      }
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    scale(this.facing, 1);
    rectMode(CENTER);
    noStroke();

    if (this.isHit && frameCount % 4 < 2) {
      fill(255);
    } else {
      fill(200);
    }

    rect(0, -30, 30, 40); // Torso
    rect(0, -60, 20, 20); // Head

    fill(this.themeColor);
    rect(0, -60, 8, 8); // Eye
    rect(-10, -30, 4, 30); // Armor

    fill(150);
    if (this.isPunching) {
      rect(25, -35, 40, 10);
      fill(this.themeColor);
      rect(45, -35, 15, 15);
    } else {
      rect(5, -25, 10, 30);
    }

    fill(100);
    if (this.y < 400) {
      rect(-10, -5, 10, 15);
      rect(10, -10, 10, 15);
    } else {
      rect(-10, 0, 10, 20);
      rect(10, 0, 10, 20);
    }
    pop();
  }
}

// --- PARTICLE SYSTEM ---
function createSparks(x, y, c) {
  for (let i = 0; i < 15; i++) {
    sparks.push({
      x: x,
      y: y,
      vx: random(-5, 5),
      vy: random(-5, 2),
      life: 255,
      c: c,
    });
  }
}

function updateSparks() {
  for (let i = sparks.length - 1; i >= 0; i--) {
    let s = sparks[i];
    s.x += s.vx;
    s.y += s.vy;
    s.vy += 0.2;
    s.life -= 15;
    noStroke();
    fill(red(s.c), green(s.c), blue(s.c), s.life);
    rect(s.x, s.y, 4, 4);
    if (s.life <= 0) sparks.splice(i, 1);
  }
}
