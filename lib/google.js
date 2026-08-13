import { google } from 'googleapis';

const clean = (v) => (v || '').trim();

const oauth = new google.auth.OAuth2(
  clean(process.env.GOOGLE_CLIENT_ID),
  clean(process.env.GOOGLE_CLIENT_SECRET)
);
oauth.setCredentials({ refresh_token: clean(process.env.GOOGLE_REFRESH_TOKEN) });

export const calendar = google.calendar({ version: 'v3', auth: oauth });
export const CAL_ID = clean(process.env.CALENDAR_ID);
export const TZ = 'Asia/Kuala_Lumpur';
