feather.replace();


const sidebarItems = document.querySelectorAll('.sidebar ul li');
const indicator = document.querySelector('.indicator');
const pageSections = document.querySelectorAll('.page-section');


let typewriterTimeout = null;
let typewriterActive = false;

function startTypewriter() {
  const el = document.querySelector('.typewriter-text');
  if (!el) return;

  const words = [
    'Full-Stack Software Developer',
    'AI Data Engineer',
    'Full-Stack Software Developer & AI Data Engineer'
  ];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    if (!typewriterActive) return;
    const currentWord = words[wordIdx];

    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 30 : 65;

    if (!isDeleting && charIdx === currentWord.length) {
      typeSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      typeSpeed = 600;
    }

    typewriterTimeout = setTimeout(type, typeSpeed);
  }

  typewriterActive = true;
  type();
}

function stopTypewriter() {
  typewriterActive = false;
  if (typewriterTimeout) clearTimeout(typewriterTimeout);
  const el = document.querySelector('.typewriter-text');
  if (el) el.textContent = '';
}

function moveIndicator(liElement) {
  if (!liElement) return;
  const ul = document.querySelector('.sidebar ul');
  const isMobile = window.innerWidth <= 600;
  if (isMobile) {

    const leftPos = ul.offsetLeft + liElement.offsetLeft + (liElement.offsetWidth - 45) / 2;
    indicator.style.left = `${leftPos}px`;
    indicator.style.top = '50%';
    indicator.style.transform = 'translateY(-50%)';
  } else {

    const topPos = ul.offsetTop + liElement.offsetTop + (liElement.offsetHeight - 45) / 2;
    indicator.style.top = `${topPos}px`;
    indicator.style.left = '50%';
    indicator.style.transform = 'translateX(-50%)';
  }
}


indicator.style.opacity = '0';

function navigateToSection(index) {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    if (index === 0) {
      sidebar.style.opacity = '0';
      sidebar.style.pointerEvents = 'none';
    } else {
      sidebar.style.opacity = '1';
      sidebar.style.pointerEvents = 'auto';
    }
  }

  if (index === 1) {
    stopTypewriter();
    typewriterTimeout = setTimeout(() => {
      startTypewriter();
    }, 2200);
  } else {
    stopTypewriter();
  }

  if (index === 3) {
    const fills = document.querySelectorAll('.chart-bar-fill');
    fills.forEach(fill => fill.style.width = '0%');
    setTimeout(() => {
      fills.forEach((fill, idx) => {
        setTimeout(() => {
          fill.style.width = fill.getAttribute('data-width');
        }, idx * 100);
      });
    }, 300);
  }

  let prevIndex = 0;
  pageSections.forEach((sec, idx) => {
    if (sec.classList.contains('active')) prevIndex = idx;
  });


  let foundActiveLi = null;
  sidebarItems.forEach(li => {
    const liIdx = parseInt(li.getAttribute('data-index'));
    if (liIdx === index) {
      li.classList.add('active');
      foundActiveLi = li;
    } else {
      li.classList.remove('active');
    }
  });

  if (foundActiveLi && index > 0) {
    indicator.style.opacity = '1';
    moveIndicator(foundActiveLi);
  } else {
    indicator.style.opacity = '0';
  }


  const homeCircle = document.getElementById('home-circle');
  if (index > 0 && homeCircle && typeof renderer !== 'undefined') {
    if (renderer.domElement.parentNode !== homeCircle) {
      homeCircle.appendChild(renderer.domElement);
    }
    const w = homeCircle.clientWidth;
    const h = homeCircle.clientHeight;
    if (typeof camera !== 'undefined' && w > 0 && h > 0) {
      camera.aspect = w / h;
      camera.position.z = 110;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
  } else if (index === 0) {
    const canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer && typeof renderer !== 'undefined' && renderer.domElement.parentNode !== canvasContainer) {
      canvasContainer.appendChild(renderer.domElement);
      const w = canvasContainer.clientWidth;
      const h = canvasContainer.clientHeight;
      if (typeof camera !== 'undefined' && w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.position.z = window.innerWidth <= 1023 ? 100 : window.innerWidth <= 1367 ? 72 : 58;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    }
  }


  pageSections.forEach(sec => {
    const secIdx = parseInt(sec.getAttribute('data-index'));

    if (secIdx === index) {

      sec.classList.add('active');

      if (prevIndex === 0 && index === 1) {

        sec.style.transition = 'none';
        sec.style.transform = 'translateY(25px)';
        sec.style.opacity = '0';
        sec.offsetHeight;
        sec.style.transition = 'opacity 1.8s cubic-bezier(0.25, 1, 0.5, 1), transform 1.8s cubic-bezier(0.25, 1, 0.5, 1)';
        sec.style.transform = 'translateY(0)';
        sec.style.opacity = '1';
      } else if (index > prevIndex) {

        sec.style.transition = 'none';
        sec.style.transform = 'translateX(5vw)';
        sec.style.opacity = '0';
        sec.offsetHeight;
        sec.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        sec.style.transform = 'translateX(0)';
        sec.style.opacity = '1';
      } else if (index < prevIndex) {

        sec.style.transition = 'none';
        sec.style.transform = 'translateX(-5vw)';
        sec.style.opacity = '0';
        sec.offsetHeight;
        sec.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        sec.style.transform = 'translateX(0)';
        sec.style.opacity = '1';
      } else {
        sec.style.transform = 'translateX(0)';
        sec.style.opacity = '1';
      }
    } else if (sec.classList.contains('active')) {

      sec.classList.remove('active');

      sec.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      if (index > prevIndex) {

        sec.style.transform = 'translateX(-5vw)';
      } else {

        sec.style.transform = 'translateX(5vw)';
      }
      sec.style.opacity = '0';
    }
  });
}

sidebarItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    const index = parseInt(item.getAttribute('data-index'));
    navigateToSection(index);
  });
});


const homeButtons = document.querySelectorAll('.home-buttons .btn-box');
homeButtons.forEach((btn, idx) => {
  btn.addEventListener('click', () => {

    navigateToSection(idx + 2);
  });
});



let scrollNavLock = false;
function lockScrollNav() {
  scrollNavLock = true;
  setTimeout(() => { scrollNavLock = false; }, 900);
}

function getActiveCard() {
  const activeSection = document.querySelector('.page-section.active');
  if (!activeSection) return null;
  return activeSection.querySelector('.page-card');
}

function scrollNavTo(direction) {
  if (scrollNavLock) return;
  const activeSection = document.querySelector('.page-section.active');
  if (!activeSection) return;
  const idx = parseInt(activeSection.getAttribute('data-index'));

  if (idx === 0) {
    if (direction > 0) { lockScrollNav(); triggerStartTransition(); }
    return;
  }

  const target = idx + (direction > 0 ? 1 : -1);
  if (target < 1 || target > 4) return;
  lockScrollNav();
  navigateToSection(target);
  const newCard = getActiveCard();
  if (newCard) newCard.scrollTop = 0;
}

window.addEventListener('wheel', (e) => {
  if (window.innerWidth > 1023 || scrollNavLock) return;
  const activeSection = document.querySelector('.page-section.active');
  const idx = activeSection ? parseInt(activeSection.getAttribute('data-index')) : -1;
  if (idx === 0) { scrollNavTo(e.deltaY > 0 ? 1 : -1); return; }
  const card = getActiveCard();
  if (!card) return;
  const atBottom = Math.ceil(card.scrollTop + card.clientHeight) >= card.scrollHeight - 2;
  const atTop = card.scrollTop <= 2;
  if (e.deltaY > 0 && atBottom) scrollNavTo(1);
  else if (e.deltaY < 0 && atTop) scrollNavTo(-1);
}, { passive: true });

let touchStartY = 0;
let touchStartAtBottom = false;
let touchStartAtTop = false;
window.addEventListener('touchstart', (e) => {
  if (window.innerWidth > 1023) return;
  touchStartY = e.touches[0].clientY;
  const card = getActiveCard();
  if (card) {
    touchStartAtBottom = Math.ceil(card.scrollTop + card.clientHeight) >= card.scrollHeight - 2;
    touchStartAtTop = card.scrollTop <= 2;
  } else {
    touchStartAtBottom = true;
    touchStartAtTop = true;
  }
}, { passive: true });

window.addEventListener('touchend', (e) => {
  if (window.innerWidth > 1023) return;
  const endY = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientY : touchStartY;
  const dy = touchStartY - endY;
  if (Math.abs(dy) < 60) return;

  const activeSection = document.querySelector('.page-section.active');
  const idx = activeSection ? parseInt(activeSection.getAttribute('data-index')) : -1;
  if (idx === 0) { if (dy > 0) scrollNavTo(1); return; }

  if (dy > 0 && touchStartAtBottom) scrollNavTo(1);
  else if (dy < 0 && touchStartAtTop) scrollNavTo(-1);
}, { passive: true });


let startTransitionInProgress = false;

function triggerStartTransition() {
  if (startTransitionInProgress) return;
  startTransitionInProgress = true;

  const prompt = document.getElementById('start-prompt');
  if (prompt) {
    prompt.style.opacity = '0';
  }

  outroActive = true;
  outroProgress = 0;
}

function finishOutroTransition() {

  navigateToSection(1);


  primaryMesh.scale.set(1.0, 1.0, 1.0);
  outerMesh.scale.set(1.032, 1.032, 1.032);
  primaryMaterial.opacity = 0.32;
  outerMaterial.opacity = 0.11;


  const positions = activeGeometry.attributes.position.array;
  for (let i = 0; i < positions.length; i++) {
    positions[i] = shapes[0][i];
  }
  activeGeometry.attributes.position.needsUpdate = true;


  const prompt = document.getElementById('start-prompt');
  if (prompt) {
    prompt.style.opacity = '1';
  }

  startTransitionInProgress = false;
}

document.addEventListener('keydown', (e) => {
  const activeSection = document.querySelector('.page-section.active');
  if (activeSection && activeSection.getAttribute('data-index') === '0') {
    triggerStartTransition();
  }
});

const startSection = document.querySelector('.page-section[data-index="0"]');
if (startSection) {
  startSection.style.cursor = 'pointer';
  startSection.addEventListener('click', () => {
    const activeSection = document.querySelector('.page-section.active');
    if (activeSection && activeSection.getAttribute('data-index') === '0') {
      triggerStartTransition();
    }
  });
}


const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

let containerW = container.clientWidth;
let containerH = container.clientHeight;

const camera = new THREE.PerspectiveCamera(45, containerW / containerH, 0.1, 1000);
camera.position.z = window.innerWidth <= 1023 ? 100 : 58;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(containerW, containerH);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

const baseGeometry = new THREE.IcosahedronGeometry(12, 5);
const vertexCount = baseGeometry.attributes.position.count;

const shapes = {};
for (let s = 0; s < 7; s++) {
  shapes[s] = new Float32Array(vertexCount * 3);
}
const chaosPositions = new Float32Array(vertexCount * 3);
const outroExplodePositions = new Float32Array(vertexCount * 3);

const posAttr = baseGeometry.attributes.position;
for (let i = 0; i < vertexCount; i++) {
  const i3 = i * 3;
  const x = posAttr.getX(i);
  const y = posAttr.getY(i);
  const z = posAttr.getZ(i);

  const r = Math.sqrt(x * x + y * y + z * z);
  const theta = Math.atan2(y, x);
  const phi = Math.acos(z / r);


  const explodeDistance = 75 + Math.random() * 95;
  chaosPositions[i3] = (x / r) * explodeDistance;
  chaosPositions[i3 + 1] = (y / r) * explodeDistance;
  chaosPositions[i3 + 2] = (z / r) * explodeDistance;


  const splatterDistance = 300 + Math.random() * 400;
  outroExplodePositions[i3] = (x / r) * splatterDistance;
  outroExplodePositions[i3 + 1] = (y / r) * splatterDistance;
  outroExplodePositions[i3 + 2] = (z / r) * splatterDistance;

  const r0 = 13 + Math.sin(theta * 6) * Math.cos(phi * 6) * 5.5;
  shapes[0][i3] = (x / r) * r0;
  shapes[0][i3 + 1] = (y / r) * r0;
  shapes[0][i3 + 2] = (z / r) * r0;

  const geodeMap = Math.sin(theta * 5) * Math.cos(phi * 5);
  const r1 = 12 + (geodeMap > 0.15 ? 7 : (geodeMap < -0.15 ? -5.5 : 0));
  shapes[1][i3] = (x / r) * r1;
  shapes[1][i3 + 1] = (y / r) * r1;
  shapes[1][i3 + 2] = (z / r) * r1;

  const spindleTwist = y * 0.35;
  const r2 = 8.5 + Math.sin(phi * 10) * 4;
  shapes[2][i3] = Math.cos(theta + spindleTwist) * r2;
  shapes[2][i3 + 1] = y * 1.35;
  shapes[2][i3 + 2] = Math.sin(theta + spindleTwist) * r2;

  const r3 = 11.5 + Math.sin(x * 0.6) * 3.5 + Math.cos(y * 0.6) * 3.5 + Math.sin(z * 0.6) * 3.5;
  shapes[3][i3] = (x / r) * r3;
  shapes[3][i3 + 1] = (y / r) * r3;
  shapes[3][i3 + 2] = (z / r) * r3;

  const loopTime = theta * 2;
  const r4 = 12 + Math.sin(phi * 4) * 6.5;
  shapes[4][i3] = Math.cos(loopTime) * r4;
  shapes[4][i3 + 1] = Math.sin(loopTime) * Math.cos(phi) * 9.5;
  shapes[4][i3 + 2] = Math.sin(loopTime) * Math.sin(phi) * r4;

  const supernovaBurst = Math.pow(Math.max(0, Math.sin(theta * 3) * Math.cos(phi * 3)), 5.5);
  const r5 = 7.5 + supernovaBurst * 38;
  shapes[5][i3] = (x / r) * r5;
  shapes[5][i3 + 1] = (y / r) * r5;
  shapes[5][i3 + 2] = (z / r) * r5;

  const cogsCount = 12;
  const innerEquatorZone = Math.abs(y) < 4.8;
  const r6 = innerEquatorZone ? (14.5 + Math.sign(Math.sin(theta * cogsCount)) * 3.8) : (8.5 - Math.abs(y) * 0.45);
  shapes[6][i3] = (x / r) * r6;
  shapes[6][i3 + 1] = innerEquatorZone ? y * 0.45 : y * 1.35;
  shapes[6][i3 + 2] = (z / r) * r6;
}

const activeGeometry = baseGeometry.clone();
const activePositions = activeGeometry.attributes.position.array;
for (let i = 0; i < activePositions.length; i++) {
  activePositions[i] = chaosPositions[i];
}
activeGeometry.attributes.position.needsUpdate = true;

const primaryMaterial = new THREE.MeshBasicMaterial({
  color: 0x00f0ff,
  wireframe: true,
  transparent: true,
  opacity: 0.32,
  blending: THREE.AdditiveBlending
});
const primaryMesh = new THREE.Mesh(activeGeometry, primaryMaterial);

const modelGroup = new THREE.Group();
const _w = window.innerWidth;
modelGroup.scale.setScalar(_w <= 600 ? 0.72 : _w >= 1368 ? 1.0 : _w <= 1023 ? (0.72 + (_w - 641) / 382 * 0.18) : (0.82 + (_w - 1024) / 343 * 0.18));
scene.add(modelGroup);
modelGroup.add(primaryMesh);

const outerMaterial = new THREE.MeshBasicMaterial({
  color: 0xff2a74,
  wireframe: true,
  transparent: true,
  opacity: 0.11,
  blending: THREE.AdditiveBlending
});
const outerMesh = new THREE.Mesh(activeGeometry, outerMaterial);
modelGroup.add(outerMesh);

let introActive = true;
let introProgress = 0;
const introSpeed = 0.0009;

let outroActive = false;
let outroProgress = 0;
const outroSpeed = 0.0055;

let currentShapeIdx = 0;
let nextShapeIdx = 1;
let transitionProgress = 0;

const morphSpeed = 0.0018;
let holdTimer = 0;
const holdDurationFrames = 230;

let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 - 1;
});

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

const animate = () => {
  requestAnimationFrame(animate);

  const positions = activeGeometry.attributes.position.array;

  if (outroActive) {
    outroProgress += outroSpeed;

    if (outroProgress >= 1) {
      outroProgress = 1;
      outroActive = false;
      finishOutroTransition();
    }


    let easeOutro = Math.sin(outroProgress * Math.PI / 2);
    let currentScale = lerp(1.0, 4.5, easeOutro);
    primaryMesh.scale.set(currentScale, currentScale, currentScale);
    outerMesh.scale.set(currentScale * 1.032, currentScale * 1.032, currentScale * 1.032);


    let fadeProgress = Math.max(0, (outroProgress - 0.5) / 0.5);
    primaryMaterial.opacity = lerp(0.32, 0.0, fadeProgress);
    outerMaterial.opacity = lerp(0.11, 0.0, fadeProgress);

    for (let i = 0; i < positions.length; i++) {
      positions[i] = lerp(shapes[currentShapeIdx][i], outroExplodePositions[i], easeOutro);
    }
    activeGeometry.attributes.position.needsUpdate = true;

  } else if (introActive) {
    introProgress += introSpeed;

    if (introProgress >= 1) {
      introProgress = 1;
      introActive = false;
      holdTimer = 0;
    }

    let easeIntro = 1 - Math.pow(1 - introProgress, 3);
    let currentScale = lerp(0.01, 1.0, easeIntro);
    primaryMesh.scale.set(currentScale, currentScale, currentScale);
    outerMesh.scale.set(currentScale * 1.032, currentScale * 1.032, currentScale * 1.032);

    for (let i = 0; i < positions.length; i++) {
      positions[i] = lerp(chaosPositions[i], shapes[0][i], easeIntro);
    }
    activeGeometry.attributes.position.needsUpdate = true;

  } else {
    if (holdTimer < holdDurationFrames) {
      holdTimer++;
    } else {
      transitionProgress += morphSpeed;

      let easedProgress = transitionProgress < 0.5
        ? 4 * transitionProgress * transitionProgress * transitionProgress
        : 1 - Math.pow(-2 * transitionProgress + 2, 3) / 2;

      for (let i = 0; i < positions.length; i++) {
        positions[i] = lerp(shapes[currentShapeIdx][i], shapes[nextShapeIdx][i], easedProgress);
      }
      activeGeometry.attributes.position.needsUpdate = true;

      if (nextShapeIdx % 2 === 0) {
        primaryMaterial.color.setHSL(0.54 + (transitionProgress * 0.32), 1.0, 0.5);
      } else {
        primaryMaterial.color.setHSL(0.86 - (transitionProgress * 0.32), 1.0, 0.5);
      }

      if (transitionProgress >= 1) {
        currentShapeIdx = nextShapeIdx;
        nextShapeIdx = (nextShapeIdx + 1) % 7;
        transitionProgress = 0;
        holdTimer = 0;
      }
    }
  }

  primaryMesh.rotation.y += 0.0014;
  primaryMesh.rotation.x += 0.0005;
  primaryMesh.rotation.z += 0.0003;

  outerMesh.rotation.y -= 0.0007;
  outerMesh.rotation.x -= 0.0002;
  outerMesh.rotation.z -= 0.0001;

  primaryMesh.rotation.y += (mouseX * 0.18 - primaryMesh.rotation.y) * 0.025;
  primaryMesh.rotation.x += (-mouseY * 0.18 - primaryMesh.rotation.x) * 0.025;
  outerMesh.rotation.y += (mouseX * 0.18 - outerMesh.rotation.y) * 0.025;
  outerMesh.rotation.x += (-mouseY * 0.18 - outerMesh.rotation.x) * 0.025;

  renderer.render(scene, camera);
};

animate();

function init3DLaptop() {
  const canvas = document.getElementById('laptopCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const container = canvas.parentElement;

  let width = canvas.width = container.clientWidth || 300;
  let height = canvas.height = container.clientHeight || 300;

  let yaw = 16.1340;
  let pitch = -0.2511;
  let lidAngle = (100 * Math.PI) / 180;
  let cameraDistance = 4.7;

  function getFov() {
    return Math.min(width, height) * 1.2;
  }
  let fov = getFov();

  let isDragging = false;
  let prevMouse = { x: 0, y: 0 };
  let waveTime = 0;
  let autoOrbit = true;

  let laptopIntroProgress = 0;
  let laptopScale = 0;
  const laptopIntroSpeed = 0.007;

  function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      width = canvas.width = entry.contentRect.width;
      height = canvas.height = entry.contentRect.height;
      fov = getFov();
    }
  });
  resizeObserver.observe(container);

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouse = { x: e.clientX, y: e.clientY };
  });
  window.addEventListener('mouseup', () => {
    isDragging = false;
    autoOrbit = true;
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    yaw += (e.clientX - prevMouse.x) * 0.007;
    pitch = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, pitch + (e.clientY - prevMouse.y) * 0.007));
    prevMouse = { x: e.clientX, y: e.clientY };
    autoOrbit = false;
  });

  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  });
  window.addEventListener('touchend', () => {
    isDragging = false;
    autoOrbit = true;
  });
  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    yaw += (e.touches[0].clientX - prevMouse.x) * 0.007;
    pitch = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, pitch + (e.touches[0].clientY - prevMouse.y) * 0.007));
    prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    autoOrbit = false;
  });

  function project(x, y, z) {
    x *= laptopScale;
    y *= laptopScale;
    z *= laptopScale;
    let cosY = Math.cos(yaw), sinY = Math.sin(yaw);
    let x1 = x * cosY + z * sinY;
    let z1 = -x * sinY + z * cosY;

    let cosX = Math.cos(pitch), sinX = Math.sin(pitch);
    let y2 = y * cosX - z1 * sinX;
    let z2 = y * sinX + z1 * cosX;

    let sz = z2 + cameraDistance;
    return {
      x: (x1 * fov) / sz + width / 2,
      y: (-y2 * fov) / sz + height / 2 + 65,
      zDepth: sz
    };
  }

  function drawUniformLine(p1, p2, color, thickness = 1) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.stroke();
  }

  function drawDepthCueLine(p1, p2) {
    let avgDepth = (p1.zDepth + p2.zDepth) / 2;

    let minD = cameraDistance - 1.5;
    let maxD = cameraDistance + 1.5;
    let t = (avgDepth - minD) / (maxD - minD);
    t = Math.max(0, Math.min(1, t));

    let r = Math.round(255 - t * 255);
    let g = Math.round(0 + t * 180);
    let b = Math.round(90 + t * 165);
    let thickness = 1.6 - t * 1.1;

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.lineWidth = thickness;
    ctx.stroke();
  }

  const baseW = 1.2;
  const baseD = 0.85;
  const baseH = 0.14;

  const screenW = 1.2;
  const screenH = 1.70;
  const screenT = 0.12;

  const hY = 0;
  const hZ = -baseD;

  function transformLid(lx, ly, lz) {
    let worldY = hY + lz * Math.cos(lidAngle) + ly * Math.sin(lidAngle);
    let worldZ = hZ - lz * Math.sin(lidAngle) + ly * Math.cos(lidAngle);
    return project(lx, worldY, worldZ);
  }

  function renderLoop() {
    const homeSection = document.querySelector('.page-section[data-index="1"]');
    const isActive = homeSection && homeSection.classList.contains('active');

    if (isActive) {
      if (laptopIntroProgress < 1) {
        laptopIntroProgress = Math.min(1, laptopIntroProgress + laptopIntroSpeed);
      }
    } else {
      laptopIntroProgress = 0;
    }

    laptopScale = easeOutCubic(laptopIntroProgress);

    ctx.clearRect(0, 0, width, height);

    if (autoOrbit) yaw += 0.003;
    waveTime += 0.03;

    const chassisColor = 'rgba(255, 51, 102, 0.8)';
    const chassisMuted = 'rgba(180, 0, 60, 0.25)';

    let bTLF = project(-baseW, 0, baseD);
    let bTRF = project(baseW, 0, baseD);
    let bTRB = project(baseW, 0, -baseD);
    let bTLB = project(-baseW, 0, -baseD);

    let bBLF = project(-baseW, -baseH, baseD);
    let bBRF = project(baseW, -baseH, baseD);
    let bBRB = project(baseW, -baseH, -baseD);
    let bBLB = project(-baseW, -baseH, -baseD);

    drawUniformLine(bTLF, bTRF, chassisColor, 1.5);
    drawUniformLine(bTRF, bTRB, chassisColor, 1);
    drawUniformLine(bTRB, bTLB, chassisColor, 1);
    drawUniformLine(bTLB, bTLF, chassisColor, 1);

    drawUniformLine(bBLF, bBRF, chassisMuted, 1);
    drawUniformLine(bBRF, bBRB, chassisMuted, 1);
    drawUniformLine(bBRB, bBLB, chassisMuted, 1);
    drawUniformLine(bBLB, bBLF, chassisMuted, 1);

    drawUniformLine(bTLF, bBLF, chassisMuted, 1);
    drawUniformLine(bTRF, bBRF, chassisMuted, 1);
    drawUniformLine(bTRB, bBRB, chassisMuted, 1);
    drawUniformLine(bTLB, bBLB, chassisMuted, 1);

    drawUniformLine(bTLF, bBRF, chassisMuted, 0.5);
    drawUniformLine(bTRF, bBLF, chassisMuted, 0.5);
    drawUniformLine(bTLF, bBLB, chassisMuted, 0.5);
    drawUniformLine(bTLB, bBLF, chassisMuted, 0.5);
    drawUniformLine(bTRF, bBRB, chassisMuted, 0.5);
    drawUniformLine(bTRB, bBRF, chassisMuted, 0.5);

    let tp = [project(-0.22, 0, 0.70), project(0.22, 0, 0.70), project(0.22, 0, 0.45), project(-0.22, 0, 0.45)];
    for (let i = 0; i < 4; i++) drawUniformLine(tp[i], tp[(i + 1) % 4], chassisMuted, 1);

    let keyRows = [
      { s: -0.65, e: -0.53 }, { s: -0.48, e: -0.36 },
      { s: -0.31, e: -0.19 }, { s: -0.14, e: 0.03 },
      { s: 0.08, e: 0.25 }
    ];
    keyRows.forEach(row => {
      let tFL = project(-0.98, -0.025, row.e);
      let tFR = project(0.98, -0.025, row.e);
      let tBR = project(0.98, -0.025, row.s);
      let tBL = project(-0.98, -0.025, row.s);

      drawDepthCueLine(tFL, tFR);
      drawDepthCueLine(tFR, tBR);
      drawDepthCueLine(tBR, tBL);
      drawDepthCueLine(tBL, tFL);
    });

    let lTLF = transformLid(-screenW, screenH, 0);
    let lTRF = transformLid(screenW, screenH, 0);
    let lTRB = transformLid(screenW, 0, 0);
    let lTLB = transformLid(-screenW, 0, 0);

    let lTLF_B = transformLid(-screenW, screenH, -screenT);
    let lTRF_B = transformLid(screenW, screenH, -screenT);
    let lTRB_B = transformLid(screenW, 0, -screenT);
    let lTLB_B = transformLid(-screenW, 0, -screenT);

    drawUniformLine(lTLF, lTRF, chassisColor, 1.5);
    drawUniformLine(lTRF, lTRB, chassisColor, 1.5);
    drawUniformLine(lTRB, lTLB, chassisColor, 1.5);
    drawUniformLine(lTLB, lTLF, chassisColor, 1.5);

    drawUniformLine(lTLF_B, lTRF_B, chassisMuted, 1);
    drawUniformLine(lTRF_B, lTRB_B, chassisMuted, 1);
    drawUniformLine(lTRB_B, lTLB_B, chassisMuted, 1);
    drawUniformLine(lTLB_B, lTLF_B, chassisMuted, 1);

    drawUniformLine(lTLF, lTLF_B, chassisMuted, 1);
    drawUniformLine(lTRF, lTRF_B, chassisMuted, 1);
    drawUniformLine(lTRB, lTRB_B, chassisMuted, 1);
    drawUniformLine(lTLB, lTLB_B, chassisMuted, 1);

    drawUniformLine(lTLF, lTRF_B, chassisMuted, 0.5);
    drawUniformLine(lTRF, lTLF_B, chassisMuted, 0.5);
    drawUniformLine(lTLF, lTLB_B, chassisMuted, 0.5);
    drawUniformLine(lTLB, lTLF_B, chassisMuted, 0.5);
    drawUniformLine(lTRF, lTRB_B, chassisMuted, 0.5);
    drawUniformLine(lTRB, lTRF_B, chassisMuted, 0.5);

    let bzInsetX = 0.06;
    let bzInsetY = 0.09;
    let bzActiveW = screenW - bzInsetX;
    let bzActiveH = screenH - bzInsetY;

    let bzTL = transformLid(-bzActiveW, bzActiveH, 0);
    let bzTR = transformLid(bzActiveW, bzActiveH, 0);
    let bzBR = transformLid(bzActiveW, 0.06, 0);
    let bzBL = transformLid(-bzActiveW, 0.06, 0);

    drawUniformLine(bzTL, bzTR, chassisColor, 1);
    drawUniformLine(bzTR, bzBR, chassisColor, 1);
    drawUniformLine(bzBR, bzBL, chassisColor, 1);
    drawUniformLine(bzBL, bzTL, chassisColor, 1);

    let steps = 14;
    let gridPoints = [];

    for (let r = 0; r <= steps; r++) {
      gridPoints[r] = [];
      let pctY = r / steps;
      let locY = 0.06 + pctY * (bzActiveH - 0.06);

      for (let c = 0; c <= steps; c++) {
        let pctX = c / steps;
        let locX = -bzActiveW + pctX * (bzActiveW * 2);

        let wX = locX * 3.8;
        let wY = (locY - (screenH / 2)) * 3.8;
        let zDisplacement = 0.22 * Math.sin(wX + waveTime) * Math.cos(wY - waveTime * 0.7);

        if (r === 0 || r === steps || c === 0 || c === steps) {
          zDisplacement = 0;
        }

        gridPoints[r][c] = transformLid(locX, locY, zDisplacement);
      }
    }

    for (let r = 0; r <= steps; r++) {
      for (let c = 0; c <= steps; c++) {
        if (c < steps) {
          drawDepthCueLine(gridPoints[r][c], gridPoints[r][c + 1]);
        }
        if (r < steps) {
          drawDepthCueLine(gridPoints[r][c], gridPoints[r + 1][c]);
        }
        if (r < steps && c < steps) {
          drawDepthCueLine(gridPoints[r][c], gridPoints[r + 1][c + 1]);
          drawDepthCueLine(gridPoints[r + 1][c], gridPoints[r][c + 1]);
        }
      }
    }

    requestAnimationFrame(renderLoop);
  }

  renderLoop();
}

init3DLaptop();

function initExperienceOrbit() {
  const canvas = document.getElementById('orbitCenterCanvas');
  if (!canvas) return;

  function getOrbitCanvasSize() {
    const w = window.innerWidth;
    if (w <= 600) return 200;
    if (w <= 1023) return 240;
    if (w <= 1366) return 320;
    return 720;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  const orbitCanvasSize = getOrbitCanvasSize();
  renderer.setSize(orbitCanvasSize, orbitCanvasSize);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const globeGroup = new THREE.Group();
  globeGroup.rotation.z = 0.41;
  scene.add(globeGroup);

  const textureLoader = new THREE.TextureLoader();
  textureLoader.setCrossOrigin('anonymous');
  const earthMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg');

  const customVertexShader = `
      varying vec2 vUv;
      void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
  `;

  const customFragmentShader = `
      uniform sampler2D uEarthMap;
      varying vec2 vUv;
      void main() {
          vec4 mapColor = texture2D(uEarthMap, vUv);
          float landMask = smoothstep(0.12, 0.18, mapColor.r + mapColor.g * 0.2);
          vec3 landColor = vec3(255.0 / 255.0, 0.0 / 255.0, 90.0 / 255.0);
          vec3 seaColor  = vec3(0.0, 0.0, 0.0);
          vec3 finalColor = mix(seaColor, landColor, landMask);
          float alpha = landMask > 0.01 ? 0.95 : 0.0;
          gl_FragColor = vec4(finalColor, alpha);
      }
  `;

  const globeGeometry = new THREE.SphereGeometry(3.5, 90, 60);

  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: customVertexShader,
    fragmentShader: customFragmentShader,
    uniforms: {
      uEarthMap: { value: earthMap }
    },
    wireframe: true,
    transparent: true
  });

  const vectorGlobe = new THREE.Mesh(globeGeometry, shaderMaterial);
  globeGroup.add(vectorGlobe);

  function drawCenterShape() {
    globeGroup.rotation.y += 0.002;
    renderer.render(scene, camera);
    requestAnimationFrame(drawCenterShape);
  }
  drawCenterShape();

  let orbitAngle = 0;
  let targetAngle = 0;
  let stepIndex = 0;
  let lastStepTime = Date.now();
  let transitioning = false;
  let transitionStartTime = 0;
  let transitionStartAngle = 0;
  const transitionDuration = 700;

  let isHovered = false;
  let isDraggingOrbit = false;
  let prevOrbitMouseX = 0;
  let lastInteractionTime = Date.now();

  function getOrbitRadii() {
    const w = window.innerWidth;
    if (w <= 600) {
      return { rx: 165, rz: 75, ry: 85 };
    } else if (w <= 1023) {
      return { rx: 210, rz: 90, ry: 105 };
    } else if (w <= 1366) {
      return { rx: 240, rz: 120, ry: 80 };
    }
    return { rx: 410, rz: 200, ry: 100 };
  }
  let radiusX = getOrbitRadii().rx;
  let radiusZ = getOrbitRadii().rz;
  let radiusY = getOrbitRadii().ry;

  const container = document.querySelector('.orbit-container');
  const items = document.querySelectorAll('.orbit-item');

  if (container && items.length > 0) {
    container.addEventListener('mouseenter', () => isHovered = true);
    container.addEventListener('mouseleave', () => isHovered = false);


    container.addEventListener('mousedown', (e) => {
      isDraggingOrbit = true;
      prevOrbitMouseX = e.clientX;
      lastInteractionTime = Date.now();
      transitioning = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDraggingOrbit) return;
      const deltaX = e.clientX - prevOrbitMouseX;
      orbitAngle += deltaX * 0.005;
      prevOrbitMouseX = e.clientX;
      lastInteractionTime = Date.now();
    });

    window.addEventListener('mouseup', () => {
      if (isDraggingOrbit) {
        isDraggingOrbit = false;
        const stepAngle = Math.PI * 2 / items.length;
        stepIndex = Math.round(orbitAngle / stepAngle);
        targetAngle = stepIndex * stepAngle;
        transitioning = true;
        transitionStartTime = Date.now();
        transitionStartAngle = orbitAngle;
        lastStepTime = Date.now();
      }
    });


    container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDraggingOrbit = true;
        prevOrbitMouseX = e.touches[0].clientX;
        lastInteractionTime = Date.now();
        transitioning = false;
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDraggingOrbit || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevOrbitMouseX;
      orbitAngle += deltaX * 0.005;
      prevOrbitMouseX = e.touches[0].clientX;
      lastInteractionTime = Date.now();
    });

    window.addEventListener('touchend', () => {
      if (isDraggingOrbit) {
        isDraggingOrbit = false;
        const stepAngle = Math.PI * 2 / items.length;
        stepIndex = Math.round(orbitAngle / stepAngle);
        targetAngle = stepIndex * stepAngle;
        transitioning = true;
        transitionStartTime = Date.now();
        transitionStartAngle = orbitAngle;
        lastStepTime = Date.now();
      }
    });
  }

  function updateOrbit() {
    const isMobile = window.innerWidth <= 1023;
    const radii = getOrbitRadii();
    radiusX = radii.rx;
    radiusZ = radii.rz;
    radiusY = radii.ry;

    if (items.length > 0) {
      if (!isHovered && !isDraggingOrbit) {
        if (!transitioning) {
          if (Date.now() - lastStepTime > 3000) {
            stepIndex++;
            targetAngle = stepIndex * (Math.PI * 2 / items.length);
            transitioning = true;
            transitionStartTime = Date.now();
            transitionStartAngle = orbitAngle;
          }
        } else {
          let t = (Date.now() - transitionStartTime) / transitionDuration;
          if (t >= 1) {
            t = 1;
            transitioning = false;
            orbitAngle = targetAngle;
            lastStepTime = Date.now();
          } else {
            let ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            orbitAngle = transitionStartAngle + (targetAngle - transitionStartAngle) * ease;
          }
        }
      } else {
        if (!isDraggingOrbit) {
          lastStepTime = Date.now();
        }
      }

      items.forEach((item, index) => {
        const itemAngle = orbitAngle + (index * (Math.PI * 2 / items.length));
        const x = Math.cos(itemAngle) * radiusX;
        const z = Math.sin(itemAngle) * radiusZ;
        const y = Math.sin(itemAngle) * radiusY;

        const scale = 0.82 + ((z + radiusZ) / (2 * radiusZ)) * 0.36;
        const opacity = 0.35 + ((z + radiusZ) / (2 * radiusZ)) * 0.65;
        const zIndex = Math.round((z + radiusZ) * 10) + 10;

        item.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
        item.style.opacity = opacity;
        item.style.zIndex = zIndex;
      });
    }
    requestAnimationFrame(updateOrbit);
  }
  updateOrbit();


  window.addEventListener('resize', () => {
    const newSize = getOrbitCanvasSize();
    const currentSize = canvas.width || 720;
    if (newSize !== currentSize) {
      renderer.setSize(newSize, newSize);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    }
  });
}

initExperienceOrbit();

window.addEventListener('resize', () => {
  const currentContainer = renderer.domElement.parentElement;
  if (currentContainer) {
    containerW = currentContainer.clientWidth;
    containerH = currentContainer.clientHeight;
    camera.aspect = containerW / containerH;
    camera.updateProjectionMatrix();
    renderer.setSize(containerW, containerH);
  }


  const activeLi = document.querySelector('.sidebar ul li.active');
  if (activeLi) {
    moveIndicator(activeLi);
  }
});


function initCategoryChart() {
  const container = document.getElementById('category-chart-container');
  if (!container) return;

  const data = typeof portfolioData !== 'undefined' ? portfolioData : [];


  const totalCountElement = document.getElementById('projects-total-count');
  if (totalCountElement) {
    totalCountElement.textContent = data.length;
  }


  const counts = {};
  data.forEach(project => {
    if (project.categories && project.categories.length > 0) {
      project.categories.forEach(cat => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
    }
  });


  const sortedCategories = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const maxCount = sortedCategories.length > 0 ? sortedCategories[0][1] : 1;


  let html = `<div class="chart-title-sub">PROJECTS BY CATEGORY</div>`;

  sortedCategories.forEach(([category, count]) => {
    const percentage = (count / maxCount) * 100;
    html += `
      <div class="chart-row" data-category="${category}">
        <div class="chart-row-header">
          <div class="chart-label">${category}</div>
          <div class="chart-count">${count}</div>
        </div>
        <div class="chart-bar-wrapper">
          <div class="chart-bar-fill" style="width: 0%;" data-width="${percentage}%"></div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;


  const segmentedControl = document.getElementById('portfolio-segmented-control');
  if (segmentedControl) {

    function applyCategoryFilter(cat) {

      const rows = container.querySelectorAll('.chart-row');
      rows.forEach(r => {
        r.classList.remove('active');
        if (r.getAttribute('data-category') === cat) {
          r.classList.add('active');
        }
      });


      const segButtons = segmentedControl.querySelectorAll('.filter-btn');
      segButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-category') === cat);
      });


      const ddItems = segmentedControl.querySelectorAll('.portfolio-custom-dropdown-menu li');
      const ddLabel = segmentedControl.querySelector('.pcd-label');
      ddItems.forEach(i => {
        const match = i.getAttribute('data-category') === cat;
        i.classList.toggle('active', match);
        if (match && ddLabel) ddLabel.textContent = i.textContent;
      });

      initPortfolioSlider(cat);
    }


    let html = '';

    html += `<div class="portfolio-segmented-desktop">`;
    html += `<button class="filter-btn active" data-category="ALL">ALL</button>`;
    sortedCategories.forEach(([category]) => {
      html += `<button class="filter-btn" data-category="${category}">${category}</button>`;
    });
    html += `</div>`;

    html += `<div class="portfolio-custom-dropdown" id="portfolio-custom-dropdown">`;
    html += `<button class="portfolio-custom-dropdown-toggle" type="button"><span class="pcd-label">ALL</span><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></button>`;
    html += `<ul class="portfolio-custom-dropdown-menu">`;
    html += `<li class="active" data-category="ALL">ALL</li>`;
    sortedCategories.forEach(([category]) => {
      html += `<li data-category="${category}">${category}</li>`;
    });
    html += `</ul></div>`;
    segmentedControl.innerHTML = html;


    const segButtons = segmentedControl.querySelectorAll('.portfolio-segmented-desktop .filter-btn');
    segButtons.forEach(btn => {
      btn.addEventListener('click', () => applyCategoryFilter(btn.getAttribute('data-category')));
    });


    const dd = document.getElementById('portfolio-custom-dropdown');
    if (dd) {
      const ddToggle = dd.querySelector('.portfolio-custom-dropdown-toggle');
      const ddItems = dd.querySelectorAll('.portfolio-custom-dropdown-menu li');

      ddToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dd.classList.toggle('open');
      });

      ddItems.forEach(item => {
        item.addEventListener('click', () => {
          dd.classList.remove('open');
          applyCategoryFilter(item.getAttribute('data-category'));
        });
      });


      document.addEventListener('click', () => dd.classList.remove('open'));
    }
  }


  const rows = container.querySelectorAll('.chart-row');
  rows.forEach(row => {
    row.addEventListener('click', () => {
      const wasActive = row.classList.contains('active');
      const targetCat = wasActive ? 'ALL' : row.getAttribute('data-category');
      applyCategoryFilter(targetCat);
    });
  });


  setTimeout(() => {
    const fills = container.querySelectorAll('.chart-bar-fill');
    fills.forEach((fill, index) => {
      setTimeout(() => {
        fill.style.width = fill.getAttribute('data-width');
      }, index * 80);
    });
  }, 300);
}


function initPortfolioSlider(categoryFilter = 'ALL') {
  const track = document.getElementById('portfolio-track');
  if (!track) return;


  track.innerHTML = '';

  let data = typeof portfolioData !== 'undefined' ? portfolioData : [];


  if (categoryFilter && categoryFilter !== 'ALL') {
    data = data.filter(project => project.categories && project.categories.includes(categoryFilter));
  }


  const items = [...data, ...data];

  items.forEach((project, idx) => {
    const card = document.createElement('div');
    card.className = 'portfolio-card';

    const isPrivate = project.status === 'private';
    const privateClass = isPrivate ? ' private-project' : '';

    const isMobile = project.categories && project.categories.some(c => c.toLowerCase().includes('mobile'));
    let imgContent = '';

    if (isMobile && project.pictures && project.pictures.length > 0) {
      imgContent = `<div class="portfolio-mobile-imgs-container" style="display: flex; width: 100%; height: 100%; gap: 10px; padding: 10px; box-sizing: border-box; background: rgba(0, 0, 0, 0.25);">`;
      project.pictures.forEach(pic => {
        imgContent += `<img class="portfolio-card-img${privateClass}" src="${pic}" alt="${project.name}" style="flex: 1; min-width: 0; height: 100%; object-fit: cover; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);" onerror="this.onerror=null; this.src='assets/project/project_template.png';">`;
      });
      imgContent += `</div>`;
    } else {
      const imgSrc = (project.pictures && project.pictures.length > 0)
        ? project.pictures[0]
        : 'assets/project/project_template.png';
      imgContent = `<img class="portfolio-card-img${privateClass}" src="${imgSrc}" alt="${project.name}" onerror="this.onerror=null; this.src='assets/project/project_template.png';">`;
    }
    const cardContent = `
      <div class="portfolio-card-img-container">
        ${imgContent}
        ${isPrivate ? `
          <div class="private-badge">
            <i data-feather="lock"></i>
            <span>PRIVATE</span>
          </div>
        ` : ''}
        <div class="portfolio-card-hover-overlay">
          <div class="portfolio-card-hover-title">${project.name}</div>
          <button class="portfolio-card-hover-btn">View Details</button>
        </div>
      </div>
    `;

    card.innerHTML = cardContent;


    card.addEventListener('click', () => {
      openProjectModal(project);
    });

    track.appendChild(card);
  });

  if (typeof feather !== 'undefined') {
    feather.replace();
  }
}


let modalSliderIndex = 0;
let modalSliderPictures = [];
let modalSliderIsPrivate = false;
let modalSliderProjectName = '';

function openProjectModal(project) {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  document.getElementById('project-modal-title').textContent = project.name;
  document.getElementById('project-modal-org').textContent = project.organization || 'Independent Project';

  const statusElement = document.getElementById('project-modal-status');
  statusElement.textContent = project.status;
  if (project.status === 'private') {
    statusElement.style.color = '#ff0055';
    statusElement.style.borderColor = 'rgba(255, 0, 85, 0.4)';
    statusElement.style.background = 'rgba(255, 0, 85, 0.06)';
  } else {
    statusElement.style.color = '#00ffaa';
    statusElement.style.borderColor = 'rgba(0, 255, 170, 0.4)';
    statusElement.style.background = 'rgba(0, 255, 170, 0.06)';
  }

  document.getElementById('project-modal-desc').textContent = project.description || '';


  const catContainer = document.getElementById('project-modal-categories');
  catContainer.innerHTML = '';
  if (project.categories) {
    project.categories.forEach(cat => {
      const span = document.createElement('span');
      span.textContent = cat;
      catContainer.appendChild(span);
    });
  }


  const techContainer = document.getElementById('project-modal-tech-list');
  techContainer.innerHTML = '';
  if (project.stacks) {
    project.stacks.forEach(tech => {
      const span = document.createElement('span');
      span.textContent = tech;
      techContainer.appendChild(span);
    });
  }


  const linkBtn = document.getElementById('project-modal-link-btn');
  if (project.link && project.status !== 'private') {
    linkBtn.href = project.link;
    linkBtn.style.display = 'inline-flex';
  } else {
    linkBtn.style.display = 'none';
  }


  modalSliderIndex = 0;
  modalSliderPictures = project.pictures && project.pictures.length > 0 ? project.pictures : ['assets/project/project_template.png'];
  modalSliderIsPrivate = project.status === 'private';
  modalSliderProjectName = project.name;

  const modalPrivateBadge = document.getElementById('modal-private-badge');
  const modalZoomBtn = document.getElementById('modal-zoom-btn');
  if (modalSliderIsPrivate) {
    modalPrivateBadge.style.display = 'flex';
    modalZoomBtn.style.display = 'none';
  } else {
    modalPrivateBadge.style.display = 'none';
    modalZoomBtn.style.display = 'flex';
  }

  const prevBtn = document.getElementById('modal-slider-prev');
  const nextBtn = document.getElementById('modal-slider-next');
  const thumbnailsTray = document.getElementById('project-modal-thumbnails');


  updateModalMainImage();


  thumbnailsTray.innerHTML = '';
  if (modalSliderPictures.length > 1) {
    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';
    thumbnailsTray.style.display = 'flex';

    modalSliderPictures.forEach((pic, index) => {
      const thumb = document.createElement('img');
      thumb.className = 'modal-thumb' + (index === 0 ? ' active' : '');
      thumb.src = pic;
      thumb.alt = `${project.name} thumbnail ${index + 1}`;
      thumb.onerror = () => {
        thumb.src = 'assets/project/project_template.png';
      };
      thumb.addEventListener('click', () => {
        modalSliderIndex = index;
        updateModalMainImage();
      });
      thumbnailsTray.appendChild(thumb);
    });
  } else {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    thumbnailsTray.style.display = 'none';
  }

  modal.classList.add('active');

  if (typeof feather !== 'undefined') {
    feather.replace();
  }
}

function updateModalMainImage() {
  const mainImg = document.getElementById('modal-main-img');
  if (!mainImg) return;


  const existingGlass = mainImg.parentElement.querySelector('.img-magnifier-glass');
  if (existingGlass) existingGlass.remove();

  mainImg.style.opacity = '0';
  setTimeout(() => {
    mainImg.src = modalSliderPictures[modalSliderIndex];
    mainImg.alt = `${modalSliderProjectName} screenshot ${modalSliderIndex + 1}`;
    if (modalSliderIsPrivate) {
      mainImg.style.filter = 'blur(12px) brightness(0.6)';
    } else {
      mainImg.style.filter = 'none';
    }
    mainImg.style.opacity = '1';
  }, 150);


  const thumbs = document.querySelectorAll('#project-modal-thumbnails .modal-thumb');
  thumbs.forEach((t, i) => {
    if (i === modalSliderIndex) {
      t.classList.add('active');
      t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      t.classList.remove('active');
    }
  });
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}


function openLightbox(src) {
  if (modalSliderIsPrivate) return;
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  if (lightbox) {
    lightbox.classList.remove('active');
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.getElementById('modal-slider-prev');
  const nextBtn = document.getElementById('modal-slider-next');
  const mainImg = document.getElementById('modal-main-img');
  const zoomBtn = document.getElementById('modal-zoom-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      modalSliderIndex = (modalSliderIndex - 1 + modalSliderPictures.length) % modalSliderPictures.length;
      updateModalMainImage();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      modalSliderIndex = (modalSliderIndex + 1) % modalSliderPictures.length;
      updateModalMainImage();
    });
  }


  if (mainImg) {
    mainImg.addEventListener('click', () => {
      openLightbox(mainImg.src);
    });
  }


  if (zoomBtn) {
    zoomBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mainImg) {
        openLightbox(mainImg.src);
      }
    });
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('project-modal-close');
  const backdrop = document.getElementById('project-modal-backdrop');

  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
  if (backdrop) backdrop.addEventListener('click', closeProjectModal);

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const lightbox = document.getElementById('lightbox-modal');
      if (lightbox && lightbox.classList.contains('active')) {
        closeLightbox();
      } else {
        closeProjectModal();
      }
    }
  });
});



const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';


if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const toast = document.getElementById('toast-notification');
  const toastIcon = document.getElementById('toast-icon');
  const toastMessage = document.getElementById('toast-message');

  function showToast(message, isSuccess) {
    if (!toast || !toastIcon || !toastMessage) return;

    toastMessage.textContent = message;
    if (isSuccess) {
      toastIcon.className = 'toast-icon success';
      toastIcon.innerHTML = '<i data-feather="check-circle"></i>';
    } else {
      toastIcon.className = 'toast-icon error';
      toastIcon.innerHTML = '<i data-feather="alert-triangle"></i>';
    }

    if (typeof feather !== 'undefined') {
      feather.replace();
    }

    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 5000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      openContactNotificationModal();
    });
  }
});


function openContactNotificationModal() {
  const modal = document.getElementById('contact-notification-modal');
  if (!modal) return;
  modal.classList.add('active');
}

function closeContactNotificationModal() {
  const modal = document.getElementById('contact-notification-modal');
  if (!modal) return;
  modal.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
  const notifModal = document.getElementById('contact-notification-modal');
  if (notifModal) {
    const backdrop = document.getElementById('contact-notification-backdrop');
    const closeBtn = document.getElementById('contact-notification-close');
    const okBtn = document.getElementById('contact-notification-ok');
    if (backdrop) backdrop.addEventListener('click', closeContactNotificationModal);
    if (closeBtn) closeBtn.addEventListener('click', closeContactNotificationModal);
    if (okBtn) okBtn.addEventListener('click', closeContactNotificationModal);
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const cursorDot = document.getElementById('custom-cursor-dot');
  const cursorRing = document.getElementById('custom-cursor-ring');

  if (!cursorDot || !cursorRing) return;

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  let isHovered = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;


    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });


  const tick = () => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    requestAnimationFrame(tick);
  };
  tick();


  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (target && (
      target.closest('a, button, .btn-box, .social-card, .sidebar ul li, .orbit-item, .portfolio-card, #start-prompt, .projects-dashboard-grid .count-box, .lightbox-close, .project-modal-close, .modal-thumb, .slider-arrow, .hobby-item')
    )) {
      if (!isHovered) {
        cursorDot.classList.add('hovered');
        cursorRing.classList.add('hovered');
        isHovered = true;
      }
    } else {
      if (isHovered) {
        cursorDot.classList.remove('hovered');
        cursorRing.classList.remove('hovered');
        isHovered = false;
      }
    }
  });
});

initCategoryChart();
initPortfolioSlider();
