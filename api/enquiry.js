import { Resend } from 'resend';
import { pack } from '../lib/sign.js';

const resend = new Resend(process.env.RESEND_API_KEY);

function esc(s) {
  return String(s).replace(/[&<>"]/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, service, date, eventTime, location, website } = req.body || {};

  if (website) return res.status(200).json({ ok: true });
  if (!name || !email || !date || !service)
    return res.status(400).json({ error: 'missing fields' });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
    return res.status(400).json({ error: 'bad date' });

  const token = pack({
    name, email, service, date,
    eventTime: eventTime || '',
    location: location || '',
    ts: Date.now(),
  });

  const site = 'https://' + req.headers.host;
  const link = site + '/api/confirm?t=' + token;

  const rows = [
    ['姓名', name], ['电邮', email], ['项目', service],
    ['日期', date], ['时间', eventTime || '未填'], ['地点', location || '未填'],
  ].map(([k, v]) =>
    '<tr><td style="padding:6px 14px 6px 0;color:#8a8378">' + k +
    '</td><td style="padding:6px 0">' + esc(v) + '</td></tr>'
  ).join('');

  await resend.emails.send({
    from: 'Zeal Website <onboarding@resend.dev>',
    to: process.env.STUDIO_EMAIL,
    replyTo: email,
    subject: '新询问 · ' + name + ' · ' + date,
    html:
      '<div style="font-family:system-ui,sans-serif;max-width:520px">' +
        '<h2 style="font-weight:500">新的拍摄询问</h2>' +
        '<table style="font-size:14px;border-collapse:collapse">' + rows + '</table>' +
        '<p style="margin:24px 0 8px">' +
          '<a href="' + link + '" style="background:#1a1815;color:#fff;' +
          'text-decoration:none;padding:12px 22px;border-radius:8px;' +
          'display:inline-block">确认接单，加入日历</a>' +
        '</p>' +
        '<p style="font-size:12px;color:#8a8378">不接就忽略这封信，日历不会有变动。</p>' +
      '</div>',
  });

  res.status(200).json({ ok: true });
}
