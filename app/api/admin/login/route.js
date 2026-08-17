import { verifyPassword, setSessionCookie } from "@/lib/auth";

export async function POST(req) {
  try {
    const { password } = await req.json();
    const token = verifyPassword(password);

    if (!token) {
      return Response.json({ message: "Incorrect password." }, { status: 401 });
    }

    setSessionCookie(token);
    return Response.json({ message: "Logged in." }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Login failed.", error: error.message },
      { status: 500 },
    );
  }
}
