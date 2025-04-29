# 🕉️ Vedico-Modern

**Blending Time and Ages — Literally.**  
A modern desktop app that integrates the official Indian **Saka calendar** with the **Gregorian calendar**, features a dynamic daily **Sanskrit shloka system**, a per-date **To-Do list**, and a minimalistic design that fuses the elegance of Devanagari with a VS Code–inspired dark theme.

---

## 📅 Features

- **Dual Calendar Display**: Shows both Gregorian and Saka calendar dates for every day.
- **Dynamic Calendar Navigation**: Scroll through months and years easily with dropdowns and arrows.
- **Daily Sanskrit Shloka**: A new verse with English translation appears each day; selecting a date updates the shloka.
- **Task Manager**: Add, complete, or delete tasks per individual date. Stored in browser LocalStorage.
- **Modern-Minimal UI**: Dark theme, floating Devanagari characters, clean layout.
- **Offline-First Design**: No internet required for daily usage.
- *(Upcoming)* Festival indicator system using offline astronomical computation.

---

## 🛠️ Tech Stack

| Tech | Usage |
|------|-------|
| **Electron.js** | Cross-platform desktop app shell |
| **HTML/CSS/JS** | UI rendering and interactions |
| **LocalStorage** | To-do persistence |
| **Python 3** | Festival data generation (offline via `panchang_fetcher.py`) |
| **JSON** | Static data storage for shlokas and festivals |
| **Node.js + npm** | Dependency management and packaging |

---

## 🚀 Installation Instructions

### 1. Clone this repo

```bash
git clone https://github.com/bajpaisuyash/vedico-modern-app.git
cd vedico-modern-app
```
### 2. Install dependencies
```bash
npm install
```
### 3. (Optional) Set up Python environment (for festival script)
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install hindu-calendar
python panchang_fetcher.py
```
### 4. Start the app
```bash
npm start
```
## 🖼️ Screenshot
<img width="1512" alt="Screenshot 2025-04-29 at 9 32 17 PM" src="https://github.com/user-attachments/assets/5cc9ff6a-c9a6-4ea2-9ffa-cd14701a9bab" />

---

## 📄 License

This project is for educational/demo purposes. Attribution appreciated.

---

## 🙏 Credits

Built with ❤️ by **His Highness Suyash Bajpai** 👑  
With architectural assistance from OpenAI’s ChatGPT 🤖
