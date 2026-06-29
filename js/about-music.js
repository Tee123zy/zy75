(function () {
  const music = new Audio('../assets/audio/our-story-music.mp3');
  music.loop = true;
  music.volume = 0.15;
  music.preload = 'auto';

  const startMusic = () => {
    music.play().catch(() => {});
  };

  startMusic();

  ['click', 'touchstart', 'keydown'].forEach((eventName) => {
    window.addEventListener(eventName, startMusic, { once: true, passive: true });
  });
})();
