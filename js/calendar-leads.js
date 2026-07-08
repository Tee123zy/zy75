window.ZEAL_CALENDAR_WEBHOOK_URL = '';

window.ZealCalendarLead = {
  send(lead) {
    const url = window.ZEAL_CALENDAR_WEBHOOK_URL;
    if (!url || !lead) return;

    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(lead)
    }).catch(() => {});
  }
};
