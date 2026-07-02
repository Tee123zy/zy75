(function () {
  const music = new Audio('../assets/audio/our-story-music.mp3?v=story-015-auto');
  music.loop = true;
  music.volume = 0.15;
  music.preload = 'auto';
  music.autoplay = true;

  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .story-sound-toggle {
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 50;
        min-height: 42px;
        padding: 10px 14px;
        border: 1px solid rgba(197, 166, 96, 0.85);
        border-radius: 999px;
        background: rgba(10, 10, 9, 0.78);
        color: #f7f1df;
        font-family: "DM Sans", "Noto Sans SC", "Noto Sans TC", sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.24);
        backdrop-filter: blur(14px);
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transform: translateY(8px);
        transition: opacity .25s ease, transform .25s ease;
      }

      .story-sound-toggle.is-needed {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
      }

      .story-sound-toggle.is-playing {
        background: #c5a660;
        color: #10100e;
      }

      @media (max-width: 760px) {
        .story-sound-toggle {
          right: 16px;
          bottom: 16px;
        }
      }
    </style>
  `);

  const soundButton = document.createElement('button');
  soundButton.type = 'button';
  soundButton.className = 'story-sound-toggle';
  soundButton.textContent = 'Play music / 播放音乐';
  soundButton.setAttribute('aria-label', 'Play Our Story music');
  document.body.appendChild(soundButton);

  const needsFallback = () => {
    soundButton.classList.add('is-needed');
  };

  const syncButton = () => {
    const isPlaying = !music.paused;
    soundButton.classList.toggle('is-playing', isPlaying);
    soundButton.textContent = isPlaying ? 'Music on / 音乐中' : 'Play music / 播放音乐';
    if (isPlaying) {
      soundButton.classList.remove('is-needed');
    }
  };

  const startMusic = () => {
    music.play().then(syncButton).catch(() => {
      syncButton();
      needsFallback();
    });
  };

  soundButton.addEventListener('click', (event) => {
    event.stopPropagation();

    if (music.paused) {
      startMusic();
      return;
    }

    music.pause();
    syncButton();
  });

  const cameFromStoryLink = sessionStorage.getItem('zealStoryMusic') === 'start';
  sessionStorage.removeItem('zealStoryMusic');

  if (cameFromStoryLink || document.visibilityState === 'visible') {
    startMusic();
  }

  ['pointerdown', 'click', 'touchstart', 'keydown'].forEach((eventName) => {
    window.addEventListener(eventName, startMusic, { once: true, passive: true });
  });

  window.addEventListener('pageshow', startMusic, { once: true });

  syncButton();
})();
