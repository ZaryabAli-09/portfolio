import "server-only";
import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function expectedToken() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  const secret = process.env.ADMIN_SESSION_SECRET || "portfolio-admin";
  return crypto
    .createHash("sha256")
    .update(`${password}:${secret}`)
    .digest("hex");
}

/** Verify a submitted password against ADMIN_PASSWORD. Returns a session token if valid. */
export function verifyPassword(password) {
  if (!process.env.ADMIN_PASSWORD) return null;
  const expected = expectedToken();
  const a = Buffer.from(password || "");
  const b = Buffer.from(process.env.ADMIN_PASSWORD);
  if (a.length !== b.length) return null;
  const valid = crypto.timingSafeEqual(a, b);
  return valid ? expected : null;
}

export function setSessionCookie(token) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export function clearSessionCookie() {
  cookies().delete(COOKIE_NAME);
}

/** Check whether the current request carries a valid admin session cookie. */
export function isAuthenticated() {
  const expected = expectedToken();
  if (!expected) return false;
  const cookie = cookies().get(COOKIE_NAME);
  return cookie?.value === expected;
}
