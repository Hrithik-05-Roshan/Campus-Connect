const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    lerp: 0.05
});


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
