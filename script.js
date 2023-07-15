
const toggleButton = document.getElementById('toggleButton');
const sectionContent = document.getElementById('sectionContent');
const c= document.getElementById("canvas")
const closeButton=document.getElementById("closeButton")

toggleButton.addEventListener('click', () => {
  if (sectionContent.style.display === 'none') {
    sectionContent.style.display = 'block';
    c.style.display='none'
  } else {
    sectionContent.style.display = 'none';
    c.style.display="block"
  }

  
});


closeButton.addEventListener('click',()=>{
  sectionContent.style.display = 'none';
  c.style.display="block"
})



const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX = 0;
let mouseY = 0;
let patternMode = false;

let points = [];

function activatePatternMode() {
 
  patternMode = true;
  
  clearCanvas();
  alert("Hover your mouse/hover on your touch screen to create or draw patterns")
}

function handleInput(x, y) {
  const rect = canvas.getBoundingClientRect();
  mouseX = x - rect.left;
  mouseY = y - rect.top;

  if (patternMode) {
    createPattern(mouseX, mouseY);
  }
}


function handleTouchEvent(e) {
  e.preventDefault();
  const touch = e.touches[0];
  handleInput(touch.clientX, touch.clientY);
}

function handleClickEvent(e) {
  handleInput(e.clientX, e.clientY);
}

canvas.addEventListener('mousemove', (e) => {
  handleInput(e.clientX, e.clientY);
});

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  handleInput(touch.clientX, touch.clientY);
}, { passive: false });

canvas.addEventListener('click', (e) => {
  handleInput(e.clientX, e.clientY);
});

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createPattern(x, y) {
  const radius = Math.random() * 15 + 10;
  const color = getRandomColor();

  points.push({ x, y, radius, color });

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function clearScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  points = [];
}

function animate() {
  requestAnimationFrame(animate);

  clearCanvas();

  if (patternMode) {
    createPattern(mouseX, mouseY);
  }

  for (const point of points) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
    ctx.fillStyle = point.color;
    ctx.fill();
    ctx.closePath();
  }
}


animate();
