import { unpack } from '../lib/sign.js';

function plus2h(t) {
  const [H, M] = t.split(':').map(Number);
  return String((H + 2) % 24).padStart(2, '0') + ':' + String(M || 0).padStart(2, '0');
}

function nextDay(d) {
  const x = new Date(d);
  x.setDate(x.getDate() + 1);
  return x.toISOString().slice(0, 10);
}

function page(res, code, title, msg, url) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(code).send(
    '<div style="font-family:system-ui,sans-serif;max-width:560px;margin:80px auto;padding:0 20px;text-align:center">' +
      '<h1 style="font-weight:500;font-size:22px">' + title + '</h1>' +
      '<p style="color:#6f6a61;line-height:1.7;word-break:break-word">' + msg + '</p>' +
      (url ? '<a href="' + url + '">在 Google 日历打开</a>' : '') +
    '</div>'
  );
}

export default async function handler(req, res) {
  try {
    const e = unpack(req.query.t);
    if (!e) return page(res, 400, '连结无效', '这个确认连结不正确或已被更动。');
    if (Date.now() - e.ts > 7 * 864e5)
      return page(res, 410, '连结已过期', '请直接联络客户，或手动加入日历。');

    const { calendar, CAL_ID, TZ } = await import('../lib/google.js');

    const body = {
      summary: e.service + ' — ' + e.name,
      location: e.location,
      description: '来自网站联络表单\n' + e.service + '\n联络：' + e.email,
      status: 'confirmed',
      transparency: 'opaque',
    };

    if (e.eventTime) {
      body.start = { dateTime: e.date + 'T' + e.eventTime + ':00', timeZone: TZ };
      body.end = { dateTime: e.date + 'T' + plus2h(e.eventTime) + ':00', timeZone: TZ };
    } else {
      body.start = { date: e.date };
      body.end = { date: nextDay(e.date) };
    }

    const { data } = await calendar.events.insert({
      calendarId: CAL_ID,
      requestBody: body,
    });

    return page(res, 200, '已加入日历', e.name + ' · ' + e.date + ' 已建立活动。', data.htmlLink);
  } catch (err) {
    return page(res, 500, '出错了', String(err && err.message || err));
  }
}
