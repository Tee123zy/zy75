(function () {
  const isGamePage = /\/play\.html$/.test(window.location.pathname);

  if (!isGamePage) return;

  const music = new Audio('assets/audio/game-tom-and-jerry.mp3?v=game-tom-jerry-0-3');
  music.loop = true;
  music.volume = 0.3;
  music.preload = 'auto';

  let started = false;

  function playBackgroundMusic() {
    if (started) return;
    started = true;
    music.play().catch(() => {
      started = false;
    });
  }

  playBackgroundMusic();
  document.addEventListener('pointerdown', playBackgroundMusic, { once: true });
  document.addEventListener('keydown', playBackgroundMusic, { once: true });
}());
