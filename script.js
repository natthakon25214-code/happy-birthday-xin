/* ======================
   ❤️ หัวใจลอย
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
setInterval(createHeart, 300);


/* ======================
   🎶 เพลง (เล่น / หยุด)
====================== */

const music = document.getElementById("bgm");
const playBtn = document.querySelector(".play-btn");
let isPlaying = false;



function playMusic() {
  if (!isPlaying) {
    music.play().then(() => {
      isPlaying = true;
      playBtn.innerText = "⏸️ หยุดเพลง";

      // สร้าง AudioContext แค่ครั้งแรก
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;

        source = audioContext.createMediaElementSource(music);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        dataArray = new Uint8Array(analyser.frequencyBinCount);
      }

      heartbeatActive = true;
      heartbeat(); // เริ่มเต้นหัวใจ
    });
  } else {
    music.pause();
    isPlaying = false;
    playBtn.innerText = "▶️ ลองกดดูสิที่รัก";
    heartbeatActive = false;
  }
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

const confetti = [];
for (let i = 0; i < 150; i++) {
  confetti.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    color: `hsl(${Math.random() * 360},100%,70%)`,
    speed: Math.random() * 2 + 1
  });
}

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
   🔄 Auto Slide (หยุดเมื่อปัด)
====================== */
const slider = document.getElementById("slider");
let index = 0;
let autoSlide = setInterval(nextSlide, 3000);

function nextSlide() {
  index++;
  const maxIndex = slider.querySelectorAll(".slide").length;
  if (index >= maxIndex) index = 0;

  slider.scrollTo({
    left: slider.clientWidth * index,
    behavior: "smooth"
  });
}

// หยุด auto เมื่อผู้ใช้แตะ
slider.addEventListener("touchstart", () => {
  clearInterval(autoSlide);
});


/* ======================
   💖 แตะรูปแล้วขึ้นข้อความ
====================== */
document.querySelectorAll(".slide").forEach(slide => {
  slide.addEventListener("click", () => {
    slide.classList.add("show-love");
    setTimeout(() => {
      slide.classList.remove("show-love");
    }, 2000);
  });
});
function heartbeat() {
  if (!heartbeatActive) return;

  analyser.getByteFrequencyData(dataArray);

  // วัดความดังเฉลี่ย
  let sum = 0;
  for (let i = 0; i < dataArray.length; i++) {
    sum += dataArray[i];
  }
  const volume = sum / dataArray.length;

  // แปลงความดัง → scale
  const scale = 1 + volume / 300;

  // ทำให้หัวใจทุกดวงเต้น
  document.querySelectorAll(".heart").forEach(heart => {
    heart.style.transform = `scale(${scale})`;
  });

  requestAnimationFrame(heartbeat);
}
