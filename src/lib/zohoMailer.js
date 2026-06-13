// src/lib/zohoMailer.js
// Simple wrapper for sending transactional emails via Zoho XMTP API.
// Expects ZOHO_XMTP_API_KEY and ZOHO_XMTP_DOMAIN in environment variables.

export async function sendZohoEmail({ to, subject, html }) {
  const apiKey = process.env.ZOHO_XMTP_API_KEY;
  const domain = process.env.ZOHO_XMTP_DOMAIN;
  if (!apiKey || !domain) {
    console.warn('Zoho XMTP credentials missing');
    return false;
  }
  const url = `https://mail.zoho.com/api/v2/${domain}/messages`;
  const payload = {
    fromAddress: `no-reply@${domain}`,
    toAddress: [to],
    subject,
    content: html,
  };
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-authtoken ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error('Zoho email failed', await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error('Zoho email error', e);
    return false;
  }
}
