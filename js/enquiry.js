(function () {
  const form = document.querySelector('.enquiry form');
  if (!form) return;

  const fields = form.querySelectorAll('input, select');
  const names = ['name', 'email', 'service', 'date', 'location', 'eventTime'];
  fields.forEach((el, i) => { if (names[i]) el.name = names[i]; });

  const dateEl = form.querySelector('[name="date"]');
  if (dateEl) { dateEl.type = 'date'; dateEl.required = true; }
  const timeEl = form.querySelector('[name="eventTime"]');
  if (timeEl) timeEl.type = 'time';

  const hp = document.createElement('input');
  hp.name = 'website';
  hp.tabIndex = -1;
  hp.autocomplete = 'off';
  hp.style.display = 'none';
  form.appendChild(hp);

  const btn = form.querySelector('button[type="submit"]');
  const status = document.createElement('p');
  status.style.cssText = 'margin:14px 0 0;font-size:13px;color:#a49f95';
  form.appendChild(status);

  form.addEventListener('submit', async function (ev) {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    btn.disabled = true;
    status.style.color = '#a49f95';
    status.textContent = 'Sending… 传送中…';
    try {
      const r = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!r.ok) throw new Error();
      form.reset();
      status.style.color = '#b99a62';
      status.textContent = 'Received. We will reply within a working day. 已收到，我们会在一个工作日内回复。';
    } catch (err) {
      status.style.color = '#c96a5a';
      status.textContent = 'Something went wrong. Please WhatsApp us. 传送失败，请用 WhatsApp 联系我们。';
    } finally {
      btn.disabled = false;
    }
  });
})();
