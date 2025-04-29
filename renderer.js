document.addEventListener("DOMContentLoaded", () => {
  // Sanskrit Background Effect
  const background = document.querySelector(".background") || document.getElementById("background-script");
  const chars = "अआइईउऊऋएऐओऔकखगघचछजझटठडढणतथदधनपफबभमयरलवशषसह".split("");
  
  for (let i = 0; i < 120; i++) {
    const char = document.createElement("div");
    char.textContent = chars[Math.floor(Math.random() * chars.length)];
    char.className = "sanskrit-char";
    char.style.left = Math.random() * 100 + "vw";
    char.style.top = Math.random() * 100 + "vh";
    char.style.position = "absolute";
    char.style.fontFamily = "'Noto Serif Devanagari', serif";
    char.style.color = "rgba(255, 255, 255, 0.05)";
    char.style.fontSize = "2rem";
    char.style.transform = `rotate(${Math.random() * 360}deg)`;
    char.style.pointerEvents = "none";
    background?.appendChild(char);
  }
  
  // Fetch and display the daily shloka
  let selectedDateKey = "";
  const addBtn = document.getElementById("add-task");
  const input = document.getElementById("new-task");
  const list = document.getElementById("task-list");

  function saveTasks() {
    if (!selectedDateKey) return;
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach(li => {
      tasks.push({
        text: li.querySelector("span").textContent,
        done: li.classList.contains("done")
      });
    });
    localStorage.setItem(`todoTasks_${selectedDateKey}`, JSON.stringify(tasks));
  }

  function loadTasks() {
    if (!selectedDateKey) return;
    list.innerHTML = "";
    const tasks = JSON.parse(localStorage.getItem(`todoTasks_${selectedDateKey}`) || "[]");
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${task.text}</span>
        <button class="done-btn">✅</button>
        <button class="delete-btn">🗑️</button>
      `;
      if (task.done) li.classList.add("done");
      li.querySelector(".done-btn").addEventListener("click", () => {
        li.classList.toggle("done");
        saveTasks();
      });
      li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
        saveTasks();
      });
      list.appendChild(li);
    });
  }

  addBtn.addEventListener("click", () => {
    const task = input.value.trim();
    if (task !== "") {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${task}</span>
        <button class="done-btn">✅</button>
        <button class="delete-btn">🗑️</button>
      `;
      li.querySelector(".done-btn").addEventListener("click", () => {
        li.classList.toggle("done");
        saveTasks();
      });
      li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
        saveTasks();
      });
      list.appendChild(li);
      input.value = "";
      saveTasks();
    }
  });

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addBtn.click();
  });

  // Dynamic Calendar
  const calendarEl = document.querySelector(".calendar-grid");
  const monthHeader = document.querySelector(".month-header");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  let currentDate = new Date();

  function renderCalendar(date) {
    calendarEl.innerHTML = "";
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach(day => {
      const dayName = document.createElement("div");
      dayName.className = "day-name";
      dayName.textContent = day;
      calendarEl.appendChild(dayName);
    });

    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement("div");
      blank.className = "day blank";
      calendarEl.appendChild(blank);
    }

    let selectedDayElement = null;

    for (let i = 1; i <= daysInMonth; i++) {
      const day = document.createElement("div");
      day.className = "day";

      const dateObj = new Date(year, month, i);

      // Check if this is today
      const today = new Date();
      const isToday =
        today.getFullYear() === dateObj.getFullYear() &&
        today.getMonth() === dateObj.getMonth() &&
        today.getDate() === dateObj.getDate();

      if (isToday) {
        day.style.backgroundColor = "#ffffff";
        day.style.color = "#1e1e1e";
        day.style.fontWeight = "bold";
      }
      if (isToday) {
        day.classList.add("today");
      }

      const sakaDateStr = new Intl.DateTimeFormat('hi-IN-u-ca-indian', {
        day: 'numeric',
        month: 'long'
      }).format(dateObj);

      const gregEl = document.createElement("div");
      gregEl.style.fontSize = "1rem";
      gregEl.style.marginBottom = "2px";
      gregEl.innerHTML = `${i}<br>${sakaDateStr}`;

      day.appendChild(gregEl);
      calendarEl.appendChild(day);

      day.addEventListener("click", () => {
        if (selectedDayElement) {
          // Don't reset the highlight if it's today's date
          if (!selectedDayElement.classList.contains("today")) {
            selectedDayElement.style.backgroundColor = "";
            selectedDayElement.style.color = "";
            selectedDayElement.style.fontWeight = "";
          }
        }
        if (!day.classList.contains("today")) {
          day.style.backgroundColor = "#444";
          day.style.color = "#fff";
          day.style.fontWeight = "bold";
        }
        selectedDayElement = day;

        selectedDateKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;
        loadTasks();

        const dayOfYear = Math.floor(
          (dateObj - new Date(dateObj.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
        );

        fetch("shlokas.json")
          .then(res => res.json())
          .then(shlokas => {
            const shloka = shlokas[dayOfYear % shlokas.length];
            document.getElementById("shloka").textContent = shloka.text;
            document.getElementById("shloka-source").textContent = `— ${shloka.source} | ${shloka.translation}`;
          })
          .catch(err => {
            console.error("Failed to load shlokas:", err);
          });
      });
    }

    monthHeader.textContent = `${monthNames[month]} ${year}`;
  }

  const calendarContainer = document.getElementById("calendar");
  const navContainer = document.createElement("div");
  navContainer.className = "calendar-nav";
  navContainer.style.display = "flex";
  navContainer.style.justifyContent = "center";
  navContainer.style.gap = "1rem";
  navContainer.style.marginBottom = "1rem";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "◀";
  prevBtn.style.padding = "0.4rem 1rem";
  prevBtn.style.fontSize = "1.1rem";
  prevBtn.style.minWidth = "40px";
  prevBtn.style.cursor = "pointer";
  prevBtn.style.borderRadius = "6px";
  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "▶";
  nextBtn.style.padding = "0.4rem 1rem";
  nextBtn.style.fontSize = "1.1rem";
  nextBtn.style.minWidth = "40px";
  nextBtn.style.cursor = "pointer";
  nextBtn.style.borderRadius = "6px";
  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  const yearSelect = document.createElement("select");
  yearSelect.style.padding = "0.4rem 0.6rem";
  yearSelect.style.fontSize = "1rem";
  yearSelect.style.borderRadius = "6px";
  yearSelect.style.cursor = "pointer";

  for (let y = 1970; y <= 2100; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }

  yearSelect.value = currentDate.getFullYear();

  yearSelect.addEventListener("change", () => {
    currentDate.setFullYear(parseInt(yearSelect.value));
    renderCalendar(currentDate);
  });

  navContainer.appendChild(prevBtn);
  navContainer.appendChild(yearSelect);
  navContainer.appendChild(nextBtn);
  calendarContainer.insertBefore(navContainer, calendarEl);

  renderCalendar(currentDate);
});
