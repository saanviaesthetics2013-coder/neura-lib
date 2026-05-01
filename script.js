/* ============================
   WEBOS PRO v4 SYSTEM ENGINE
   ============================ */

const boot = document.getElementById("boot");
const bootFill = document.getElementById("bootFill");
const bootText = document.getElementById("bootText");
const desktop = document.getElementById("desktop");

const windowsContainer = document.getElementById("windows");
const taskApps = document.getElementById("taskApps");

const startMenu = document.getElementById("startMenu");
const contextMenu = document.getElementById("contextMenu");

const emyBubble = document.getElementById("emyBubble");

let zIndexCounter = 10;
let themeDark = false;

const installedGames = JSON.parse(localStorage.getItem("installedGames") || "{}");

/* ============================
   BOOT SYSTEM
   ============================ */
const bootMessages = [
  "Checking system modules...",
  "Loading WebOS interface...",
  "Starting apps engine...",
  "Mounting desktop...",
  "Almost ready..."
];

let bootProgress = 0;
let bootMsgIndex = 0;

const bootTimer = setInterval(() => {
  bootProgress += 10;
  bootFill.style.width = bootProgress + "%";

  if (bootMsgIndex < bootMessages.length) {
    bootText.innerText = bootMessages[bootMsgIndex];
    bootMsgIndex++;
  }

  if (bootProgress >= 100) {
    clearInterval(bootTimer);
    setTimeout(() => {
      boot.style.display = "none";
      desktop.style.display = "block";
      emy("Welcome to WebOS. Double click any app to begin.");
    }, 600);
  }
}, 400);

/* ============================
   CLOCK
   ============================ */
function updateClock() {
  document.getElementById("clock").innerText = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

/* ============================
   EMY SYSTEM
   ============================ */
function emy(text) {
  emyBubble.innerText = text;
}

/* ============================
   START MENU
   ============================ */
function toggleStartMenu() {
  startMenu.style.display = startMenu.style.display === "block" ? "none" : "block";
}

document.addEventListener("click", (e) => {
  if (!startMenu.contains(e.target) && !e.target.classList.contains("start-btn")) {
    startMenu.style.display = "none";
  }
});

/* ============================
   CONTEXT MENU
   ============================ */
desktop.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  contextMenu.style.display = "block";
  contextMenu.style.left = e.clientX + "px";
  contextMenu.style.top = e.clientY + "px";
});

document.addEventListener("click", () => {
  contextMenu.style.display = "none";
});

/* ============================
   WINDOW SYSTEM
   ============================ */
let dragging = null;

function createWindow(appId, title, contentHTML) {
  const win = document.createElement("div");
  win.className = "window";
  win.dataset.app = appId;
  win.style.left = 150 + Math.random() * 150 + "px";
  win.style.top = 100 + Math.random() * 120 + "px";
  win.style.zIndex = ++zIndexCounter;

  win.innerHTML = `
    <div class="win-bar">
      <div class="win-title">${title}</div>
      <div class="win-actions">
        <button onclick="minimizeWindow('${appId}')">─</button>
        <button onclick="maximizeWindow('${appId}')">▢</button>
        <button onclick="closeWindow('${appId}')">✕</button>
      </div>
    </div>
    <div class="win-body">${contentHTML}</div>
  `;

  win.addEventListener("mousedown", () => focusWindow(win));

  win.querySelector(".win-bar").addEventListener("mousedown", (e) => {
    focusWindow(win);
    dragging = {
      win,
      offsetX: e.clientX - win.offsetLeft,
      offsetY: e.clientY - win.offsetTop
    };
  });

  windowsContainer.appendChild(win);
  addTaskbarApp(appId, title);

  return win;
}

document.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  dragging.win.style.left = e.clientX - dragging.offsetX + "px";
  dragging.win.style.top = e.clientY - dragging.offsetY + "px";
});

document.addEventListener("mouseup", () => dragging = null);

function focusWindow(win) {
  win.style.zIndex = ++zIndexCounter;

  document.querySelectorAll(".task-item").forEach(t => t.classList.remove("active"));
  const task = document.querySelector(`.task-item[data-app="${win.dataset.app}"]`);
  if (task) task.classList.add("active");
}

function closeWindow(appId) {
  const win = document.querySelector(`.window[data-app="${appId}"]`);
  if (win) win.remove();

  const task = document.querySelector(`.task-item[data-app="${appId}"]`);
  if (task) task.remove();

  emy("Closed app.");
}

function minimizeWindow(appId) {
  const win = document.querySelector(`.window[data-app="${appId}"]`);
  if (win) win.style.display = "none";
  emy("Window minimized.");
}

function maximizeWindow(appId) {
  const win = document.querySelector(`.window[data-app="${appId}"]`);
  if (!win) return;

  if (win.dataset.max === "true") {
    win.style.width = "520px";
    win.style.height = "430px";
    win.dataset.max = "false";
  } else {
    win.style.left = "10px";
    win.style.top = "60px";
    win.style.width = "calc(100% - 20px)";
    win.style.height = "calc(100% - 130px)";
    win.dataset.max = "true";
  }
}

function addTaskbarApp(appId, title) {
  if (document.querySelector(`.task-item[data-app="${appId}"]`)) return;

  const btn = document.createElement("div");
  btn.className = "task-item active";
  btn.dataset.app = appId;
  btn.innerText = title;

  btn.onclick = () => {
    const win = document.querySelector(`.window[data-app="${appId}"]`);
    if (!win) return;

    if (win.style.display === "none") win.style.display = "block";
    focusWindow(win);
  };

  document.querySelectorAll(".task-item").forEach(t => t.classList.remove("active"));
  taskApps.appendChild(btn);
}

/* ============================
   THEME
   ============================ */
function toggleTheme() {
  themeDark = !themeDark;
  document.body.classList.toggle("dark");
  emy(themeDark ? "Dark mode enabled." : "Light mode enabled.");
}

/* ============================
   OPEN APPS
   ============================ */
function openApp(appId) {
  startMenu.style.display = "none";

  const existing = document.querySelector(`.window[data-app="${appId}"]`);
  if (existing) {
    existing.style.display = "block";
    focusWindow(existing);
    return;
  }

  if (appId === "assistant") {
    createWindow("assistant", "Assistant", assistantHTML());
    emy("This is the assistant. Search any topic.");
  }

  if (appId === "worldclock") {
    createWindow("worldclock", "World Clock", worldClockHTML());
    emy("Pick a country to view time.");
    startWorldClock();
  }

  if (appId === "encyclopedia") {
    createWindow("encyclopedia", "Encyclopedia", encyclopediaHTML());
    emy("Search materials like plastic or glass.");
  }

  if (appId === "crafts") {
    createWindow("crafts", "Crafts Studio", craftsHTML());
    emy("Choose a craft to see steps.");
  }

  if (appId === "paint") {
    createWindow("paint", "Paint", paintHTML());
    emy("Use brush tools to create art.");
    setupPaint();
  }

  if (appId === "music") {
    createWindow("music", "Music Player", musicHTML());
    emy("Play songs and read lyrics.");
    setupMusic();
  }

  if (appId === "notes") {
    createWindow("notes", "Notes", notesHTML());
    emy("Your notes will auto-save.");
    setupNotes();
  }

  if (appId === "games") {
    createWindow("games", "Games Hub", gamesHTML());
    emy("Install a game first, then play.");
  }

  if (appId === "snake") {
    createWindow("snake", "Snake Game", snakeHTML());
    emy("Use arrow keys to play snake.");
    startSnake();
  }

  if (appId === "credits") {
    createWindow("credits", "Credits", creditsHTML());
    emy("Thank you for exploring WebOS.");
  }
}

/* ============================
   WORLD CLOCK APP
   ============================ */
const timezones = [
  { name: "India", zone: "Asia/Kolkata" },
  { name: "USA (New York)", zone: "America/New_York" },
  { name: "Canada (Toronto)", zone: "America/Toronto" },
  { name: "France (Paris)", zone: "Europe/Paris" },
  { name: "Italy (Rome)", zone: "Europe/Rome" },
  { name: "Japan (Tokyo)", zone: "Asia/Tokyo" },
  { name: "UAE (Dubai)", zone: "Asia/Dubai" },
  { name: "Australia (Sydney)", zone: "Australia/Sydney" }
];

let selectedZone = timezones[0].zone;

function worldClockHTML() {
  return `
    <h2>World Clock</h2>
    <p style="opacity:.75;margin-bottom:10px;">Select a country:</p>

    <select id="tzSelect" style="width:100%;padding:10px;border-radius:14px;border:1px solid rgba(0,0,0,0.1)">
      ${timezones.map(t => `<option value="${t.zone}">${t.name}</option>`).join("")}
    </select>

    <div style="margin-top:16px;padding:16px;border-radius:18px;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.3);">
      <div style="font-size:13px;opacity:.7;">Live Time</div>
      <div id="worldTime" style="font-size:32px;font-weight:900;margin-top:6px;">--:--:--</div>
    </div>
  `;
}

function startWorldClock() {
  const select = document.getElementById("tzSelect");
  if (!select) return;

  select.addEventListener("change", () => {
    selectedZone = select.value;
  });

  setInterval(() => {
    const el = document.getElementById("worldTime");
    if (!el) return;
    el.innerText = new Date().toLocaleTimeString("en-US", { timeZone: selectedZone });
  }, 1000);
}

/* ============================
   ENCYCLOPEDIA DATABASE
   ============================ */
const encyclopediaDB = {
  plastic: {
    title: "Plastic",
    made: "Plastic is made from petroleum (crude oil) through polymerization.",
    uses: "Used in bottles, packaging, toys, electronics, and daily products.",
    dispose: "Dispose in recycling bins if clean. Avoid burning."
  },
  glass: {
    title: "Glass",
    made: "Glass is made by melting silica sand with soda ash and limestone.",
    uses: "Used in bottles, windows, screens, and containers.",
    dispose: "Recycle in glass bins. Avoid mixing with trash."
  },
  paper: {
    title: "Paper",
    made: "Paper is made from wood pulp or recycled paper fibers.",
    uses: "Used for books, packaging, tissues, and writing.",
    dispose: "Recycle if clean. Compost if uncoated."
  },
  metal: {
    title: "Metal",
    made: "Metal is extracted from ores using mining and refining.",
    uses: "Used in tools, cans, buildings, electronics.",
    dispose: "Recycle in scrap metal centers."
  }
};

/* ENCYCLOPEDIA APP UI */
function encyclopediaHTML() {
  return `
    <h2>Mini Encyclopedia</h2>
    <p style="opacity:.75;margin-bottom:10px;">Type a topic like <b>plastic</b>, <b>glass</b>, <b>paper</b>.</p>

    <input id="encyInput" placeholder="Search topic..."
      style="width:100%;padding:12px;border-radius:14px;border:1px solid rgba(0,0,0,0.12);outline:none;margin-bottom:12px;"/>

    <div id="encyResult"
      style="padding:14px;border-radius:18px;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.3);">
      <div style="opacity:.7;">No topic selected.</div>
    </div>
  `;
}

document.addEventListener("input", (e) => {
  if (e.target.id !== "encyInput") return;

  const q = e.target.value.trim().toLowerCase();
  const res = document.getElementById("encyResult");

  if (!q) {
    res.innerHTML = `<div style="opacity:.7;">No topic selected.</div>`;
    return;
  }

  const item = encyclopediaDB[q];

  if (!item) {
    res.innerHTML = `<div style="opacity:.7;">No result found for "${q}".</div>`;
    return;
  }

  res.innerHTML = `
    <h3 style="margin-bottom:8px;">${item.title}</h3>
    <p><b>How it's made:</b> ${item.made}</p>
    <p style="margin-top:8px;"><b>Uses:</b> ${item.uses}</p>
    <p style="margin-top:8px;"><b>Disposal:</b> ${item.dispose}</p>
  `;
});

/* ============================
   CRAFTS APP
   ============================ */
const craftsDB = [
  {
    title: "Paper Butterfly",
    difficulty: "Easy",
    materials: ["Paper", "Scissors", "Markers"],
    steps: [
      "Fold the paper in half.",
      "Draw butterfly wings on the folded side.",
      "Cut along the outline carefully.",
      "Open the fold and decorate the butterfly.",
      "Add string if you want to hang it."
    ]
  },
  {
    title: "Paper Plane",
    difficulty: "Easy",
    materials: ["A4 Paper"],
    steps: [
      "Fold the paper in half lengthwise.",
      "Fold top corners inward to form a triangle.",
      "Fold again inward to sharpen the nose.",
      "Fold the plane in half.",
      "Fold wings down evenly and test fly."
    ]
  }
];

function craftsHTML() {
  return `
    <h2>Crafts Studio</h2>
    <p style="opacity:.75;margin-bottom:12px;">Explore crafts and view steps.</p>

    <div class="list-panel">
      ${craftsDB.map((c, i) => `
        <div class="item-card" onclick="openCraft(${i})">
          <h3>${c.title}</h3>
          <p>Difficulty: ${c.difficulty}</p>
        </div>
      `).join("")}
    </div>

    <div id="craftDetail" style="margin-top:14px;"></div>
  `;
}

function openCraft(i) {
  const c = craftsDB[i];
  const detail = document.getElementById("craftDetail");

  detail.innerHTML = `
    <div style="padding:14px;border-radius:18px;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.3);">
      <h3>${c.title}</h3>
      <p style="opacity:.8;margin-top:6px;"><b>Materials:</b> ${c.materials.join(", ")}</p>

      <h4 style="margin-top:12px;">Steps</h4>
      <ol style="margin-top:8px;padding-left:20px;">
        ${c.steps.map(s => `<li style="margin-top:6px;">${s}</li>`).join("")}
      </ol>
    </div>
  `;

  emy("Great! Follow the steps carefully.");
}

/* ============================
   NOTES APP
   ============================ */
function notesHTML() {
  return `
    <h2>Notes</h2>
    <p style="opacity:.75;margin-bottom:10px;">Your notes are saved automatically.</p>

    <textarea id="notesBox"
      style="width:100%;height:240px;padding:12px;border-radius:18px;border:1px solid rgba(0,0,0,0.12);outline:none;"></textarea>

    <div style="margin-top:10px;opacity:.7;font-size:12px;">
      Saved in localStorage.
    </div>
  `;
}

function setupNotes() {
  const box = document.getElementById("notesBox");
  if (!box) return;

  box.value = localStorage.getItem("webos_notes") || "";

  box.addEventListener("input", () => {
    localStorage.setItem("webos_notes", box.value);
  });
}

/* ============================
   MUSIC APP
   ============================ */
const musicDB = [
  {
    title: "Soft Sky",
    file: "song1.mp3",
    lyrics: `Soft sky above me
Calm wind around
I close my eyes
No noise, no sound...`
  },
  {
    title: "Rose Light",
    file: "song2.mp3",
    lyrics: `Rose light falling
Dreams in motion
Heart is quiet
Like the ocean...`
  }
];

function musicHTML() {
  return `
    <h2>Music Player</h2>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;">
      <div style="padding:14px;border-radius:18px;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.3);">
        <h3>Playlist</h3>
        <div id="songList" style="margin-top:10px;display:flex;flex-direction:column;gap:8px;"></div>
      </div>

      <div style="padding:14px;border-radius:18px;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.3);">
        <h3>Lyrics</h3>
        <pre id="lyricsBox" style="margin-top:10px;white-space:pre-wrap;font-size:12px;opacity:.85;"></pre>
      </div>
    </div>

    <div style="margin-top:14px;padding:14px;border-radius:18px;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.3);">
      <audio id="audioPlayer" controls style="width:100%;"></audio>

      <div style="margin-top:10px;">
        <label style="font-size:12px;opacity:.7;">Volume</label>
        <input id="volSlider" type="range" min="0" max="1" step="0.01" value="0.7" style="width:100%;">
      </div>
    </div>
  `;
}

function setupMusic() {
  const list = document.getElementById("songList");
  const audio = document.getElementById("audioPlayer");
  const lyrics = document.getElementById("lyricsBox");
  const vol = document.getElementById("volSlider");

  if (!list || !audio || !lyrics || !vol) return;

  list.innerHTML = "";

  musicDB.forEach((s) => {
    const btn = document.createElement("button");
    btn.innerText = "▶ " + s.title;
    btn.style.padding = "10px";
    btn.style.borderRadius = "14px";
    btn.style.border = "1px solid rgba(255,255,255,0.3)";
    btn.style.background = "rgba(255,255,255,0.2)";
    btn.style.cursor = "pointer";

    btn.onclick = () => {
      audio.src = s.file;
      lyrics.innerText = s.lyrics;
      audio.play();
      emy("Now playing: " + s.title);
    };

    list.appendChild(btn);
  });

  vol.addEventListener("input", () => {
    audio.volume = vol.value;
  });
}

/* ============================
   GAMES HUB + INSTALL SYSTEM
   ============================ */
const gameDB = [
  { id: "snake", name: "Snake Game" }
];

function gamesHTML() {
  return `
    <h2>Games Hub</h2>
    <p style="opacity:.75;margin-bottom:12px;">Install games before playing.</p>

    <div class="list-panel">
      ${gameDB.map(g => `
        <div class="item-card">
          <h3>${g.name}</h3>
          <p>${installedGames[g.id] ? "Installed ✅" : "Not installed ❌"}</p>

          ${
            installedGames[g.id]
              ? `<button style="margin-top:10px;width:100%;padding:10px;border-radius:14px;border:1px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.2);cursor:pointer;"
                   onclick="openApp('${g.id}')">Play</button>`
              : `<button style="margin-top:10px;width:100%;padding:10px;border-radius:14px;border:1px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.2);cursor:pointer;"
                   onclick="installGame('${g.id}')">Install</button>`
          }
        </div>
      `).join("")}
    </div>

    <div id="installStatus" style="margin-top:14px;"></div>
  `;
}

function installGame(id) {
  const status = document.getElementById("installStatus");
  if (!status) return;

  emy("Installing game... please wait.");

  status.innerHTML = `
    <div style="padding:14px;border-radius:18px;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.3);">
      Installing... <span id="installPercent">0%</span>
      <div style="height:10px;background:rgba(0,0,0,0.08);border-radius:999px;margin-top:10px;overflow:hidden;">
        <div id="installBar" style="height:100%;width:0%;background:linear-gradient(90deg,var(--cyan),var(--rose));"></div>
      </div>
    </div>
  `;

  let p = 0;
  const bar = document.getElementById("installBar");
  const percent = document.getElementById("installPercent");

  const t = setInterval(() => {
    p += 10;
    bar.style.width = p + "%";
    percent.innerText = p + "%";

    if (p >= 100) {
      clearInterval(t);
      installedGames[id] = true;
      localStorage.setItem("installedGames", JSON.stringify(installedGames));
      emy("Installed successfully!");
      openApp("games");
    }
  }, 250);
}

/* ============================
   SNAKE GAME
   ============================ */
function snakeHTML() {
  return `
    <h2>Snake Game</h2>
    <p style="opacity:.75;">Use arrow keys to move.</p>

    <canvas id="snakeCanvas" width="360" height="260"
      style="margin-top:14px;border-radius:18px;border:1px solid rgba(255,255,255,0.3);background:rgba(0,0,0,0.08);"></canvas>

    <div style="margin-top:10px;font-weight:800;">Score: <span id="snakeScore">0</span></div>
  `;
}

let snakeInterval = null;

function startSnake() {
  const canvas = document.getElementById("snakeCanvas");
  const scoreEl = document.getElementById("snakeScore");
  if (!canvas || !scoreEl) return;

  const ctx = canvas.getContext("2d");

  let grid = 20;
  let snake = [{ x: 160, y: 120 }];
  let dir = { x: grid, y: 0 };
  let food = { x: 200, y: 120 };
  let score = 0;

  function randomFood() {
    food.x = Math.floor(Math.random() * (canvas.width / grid)) * grid;
    food.y = Math.floor(Math.random() * (canvas.height / grid)) * grid;
  }

  document.onkeydown = (e) => {
    if (e.key === "ArrowUp" && dir.y === 0) dir = { x: 0, y: -grid };
    if (e.key === "ArrowDown" && dir.y === 0) dir = { x: 0, y: grid };
    if (e.key === "ArrowLeft" && dir.x === 0) dir = { x: -grid, y: 0 };
    if (e.key === "ArrowRight" && dir.x === 0) dir = { x: grid, y: 0 };
  };

  if (snakeInterval) clearInterval(snakeInterval);

  snakeInterval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    if (head.x < 0) head.x = canvas.width - grid;
    if (head.x >= canvas.width) head.x = 0;
    if (head.y < 0) head.y = canvas.height - grid;
    if (head.y >= canvas.height) head.y = 0;

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        snake = [{ x: 160, y: 120 }];
        dir = { x: grid, y: 0 };
        score = 0;
        scoreEl.innerText = score;
        randomFood();
        emy("Oops! You crashed. Try again.");
        return;
      }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score++;
      scoreEl.innerText = score;
      randomFood();
    } else {
      snake.pop();
    }

    ctx.fillStyle = "#7fd6d2";
    snake.forEach(p => ctx.fillRect(p.x, p.y, grid - 2, grid - 2));

    ctx.fillStyle = "#d9a4b2";
    ctx.fillRect(food.x, food.y, grid - 2, grid - 2);
  }, 120);
}

/* ============================
   PAINT APP
   ============================ */
function paintHTML() {
  return `
    <h2>Paint</h2>

    <div style="display:flex;gap:10px;align-items:center;margin-top:10px;">
      <input type="color" id="paintColor" value="#7fd6d2" />
      <input type="range" id="paintSize" min="2" max="25" value="6" />
      <button onclick="paintClear()" style="padding:10px;border-radius:14px;border:1px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.2);cursor:pointer;">Clear</button>
      <button onclick="paintSave()" style="padding:10px;border-radius:14px;border:1px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.2);cursor:pointer;">Save</button>
    </div>

    <canvas id="paintCanvas" width="420" height="260"
      style="margin-top:14px;border-radius:18px;border:1px solid rgba(255,255,255,0.3);background:white;"></canvas>
  `;
}

let paintCtx = null;
let painting = false;

function setupPaint() {
  const canvas = document.getElementById("paintCanvas");
  if (!canvas) return;

  paintCtx = canvas.getContext("2d");

  canvas.addEventListener("mousedown", () => painting = true);
  canvas.addEventListener("mouseup", () => painting = false);
  canvas.addEventListener("mouseleave", () => painting = false);

  canvas.addEventListener("mousemove", (e) => {
    if (!painting) return;

    const color = document.getElementById("paintColor").value;
    const size = document.getElementById("paintSize").value;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    paintCtx.fillStyle = color;
    paintCtx.beginPath();
    paintCtx.arc(x, y, size / 2, 0, Math.PI * 2);
    paintCtx.fill();
  });
}

function paintClear() {
  const canvas = document.getElementById("paintCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  emy("Canvas cleared.");
}

function paintSave() {
  const canvas = document.getElementById("paintCanvas");
  if (!canvas) return;

  const link = document.createElement("a");
  link.download = "emy-art.png";
  link.href = canvas.toDataURL("image/png");
  link.click();

  emy("Saved your artwork!");
}

/* ============================
   ASSISTANT APP
   ============================ */
function assistantHTML() {
  return `
    <h2>Assistant</h2>
    <p style="opacity:.75;margin-bottom:12px;">
      Ask about materials like plastic, glass, metal, paper, etc.
    </p>

    <input id="assistantInput" placeholder="Type a topic..."
      style="width:100%;padding:12px;border-radius:14px;border:1px solid rgba(0,0,0,0.12);outline:none;" />

    <div id="assistantOut"
      style="margin-top:12px;padding:14px;border-radius:18px;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.3);">
      <div style="opacity:.7;">Waiting for input...</div>
    </div>
  `;
}

document.addEventListener("input", (e) => {
  if (e.target.id !== "assistantInput") return;

  const q = e.target.value.trim().toLowerCase();
  const out = document.getElementById("assistantOut");

  if (!q) {
    out.innerHTML = `<div style="opacity:.7;">Waiting for input...</div>`;
    return;
  }

  const item = encyclopediaDB[q];

  if (!item) {
    out.innerHTML = `<div style="opacity:.7;">I don't know "${q}" yet. Add it to the database.</div>`;
    emy("I couldn't find that topic.");
    return;
  }

  out.innerHTML = `
    <h3>${item.title}</h3>
    <p style="margin-top:8px;"><b>How it's made:</b> ${item.made}</p>
    <p style="margin-top:8px;"><b>Uses:</b> ${item.uses}</p>
    <p style="margin-top:8px;"><b>Disposal:</b> ${item.dispose}</p>
  `;

  emy("Here is what I found about " + item.title + ".");
});

/* ============================
   CREDITS APP
   ============================ */
function creditsHTML() {
  return `
    <div style="height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;">
      <div style="font-size:22px;font-weight:900;letter-spacing:2px;color:var(--cyan);">
        Created by Saanvi
      </div>
      <div style="margin-top:10px;opacity:.65;font-size:13px;">
        WebOS Pro v4
      </div>
    </div>
  `;
}
