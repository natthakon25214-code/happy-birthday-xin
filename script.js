/* ======================
   INTRO STORY
====================== */
function startStory() {
  document.getElementById("intro").classList.add("fade-out");
}

/* ======================
   ❤️ Hearts
====================== */
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (3 + Math.random() * 2) + "s";
  document.getElementById("hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 350);

/* ======================
   🎶 Music
====================== */
const music = document.getElementById("bgm");
const playBtn = document.querySelector(".play-btn");
let isPlaying = false;

function playMusic() {
  if (!isPlaying) {
    music.play();
    playBtn.innerText = "⏸️ หยุดเพลง";
  } else {
    music.pause();
    playBtn.innerText = "▶️ ลองกดดูสิที่รัก";
  }
  isPlaying = !isPlaying;
}

/* ======================
   🎉 Confetti
====================== */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const confetti = Array.from({ length: 120 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 6 + 4,
  speed: Math.random() * 2 + 1,
  color: `hsl(${Math.random() * 360},100%,70%)`
}));

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = c.color;
    ctx.fill();
    c.y += c.speed;
    if (c.y > canvas.height) c.y = -10;
  });
  requestAnimationFrame(drawConfetti);
}
drawConfetti();

/* ======================
   Slider auto
====================== */
const slider = document.getElementById("slider");
let index = 0;

setInterval(() => {
  index++;
  const max = slider.querySelectorAll(".slide").length;
  if (index >= max) index = 0;
  slider.scrollTo({
    left: slider.clientWidth * index,
    behavior: "smooth"
  });
}, 3000);

/* ======================
   Tap image
====================== */
document.querySelectorAll(".slide").forEach(slide => {
  slide.addEventListener("click", () => {
    slide.classList.add("show-love");
    setTimeout(() => slide.classList.remove("show-love"), 2000);
  });
});
