:root {
  --bg1: #f7f1ea;
  --bg2: #f4dce7;

  --glass: rgba(255, 255, 255, 0.45);
  --glass2: rgba(255, 255, 255, 0.30);
  --border: rgba(255, 255, 255, 0.35);
  --shadow: rgba(0, 0, 0, 0.18);

  --text: #1d1d22;
  --muted: rgba(20, 20, 20, 0.65);

  --cyan: #7fd6d2;
  --rose: #d9a4b2;

  --radius: 22px;
  --radius-sm: 16px;
}

body.dark {
  --bg1: #0d0d12;
  --bg2: #13131b;

  --glass: rgba(20, 20, 30, 0.60);
  --glass2: rgba(20, 20, 30, 0.45);
  --border: rgba(255, 255, 255, 0.12);
  --shadow: rgba(0, 0, 0, 0.65);

  --text: #ffffff;
  --muted: rgba(255, 255, 255, 0.65);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: system-ui, sans-serif;
}

body {
  overflow: hidden;
  background: linear-gradient(135deg, var(--bg1), var(--bg2));
  color: var(--text);
}

/* BOOT */
.boot {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, var(--bg1), var(--bg2));
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}

.boot-card {
  width: 90%;
  max-width: 420px;
  padding: 22px;
  border-radius: var(--radius);
  background: var(--glass);
  border: 1px solid var(--border);
  backdrop-filter: blur(16px);
  box-shadow: 0 30px 80px var(--shadow);
}

.boot-title {
  font-weight: 900;
  letter-spacing: 6px;
  font-size: 18px;
  color: var(--cyan);
  margin-bottom: 10px;
}

.boot-text {
  font-size: 14px;
  opacity: 0.8;
}

.boot-bar {
  margin-top: 14px;
  height: 10px;
  width: 100%;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 999px;
  overflow: hidden;
}

.boot-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--cyan), var(--rose));
  transition: 0.2s;
}

/* DESKTOP */
.desktop {
  display: none;
  width: 100vw;
  height: 100vh;
  position: relative;
}

/* TOPBAR */
.topbar {
  position: absolute;
  top: 0;
  width: 100%;
  height: 46px;
  padding: 0 18px;
  background: var(--glass2);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(16px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--cyan);
  box-shadow: 0 0 15px var(--cyan);
}

.brand-name {
  font-weight: 900;
  letter-spacing: 4px;
  font-size: 12px;
}

#clock {
  font-size: 13px;
  opacity: 0.8;
}

/* ICONS */
.desktop-icons {
  position: absolute;
  top: 70px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.desktop-icon {
  width: 92px;
  padding: 10px;
  border-radius: 16px;
  text-align: center;
  cursor: pointer;
  transition: 0.25s ease;
  user-select: none;
}

.desktop-icon:hover {
  background: rgba(255, 255, 255, 0.18);
  transform: translateY(-3px);
}

.desktop-icon span {
  display: block;
  font-size: 12px;
  margin-top: 6px;
  opacity: 0.8;
}

/* TASKBAR */
.taskbar {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 58px;
  padding: 0 12px;
  background: var(--glass2);
  border-top: 1px solid var(--border);
  backdrop-filter: blur(18px);
  display: flex;
  align-items: center;
  gap: 12px;
}

.start-btn {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.25);
  cursor: pointer;
  transition: 0.2s ease;
}

.start-btn:hover {
  transform: translateY(-2px);
  border-color: var(--cyan);
}

.task-apps {
  display: flex;
  gap: 10px;
  flex: 1;
}

.task-item {
  padding: 10px 14px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.20);
  cursor: pointer;
  transition: 0.2s ease;
  font-size: 13px;
}

.task-item.active {
  border-color: var(--cyan);
  box-shadow: 0 0 18px rgba(127, 214, 210, 0.25);
}

/* START MENU */
.start-menu {
  position: absolute;
  bottom: 70px;
  left: 12px;
  width: 260px;
  padding: 16px;
  border-radius: var(--radius);
  background: var(--glass);
  border: 1px solid var(--border);
  backdrop-filter: blur(18px);
  display: none;
  box-shadow: 0 20px 70px var(--shadow);
}

.start-title {
  font-weight: 800;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.start-menu button {
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.20);
  cursor: pointer;
  transition: 0.2s ease;
  text-align: left;
}

.start-menu button:hover {
  border-color: var(--cyan);
}

/* WINDOWS */
.window {
  position: absolute;
  width: 520px;
  height: 430px;
  border-radius: var(--radius);
  background: var(--glass);
  border: 1px solid var(--border);
  backdrop-filter: blur(18px);
  box-shadow: 0 30px 90px var(--shadow);
  overflow: hidden;
  animation: popIn 0.2s ease;
}

@keyframes popIn {
  from { transform: scale(0.96); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.win-bar {
  height: 44px;
  padding: 0 14px;
  background: rgba(255, 255, 255, 0.14);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: grab;
  user-select: none;
}

.win-title {
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 1px;
}

.win-actions {
  display: flex;
  gap: 8px;
}

.win-actions button {
  width: 30px;
  height: 30px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.20);
  cursor: pointer;
  transition: 0.2s ease;
}

.win-actions button:hover {
  border-color: var(--cyan);
}

.win-body {
  height: calc(100% - 44px);
  padding: 16px;
  overflow: auto;
}

/* LIST PANEL */
.list-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.item-card {
  padding: 14px;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.18);
  cursor: pointer;
  transition: 0.2s ease;
}

.item-card:hover {
  transform: translateY(-4px);
  border-color: var(--rose);
}

.item-card h3 {
  font-size: 14px;
  margin-bottom: 6px;
}

.item-card p {
  font-size: 12px;
  opacity: 0.75;
}

/* EMY */
.emy {
  position: fixed;
  bottom: 80px;
  right: 24px;
  z-index: 9999;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  animation: emyFloat 3.2s infinite ease-in-out;
}

@keyframes emyFloat {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.emy-bubble {
  max-width: 220px;
  padding: 12px 14px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid var(--border);
  backdrop-filter: blur(12px);
  font-size: 12px;
  box-shadow: 0 20px 60px var(--shadow);
  animation: bubblePop 0.3s ease;
}

@keyframes bubblePop {
  from { transform: scale(0.92); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.emy-body {
  width: 78px;
  height: 78px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--rose), var(--cyan));
  position: relative;
  box-shadow: 0 20px 60px var(--shadow);
}

.emy-face {
  position: absolute;
  top: 20px;
  left: 18px;
  width: 42px;
  height: 42px;
}

.emy-eye {
  width: 10px;
  height: 14px;
  background: #111;
  border-radius: 50%;
  position: absolute;
  top: 6px;
}

.emy-eye.left { left: 4px; }
.emy-eye.right { right: 4px; }

.emy-eye::after {
  content: "";
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
}

.emy-blush {
  width: 10px;
  height: 6px;
  background: rgba(255, 180, 200, 0.7);
  border-radius: 50%;
  position: absolute;
  top: 26px;
}

.emy-blush.left { left: 0px; }
.emy-blush.right { right: 0px; }

.emy-beak {
  width: 12px;
  height: 8px;
  background: #ffcf70;
  border-radius: 0 0 10px 10px;
  position: absolute;
  top: 22px;
  left: 15px;
}

.emy-wing {
  width: 24px;
  height: 18px;
  background: rgba(255, 255, 255, 0.30);
  position: absolute;
  top: 30px;
  border-radius: 50%;
  animation: wingFlap 1.2s infinite ease-in-out;
}

.emy-wing.left { left: -10px; transform-origin: right; }
.emy-wing.right { right: -10px; transform-origin: left; }

@keyframes wingFlap {
  0%,100% { transform: rotate(10deg); }
  50% { transform: rotate(-18deg); }
}

/* CONTEXT MENU */
.context-menu {
  position: fixed;
  width: 240px;
  padding: 10px;
  border-radius: 18px;
  background: var(--glass);
  border: 1px solid var(--border);
  backdrop-filter: blur(16px);
  display: none;
  z-index: 999999;
  box-shadow: 0 25px 80px var(--shadow);
}

.context-menu button {
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.20);
  cursor: pointer;
  text-align: left;
  transition: 0.2s ease;
}

.context-menu button:hover {
  border-color: var(--cyan);
}

/* RESPONSIVE */
@media (max-width: 650px) {
  .window {
    width: 92%;
    height: 70%;
    left: 4% !important;
    top: 70px !important;
  }

  .desktop-icons {
    flex-direction: row;
    flex-wrap: wrap;
    width: 90%;
  }

  .emy {
    display: none;
  }
}
