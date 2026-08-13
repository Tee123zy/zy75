import crypto from 'crypto';

const SECRET = process.env.SIGNING_SECRET;

export function pack(obj) {
  const data = Buffer.from(JSON.stringify(obj)).toString('base64url');
  const sig = crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
  return `${data}.${sig}`;
}

export function unpack(token) {
  const [data, sig] = String(token || '').split('.');
  if (!data || !sig) return null;
  const expect = crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
  if (sig.length !== expect.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expect))) return null;
  try {
    return JSON.parse(Buffer.from(data, 'base64url').toString());
  } catch {
    return null;
  }
}
