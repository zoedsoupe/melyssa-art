const playlistId = "PLEjDh3G3VFvFqBGNtdTKvQX7wJ5t7MJu3";

let playerState = {
  isPlaying: false,
  isMuted: false,
  volume: 50,
  currentTrack: "Loading..."
};

function loadPlayer() {
  const iframe = document.getElementById("emo-player");
  iframe.src = `https://www.youtube.com/embed/videoseries?list=${playlistId}&enablejsapi=1&autoplay=1&mute=0&loop=1&playlist=${playlistId}`;
  iframe.style.display = "block";
  
  // Listen for player state updates
  window.addEventListener("message", handlePlayerMessage);
}

function handlePlayerMessage(event) {
  if (event.origin !== "https://www.youtube.com") return;
  
  try {
    const data = JSON.parse(event.data);
    if (data.event === "video-progress") {
      updatePlayerState(data.info);
    }
  } catch (e) {
    // Ignore parsing errors
  }
}

function updatePlayerState(info) {
  if (info) {
    playerState.isPlaying = info.playerState === 1;
    updatePlayPauseButton();
  }
}

function updatePlayPauseButton() {
  const playBtn = document.getElementById("play-pause-btn");
  if (playBtn) {
    playBtn.textContent = playerState.isPlaying ? "||" : ">";
    playBtn.title = playerState.isPlaying ? "pausar" : "tocar";
  }
}

function updateVolumeButton() {
  const volumeBtn = document.getElementById("volume-btn");
  if (volumeBtn) {
    volumeBtn.textContent = playerState.isMuted ? "X" : "♪";
    volumeBtn.title = playerState.isMuted ? "ativar som" : "silenciar";
  }
}

function updateTrackInfo() {
  const trackInfo = document.getElementById("track-info");
  if (trackInfo) {
    trackInfo.textContent = playerState.currentTrack;
  }
}

function sendCommand(cmd, args = []) {
  const iframe = document.getElementById("emo-player").contentWindow;
  iframe.postMessage(JSON.stringify({
    event: "command",
    func: cmd,
    args: args
  }), "*");
}

function togglePlayPause() {
  if (playerState.isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  if (!document.getElementById("emo-player").src) {
    loadPlayer();
  }
  sendCommand("playVideo");
  playerState.isPlaying = true;
  updatePlayPauseButton();
}

function pauseMusic() {
  sendCommand("pauseVideo");
  playerState.isPlaying = false;
  updatePlayPauseButton();
}

function toggleMute() {
  if (playerState.isMuted) {
    sendCommand("unMute");
    playerState.isMuted = false;
  } else {
    sendCommand("mute");
    playerState.isMuted = true;
  }
  updateVolumeButton();
}

function setVolume(level) {
  playerState.volume = level;
  sendCommand("setVolume", [level]);
  
  // Update muted state based on volume
  playerState.isMuted = level === 0;
  updateVolumeButton();
}

function nextTrack() {
  sendCommand("nextVideo");
}

function prevTrack() {
  sendCommand("previousVideo");
}

