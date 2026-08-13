export default function handler(req, res) {
  const show = (v) => v
    ? { len: v.length, head: v.slice(0, 8), tail: v.slice(-6), spaced: v !== v.trim() }
    : 'MISSING';
  res.json({
    id: show(process.env.GOOGLE_CLIENT_ID),
    secret: show(process.env.GOOGLE_CLIENT_SECRET),
    refresh: show(process.env.GOOGLE_REFRESH_TOKEN),
    cal: show(process.env.CALENDAR_ID),
  });
}
