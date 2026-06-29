(() => {
  const album = document.querySelector('#albumDialog');
  if (!album) return;
  const backButton = document.createElement('button');
  backButton.className = 'album-back';
  backButton.type = 'button';
  backButton.textContent = '← Back to Photography';
  backButton.addEventListener('click', () => album.close());
  album.querySelector('.close').insertAdjacentElement('afterend', backButton);
  const style = document.createElement('style');
  style.textContent = ".album-back{margin:0 0 28px;padding:10px 0;border:0;border-bottom:1px solid var(--gold);background:none;color:var(--bone);font:10px 'DM Mono';letter-spacing:.08em;text-transform:uppercase;cursor:pointer}.album-back:hover{color:var(--gold)}";
  document.head.appendChild(style);
})();
