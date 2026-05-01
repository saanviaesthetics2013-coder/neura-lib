/* ==========================
   WEBOS PRO v5 ENGINE
   ========================== */

const boot = document.getElementById("boot");
const bootFill = document.getElementById("bootFill");
const bootText = document.getElementById("bootText");

const windowsContainer = document.getElementById("windows");
const emyBubble = document.getElementById("emyBubble");

let zIndexCounter = 50;

function emy(text) {
  emyBubble.innerText = text;
}

/* ==========================
   BOOT LOADER
   ========================== */
window.onload = () => {
  let progress = 0;
  const messages = [
    "Checking system modules...",
    "Loading UI engine...",
    "Mounting desktop...",
    "Starting apps...",
    "Done."
  ];

  let msg = 0;

  const timer = setInterval(() => {
    progress += 20;
    bootFill.style.width = progress + "%";
    bootText.innerText = messages[msg] || "Loading...";
    msg++;

    if (progress >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        boot.style.display = "none";
        emy("Hi, I'm Emmy — your guide. Tap the dock icons.");
      }, 800);
    }
  }, 550);
};

/* ==========================
   TOP CLOCK
   ========================== */
function updateClock() {
  document.getElementById("clock").innerText =
    new Date().toLocaleString("en-US", { hour: "2-digit", minute: "2-digit" });
}
setInterval(updateClock, 1000);
updateClock();

/* ==========================
   WINDOW SYSTEM
   ========================== */
let dragging = null;

function createWindow(appId, title, html) {
  const win = document.createElement("div");
  win.className = "window";
  win.dataset.app = appId;
  win.style.left = 120 + Math.random() * 200 + "px";
  win.style.top = 90 + Math.random() * 140 + "px";
  win.style.zIndex = ++zIndexCounter;

  win.innerHTML = `
    <div class="win-bar">
      <div class="win-actions">
        <button class="close" onclick="closeWindow('${appId}')"></button>
        <button class="min" onclick="minimizeWindow('${appId}')"></button>
        <button class="max" onclick="maximizeWindow('${appId}')"></button>
      </div>
      <div class="win-title">${title}</div>
      <div style="width:60px;"></div>
    </div>

    <div class="win-body">${html}</div>
  `;

  win.addEventListener("mousedown", () => focusWindow(win));

  const bar = win.querySelector(".win-bar");
  bar.addEventListener("mousedown", (e) => {
    dragging = {
      win,
      offsetX: e.clientX - win.offsetLeft,
      offsetY: e.clientY - win.offsetTop
    };
  });

  windowsContainer.appendChild(win);
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
}

function closeWindow(appId) {
  const win = document.querySelector(`.window[data-app="${appId}"]`);
  if (win) win.remove();
  emy("Closed app.");
}

function minimizeWindow(appId) {
  const win = document.querySelector(`.window[data-app="${appId}"]`);
  if (win) win.style.display = "none";
  emy("Minimized.");
}

function maximizeWindow(appId) {
  const win = document.querySelector(`.window[data-app="${appId}"]`);
  if (!win) return;

  if (win.dataset.max === "true") {
    win.style.width = "560px";
    win.style.height = "450px";
    win.dataset.max = "false";
    emy("Window restored.");
  } else {
    win.style.left = "18px";
    win.style.top = "60px";
    win.style.width = "calc(100% - 36px)";
    win.style.height = "calc(100% - 140px)";
    win.dataset.max = "true";
    emy("Window maximized.");
  }
}

/* ==========================
   DATABASES
   ========================== */
const encyclopediaDB = {
  plastic: {
    title: "Plastic",
    made: "Plastic is made from crude oil and natural gas using polymerization.",
    uses: "Used in packaging, bottles, toys, electronics, and medical equipment.",
    dispose: "Recycle if possible. Avoid burning. Reduce usage."
  },
  glass: {
    title: "Glass",
    made: "Glass is made by melting silica sand with limestone and soda ash.",
    uses: "Used in bottles, windows, and containers.",
    dispose: "Recycle glass separately."
  },
  paper: {
    title: "Paper",
    made: "Paper is made from wood pulp or recycled fibers.",
    uses: "Used for writing, packaging, books.",
    dispose: "Recycle if clean, compost if uncoated."
  }
};

const craftsDB = [
  {
    title: "Paper Butterfly",
    difficulty: "Easy",
    steps: [
      "Fold the paper in half.",
      "Draw wing shape on folded side.",
      "Cut along outline.",
      "Open paper and decorate.",
      "Add thread to hang."
    ]
  },
  {
    title: "Paper Plane",
    difficulty: "Easy",
    steps: [
      "Fold paper in half lengthwise.",
      "Fold corners inward.",
      "Fold nose again for sharp tip.",
      "Fold plane in half.",
      "Fold wings evenly and fly."
    ]
  }
];

/* ==========================
   APPS
   ========================== */

function assistantHTML() {
  return `
    <h2>Assistant</h2>
    <p style="opacity:.85;margin-top:6px;">
      Ask Emmy about materials. Example: <b>plastic</b>, <b>glass</b>.
    </p>

    <div class="card" style="margin-top:14px;">
      <input id="assistantInput" placeholder="Type your topic..." />
      <div id="assistantOut" style="margin-top:12px;opacity:.9;">
        Waiting for input...
      </div>
    </div>
  `;
}

document.addEventListener("input", (e) => {
  if (e.target.id !== "assistantInput") return;

  const q = e.target.value.trim().toLowerCase();
  const out = document.getElementById("assistantOut");

  if (!q) {
    out.innerHTML = "Waiting for input...";
    return;
  }

  const item = encyclopediaDB[q];
  if (!item) {
    out.innerHTML = `No result found for "<b>${q}</b>".`;
    emy("I couldn't find that topic.");
    return;
  }

  out.innerHTML = `
    <h3>${item.title}</h3>
    <p><b>How it's made:</b> ${item.made}</p>
    <p style="margin-top:10px;"><b>Uses:</b> ${item.uses}</p>
    <p style="margin-top:10px;"><b>Disposal:</b> ${item.dispose}</p>
  `;

  emy("Here is what I found.");
});

function worldClockHTML() {
  return `
    <h2>World Clock</h2>

    <div class="card" style="margin-top:14px;">
      <select id="tzSelect">
        <option value="Asia/Kolkata">India</option>
        <option value="America/New_York">USA (New York)</option>
        <option value="Europe/Paris">France (Paris)</option>
        <option value="Europe/Rome">Italy (Rome)</option>
        <option value="Asia/Tokyo">Japan (Tokyo)</option>
        <option value="Australia/Sydney">Australia (Sydney)</option>
      </select>

      <div style="margin-top:16px;">
        <div style="opacity:.8;font-size:12px;">Live Time</div>
        <div id="worldTime" style="font-size:34px;font-weight:900;margin-top:6px;">--:--</div>
      </div>
    </div>
  `;
}

function startWorldClock() {
  const select = document.getElementById("tzSelect");
  const display = document.getElementById("worldTime");

  if (!select || !display) return;

  function tick() {
    display.innerText = new Date().toLocaleTimeString("en-US", {
      timeZone: select.value
    });
  }

  tick();
  setInterval(tick, 1000);
}

function encyclopediaHTML() {
  return `
    <h2>Encyclopedia</h2>
    <p style="opacity:.85;margin-top:6px;">Search topics (expandable).</p>

    <div class="card" style="margin-top:14px;">
      <input id="encyInput" placeholder="Search (plastic, paper, glass...)" />
      <div id="encyResult" style="margin-top:12px;opacity:.9;">
        No topic selected.
      </div>
    </div>
  `;
}

document.addEventListener("input", (e) => {
  if (e.target.id !== "encyInput") return;

  const q = e.target.value.trim().toLowerCase();
  const out = document.getElementById("encyResult");

  if (!q) {
    out.innerHTML = "No topic selected.";
    return;
  }

  const item = encyclopediaDB[q];
  if (!item) {
    out.innerHTML = `No result found for "<b>${q}</b>".`;
    return;
  }

  out.innerHTML = `
    <h3>${item.title}</h3>
    <p><b>How it's made:</b> ${item.made}</p>
    <p style="margin-top:10px;"><b>Uses:</b> ${item.uses}</p>
    <p style="margin-top:10px;"><b>Disposal:</b> ${item.dispose}</p>
  `;
});

function craftsHTML() {
  return `
    <h2>Crafts Studio</h2>
    <p style="opacity:.85;margin-top:6px;">Choose a craft to view steps.</p>

    <div class="grid">
      ${craftsDB.map((c, i) => `
        <div class="grid-item" onclick="openCraft(${i})">
          <h3>${c.title}</h3>
          <p style="opacity:.75;margin-top:6px;">Difficulty: ${c.difficulty}</p>
        </div>
      `).join("")}
    </div>

    <div id="craftDetail" class="card" style="margin-top:14px;display:none;"></div>
  `;
}

function openCraft(i) {
  const detail = document.getElementById("craftDetail");
  const craft = craftsDB[i];

  detail.style.display = "block";
  detail.innerHTML = `
    <h3>${craft.title}</h3>
    <ol style="margin-top:12px;padding-left:20px;">
      ${craft.steps.map(s => `<li style="margin-top:8px;">${s}</li>`).join("")}
    </ol>
  `;

  emy("Follow the steps carefully.");
}

function paintHTML() {
  return `
    <h2>Paint</h2>
    <p style="opacity:.85;margin-top:6px;">Draw and save your art.</p>

    <div class="card" style="margin-top:14px;">
      <input type="color" id="paintColor" value="#7fd6d2" />
      <input type="range" id="paintSize" min="2" max="25" value="6" style="margin-top:10px;" />

      <div style="display:flex;gap:10px;margin-top:12px;">
        <button onclick="paintClear()">Clear</button>
        <button onclick="paintSave()">Save</button>
      </div>
    </div>

    <canvas id="paintCanvas" width="520" height="260"
      style="margin-top:14px;border-radius:18px;background:white;width:100%;"></canvas>
  `;
}

let painting = false;

function setupPaint() {
  const canvas = document.getElementById("paintCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  canvas.addEventListener("mousedown", () => painting = true);
  canvas.addEventListener("mouseup", () => painting = false);
  canvas.addEventListener("mouseleave", () => painting = false);

  canvas.addEventListener("mousemove", (e) => {
    if (!painting) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const color = document.getElementById("paintColor").value;
    const size = document.getElementById("paintSize").value;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();
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

  emy("Saved your artwork.");
}

function notesHTML() {
  return `
    <h2>Notes</h2>
    <p style="opacity:.85;margin-top:6px;">Auto-save enabled.</p>

    <textarea id="notesBox" style="margin-top:14px;height:260px;"></textarea>
    <div style="margin-top:10px;opacity:.7;font-size:12px;">Saved locally.</div>
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

const installedGames = JSON.parse(localStorage.getItem("installedGames") || "{}");

function gamesHTML() {
  return `
    <h2>Games Hub</h2>
    <p style="opacity:.85;margin-top:6px;">Install games before playing.</p>

    <div class="grid">
      <div class="grid-item">
        <h3>Snake Game</h3>
        <p style="opacity:.75;margin-top:6px;">
          ${installedGames.snake ? "Installed ✅" : "Not installed ❌"}
        </p>

        ${
          installedGames.snake
            ? `<button style="margin-top:12px;width:100%;" onclick="openApp('snake')">Play</button>`
            : `<button style="margin-top:12px;width:100%;" onclick="installGame('snake')">Install</button>`
        }
      </div>
    </div>

    <div id="installStatus" style="margin-top:14px;"></div>
  `;
}

function installGame(id) {
  const status = document.getElementById("installStatus");
  if (!status) return;

  let p = 0;
  status.innerHTML = `
    <div class="card">
      Installing... <span id="installPercent">0%</span>
      <div style="height:10px;background:rgba(255,255,255,0.12);border-radius:999px;margin-top:10px;overflow:hidden;">
        <div id="installBar" style="height:100%;width:0%;background:linear-gradient(90deg,var(--cyan),var(--rose),var(--purple));"></div>
      </div>
    </div>
  `;

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
      emy("Game installed.");
      openApp("games");
    }
  }, 250);
}

function snakeHTML() {
  return `
    <h2>Snake</h2>
    <p style="opacity:.85;margin-top:6px;">Arrow keys to move.</p>

    <canvas id="snakeCanvas" width="420" height="280"
      style="margin-top:14px;border-radius:18px;background:rgba(0,0,0,0.25);width:100%;"></canvas>

    <div style="margin-top:10px;font-weight:800;">Score: <span id="snakeScore">0</span></div>
  `;
}

let snakeInterval = null;

function startSnake() {
  const canvas = document.getElementById("snakeCanvas");
  const scoreEl = document.getElementById("snakeScore");
  if (!canvas || !scoreEl) return;

  const ctx = canvas.getContext("2d");
  const grid = 20;

  let snake = [{ x: 200, y: 120 }];
  let dir = { x: grid, y: 0 };
  let food = { x: 260, y: 140 };
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
        snake = [{ x: 200, y: 120 }];
        dir = { x: grid, y: 0 };
        score = 0;
        scoreEl.innerText = score;
        randomFood();
        emy("You crashed. Try again.");
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

/* ==========================
   VOICE DETECTOR APP
   ========================== */
function voiceHTML() {
  return `
    <h2>Voice Detector</h2>
    <p style="opacity:.85;margin-top:6px;">
      This uses Speech Recognition (works best on Chrome).
    </p>

    <div class="card" style="margin-top:14px;">
      <button onclick="startVoice()">Start Listening</button>
      <button onclick="stopVoice()" style="margin-top:10px;">Stop</button>

      <div style="margin-top:14px;opacity:.85;">
        <b>Detected Speech:</b>
        <div id="voiceText" style="margin-top:8px;">---</div>
      </div>
    </div>
  `;
}

let recognition = null;

function startVoice() {
  const box = document.getElementById("voiceText");
  if (!box) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    box.innerText = "Speech Recognition not supported in this browser.";
    emy("Your browser doesn't support voice detection.");
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = true;

  recognition.onresult = (event) => {
    const text = event.results[event.results.length - 1][0].transcript;
    box.innerText = text;
    emy("I heard: " + text);
  };

  recognition.start();
  emy("Listening...");
}

function stopVoice() {
  if (recognition) recognition.stop();
  emy("Voice detector stopped.");
}

/* ==========================
   FAKE NEWS DETECTOR APP
   ========================== */
function fakeNewsHTML() {
  return `
    <h2>Fake News Detector</h2>
    <p style="opacity:.85;margin-top:6px;">
      This is a smart analyzer (not 100% perfect truth checker).
    </p>

    <div class="card" style="margin-top:14px;">
      <textarea id="newsInput" placeholder="Paste a news headline or paragraph..." style="height:140px;"></textarea>
      <button style="margin-top:12px;width:100%;" onclick="analyzeNews()">Analyze</button>

      <div id="newsResult" style="margin-top:14px;">---</div>
    </div>
  `;
}

function analyzeNews() {
  const input = document.getElementById("newsInput").value.toLowerCase();
  const out = document.getElementById("newsResult");

  if (!input.trim()) {
    out.innerHTML = "Please paste something first.";
    emy("Paste a headline first.");
    return;
  }

  const suspiciousWords = [
    "shocking", "unbelievable", "secret", "you won't believe", "miracle",
    "government hiding", "they don't want you to know", "100% proof",
    "guaranteed", "must watch", "viral", "breaking"
  ];

  const emotionalWords = [
    "hate", "fear", "destroy", "danger", "warning", "panic", "threat",
    "evil", "terrifying", "disaster"
  ];

  let score = 100;
  let found = [];

  suspiciousWords.forEach(w => {
    if (input.includes(w)) {
      score -= 10;
      found.push("Clickbait keyword: " + w);
    }
  });

  emotionalWords.forEach(w => {
    if (input.includes(w)) {
      score -= 7;
      found.push("Emotional trigger: " + w);
    }
  });

  if (input.includes("!!!")) {
    score -= 12;
    found.push("Too many exclamation marks.");
  }

  if (input.length < 40) {
    score -= 10;
    found.push("Headline is too short (possible manipulation).");
  }

  if (score < 0) score = 0;

  let label = "Trusted";
  if (score < 70) label = "Suspicious";
  if (score < 45) label = "Highly Suspicious";

  out.innerHTML = `
    <h3>Trust Score: ${score}/100</h3>
    <p style="margin-top:6px;"><b>Status:</b> ${label}</p>

    <div style="margin-top:12px;">
      <b>Detected Signals:</b>
      <ul style="margin-top:8px;padding-left:18px;">
        ${found.length ? found.map(f => `<li style="margin-top:6px;">${f}</li>`).join("") : "<li>No suspicious signals found.</li>"}
      </ul>
    </div>
  `;

  emy("Analysis complete. Always verify sources.");
}

/* ==========================
   CREDITS
   ========================== */
function creditsHTML() {
  return `
    <div style="height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;">
      <div style="font-size:24px;font-weight:900;letter-spacing:2px;background:linear-gradient(90deg,var(--cyan),var(--rose),var(--purple));
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;">
        Created by Saanvi
      </div>

      <div style="margin-top:12px;opacity:.7;font-size:13px;">
        WebOS Pro v5
      </div>
    </div>
  `;
}

/* ==========================
   APP LAUNCHER
   ========================== */
function openApp(appId) {
  const existing = document.querySelector(`.window[data-app="${appId}"]`);
  if (existing) {
    existing.style.display = "block";
    focusWindow(existing);
    return;
  }

  if (appId === "assistant") createWindow("assistant", "Assistant", assistantHTML());
  if (appId === "worldclock") {
    createWindow("worldclock", "World Clock", worldClockHTML());
    startWorldClock();
  }
  if (appId === "encyclopedia") createWindow("encyclopedia", "Encyclopedia", encyclopediaHTML());
  if (appId === "crafts") createWindow("crafts", "Crafts Studio", craftsHTML());
  if (appId === "paint") {
    createWindow("paint", "Paint", paintHTML());
    setupPaint();
  }
  if (appId === "notes") {
    createWindow("notes", "Notes", notesHTML());
    setupNotes();
  }
  if (appId === "games") createWindow("games", "Games Hub", gamesHTML());
  if (appId === "snake") {
    createWindow("snake", "Snake", snakeHTML());
    startSnake();
  }
  if (appId === "voice") createWindow("voice", "Voice Detector", voiceHTML());
  if (appId === "fakenews") createWindow("fakenews", "Fake News Detector", fakeNewsHTML());
  if (appId === "credits") createWindow("credits", "Credits", creditsHTML());

  emy("Opened " + appId + ".");
}
