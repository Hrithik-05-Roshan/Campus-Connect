// locomotive

const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    lerp: 0.05
});

// music play
const audio = document.getElementById("bgAudio");
const btn = document.getElementById("audioBtn");

btn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    btn.innerText = "Play";
  } else {
    audio.pause();
    btn.innerText = "Mute";
  }
});

// campaigns - search filter
  const searchInput = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".campaign-card");

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    cards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      card.style.display = title.includes(value) ? "block" : "none";
    });
  });