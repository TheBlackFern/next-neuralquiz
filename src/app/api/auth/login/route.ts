import { COOKIE_NAME, MAX_AGE } from "@/constants";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

export async function POST(request: Request) {
  const res = await request.json();
  const { username, password } = res;
  if (username !== "admin" || password !== "admin") {
    return new Response(
      JSON.stringify({
        message: "Unauthorized",
      }),
      {
        status: 401,
      },
    );
  }
  const secret = `${process.env.JWT_SECRET}` || "";
  const token = sign(
    {
      username,
    },
    secret,
    {
      expiresIn: MAX_AGE,
    },
  );
  const serialized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });
  const response = {
    message: "Authenticated!",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": serialized },
  });
}
