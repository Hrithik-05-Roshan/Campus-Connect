/**************************************************
 * GLOBAL: LOCOMOTIVE SCROLL (ONE INSTANCE ONLY)
 **************************************************/
let locoScroll;

window.addEventListener("load", () => {
  const container = document.querySelector("[data-scroll-container]");
  if (!container) return;

  locoScroll = new LocomotiveScroll({
    el: container,
    smooth: true,
    lerp: 0.08,
    smartphone: { smooth: true },
    tablet: { smooth: true },
  });
});

/**************************************************
 * GLOBAL: MUSIC TOGGLE (GUARDED)
 **************************************************/
const audio = document.getElementById("bgAudio");
const btn = document.getElementById("audioBtn");

if (audio && btn) {
  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      btn.innerText = "Mute";
    } else {
      audio.pause();
      btn.innerText = "Play";
    }
  });
}

/**************************************************
 * CAMPAIGNS PAGE: SEARCH FILTER (GUARDED)
 **************************************************/
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".campaign-card");

if (searchInput && cards.length) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    cards.forEach((card) => {
      const title = card.dataset.title.toLowerCase();
      card.style.display = title.includes(value) ? "block" : "none";
    });
  });
}

/**************************************************
 * EXPLORE PAGE LOGIC (SCOPED & SAFE)
 **************************************************/
if (document.body.dataset.page === "explore") {

  let issues = [];
  let activeChat = null;

  let leaderboard = {
    Rahul: 180,
    Ananya: 150,
    You: 120,
  };

  /* ================= LEADERBOARD ================= */

  function renderLeaderboard() {
    const list = document.getElementById("leaderboardList");
    if (!list) return;

    list.innerHTML = "";

    const sorted = Object.entries(leaderboard).sort((a, b) => b[1] - a[1]);
    const maxPoints = sorted[0][1];

    sorted.forEach(([name, pts], i) => {
      const percent = Math.round((pts / maxPoints) * 100);

      list.innerHTML += `
        <li data-scroll class="rounded-2xl bg-white/5 border border-white/10 p-4">
          <div class="flex justify-between items-center mb-2">
            <span class="font-medium">
              ${i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "•"} ${name}
            </span>
            <span class="text-[#00ff1a] font-semibold">${pts} pts</span>
          </div>

          <div class="w-full h-2 rounded-full bg-black/40 overflow-hidden">
            <div class="h-full bg-gradient-to-r from-[#00ff1a] to-emerald-400"
                 style="width:${percent}%"></div>
          </div>
        </li>
      `;
    });

    locoScroll?.update();
  }

  /* ================= ISSUES ================= */

  function renderIssues() {
    const grid = document.getElementById("issueGrid");
    if (!grid) return;

    grid.innerHTML = "";

    issues.forEach((i, idx) => {
      grid.innerHTML += `
        <div data-scroll
             class="rounded-3xl bg-white/5 border border-white/10 p-6
                    hover:border-[#00ff1a] transition">

          <h3 class="text-xl font-semibold">${i.title}</h3>

          <p class="text-sm text-gray-400 mt-2">
            ${i.status} • ${i.points} pts • ${i.time} min
          </p>

          <div class="mt-4">
            ${
              i.status === "Open"
                ? `<button onclick="acceptIssue(${idx})"
                    class="px-4 py-2 rounded-full border border-[#00ff1a]
                           text-[#00ff1a] hover:bg-[#00ff1a]
                           hover:text-black transition">
                    Accept
                   </button>`
                : `<button onclick="openChat(${idx})"
                    class="px-4 py-2 rounded-full bg-[#00ff1a]
                           text-black hover:scale-105 transition">
                    Open Chat
                   </button>`
            }
          </div>
        </div>
      `;
    });

    locoScroll?.update();
  }

  /* ================= MODALS ================= */

  window.openRaiseModal = () => {
    document.getElementById("raiseModal")?.classList.remove("hidden");
  };

  window.closeRaiseModal = () => {
    document.getElementById("raiseModal")?.classList.add("hidden");
  };

  window.addIssue = () => {
    if (!issueTitle.value || !issueTime.value) return;

    issues.push({
      title: issueTitle.value,
      points: issueDifficulty.value,
      time: issueTime.value,
      status: "Open",
      chat: [],
    });

    issueTitle.value = "";
    issueTime.value = "";

    closeRaiseModal();
    renderIssues();
  };

  /* ================= ISSUE ACTIONS ================= */

  window.acceptIssue = (i) => {
    issues[i].status = "In Progress";
    leaderboard.You += 10;

    renderIssues();
    renderLeaderboard();
  };

  /* ================= CHAT ================= */

  window.openChat = (i) => {
    activeChat = i;
    document.getElementById("chatTitle").innerText = issues[i].title;
    renderChat();
    document.getElementById("chatModal")?.classList.remove("hidden");
  };

  window.closeChat = () => {
    document.getElementById("chatModal")?.classList.add("hidden");
  };

  window.sendMessage = () => {
    if (!chatInput.value.trim()) return;

    issues[activeChat].chat.push(chatInput.value);
    chatInput.value = "";
    renderChat();
  };

  function renderChat() {
    const box = document.getElementById("chatMessages");
    if (!box) return;

    box.innerHTML = issues[activeChat].chat
      .map(
        (m) => `
          <div class="bg-white/10 px-4 py-2 rounded-lg">
            ${m}
          </div>
        `
      )
      .join("");

    locoScroll?.update();
  }

  /* ================= INIT ================= */

  renderIssues();
  renderLeaderboard();
}



// login-signup btn

function openLoginSignup() {
  window.location.href = "./login-signup.html";
}
