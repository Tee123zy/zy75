const CALENDAR_ID = 'primary';

function doPost(event) {
  const data = JSON.parse(event.postData.contents || '{}');
  const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
  const start = getStartDate_(data.date, data.eventTime);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const title = `ZEAL enquiry - ${data.name || 'New client'}`;
  const description = [
    `Name: ${data.name || '-'}`,
    `Email: ${data.email || '-'}`,
    `Service: ${data.service || '-'}`,
    `Requested date: ${data.date || '-'}`,
    `Event time: ${data.eventTime || '-'}`,
    `Location: ${data.location || '-'}`,
    '',
    'Terms agreed: Yes',
    `Submitted: ${new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' })}`
  ].join('\n');

  calendar.createEvent(title, start, end, {
    description,
    location: data.location || ''
  });

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getStartDate_(dateText, timeText) {
  const now = new Date();
  const fallback = new Date(now.getTime() + 60 * 60 * 1000);
  const dateMatch = String(dateText || '').match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if (!dateMatch) return fallback;

  const timeMatch = String(timeText || '').match(/(\d{1,2})(?::|\.)(\d{2})/);
  const hour = timeMatch ? Number(timeMatch[1]) : 10;
  const minute = timeMatch ? Number(timeMatch[2]) : 0;

  return new Date(
    Number(dateMatch[1]),
    Number(dateMatch[2]) - 1,
    Number(dateMatch[3]),
    hour,
    minute
  );
}
