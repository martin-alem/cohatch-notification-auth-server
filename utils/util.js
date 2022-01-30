export function setCookie(res, key, value, expiration) {
  res.cookie(key, value, {
    expires: new Date(Date.now() + expiration * 3600000),
    httpOnly: true,
    domain: process.env.COOKIE_DOMAIN,
    sameSite: "lax",
  });
}
