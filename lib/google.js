import { google } from 'googleapis';

const oauth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);
oauth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

export const calendar = google.calendar({ version: 'v3', auth: oauth });
export const CAL_ID = process.env.CALENDAR_ID;
export const TZ = 'Asia/Kuala_Lumpur';
