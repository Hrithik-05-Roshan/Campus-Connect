const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    lerp: 0.08
});
const audio = document.getElementById("bgAudio");
const btn = document.getElementById("audioBtn");

btn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    btn.innerText = "🔇 Mute Music";
  } else {
    audio.pause();
    btn.innerText = "🎵 Play Music";
  }
});
