(() => {
  const title = '我爱钱 钱爱我';
  const videoUrl = 'https://youtu.be/s0XUDdU37RE?si=3oaHdZ8GWRvJQ7sm';
  const thumbnail = 'https://i.ytimg.com/vi/s0XUDdU37RE/maxresdefault.jpg';
  const description = 'A 2026 music video with a bold, playful visual rhythm.';

  const video = videoProjects.find((item) => item.title === 'Rasa / Every day');
  if (video) Object.assign(video, { title, category: 'MV', year: '2025', thumbnail, videoUrl, description });

  const selectedCard = [...document.querySelectorAll('#workGrid .project')]
    .find((card) => card.querySelector('h3')?.textContent.trim() === 'Rasa / Every day');
  if (selectedCard) {
    const card = document.createElement('a');
    card.className = 'project';
    card.href = videoUrl;
    card.target = '_blank';
    card.rel = 'noopener';
    card.innerHTML = `<img src="${thumbnail}" alt="${title}"><div><p>MV · 2025</p><h3>${title}</h3></div>`;
    selectedCard.replaceWith(card);
  }

  if (typeof renderArchive === 'function') renderArchive();
})();
