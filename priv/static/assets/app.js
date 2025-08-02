const playlistId = "PLEjDh3G3VFvFqBGNtdTKvQX7wJ5t7MJu3";

export function loadPlayer() {
  const iframe = document.getElementById("emo-player");
  iframe.src = `https://www.youtube.com/embed/videoseries?list=${playlistId}&enablejsapi=1&autoplay=1&mute=0&loop=1&playlist=${playlistId}`;
  iframe.style.display = "block";
}

export function sendCommand(cmd) {
  const iframe = document.getElementById("emo-player").contentWindow;
  iframe.postMessage(JSON.stringify({
    event: "command",
    func: cmd,
    args: []
  }), "*");
}

export function playMusic() {
  loadPlayer();
  sendCommand("playVideo");
}

export function pauseMusic() {
  sendCommand("pauseVideo");
}

export function nextTrack() {
  sendCommand("nextVideo");
}

export function prevTrack() {
  sendCommand("previousVideo");
}

