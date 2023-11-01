import { COOKIE_NAME } from "@/constants";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);
  if (!token) {
    return new Response(
      JSON.stringify({
        message: "Unauthorized",
      }),
      {
        status: 401,
      },
    );
  }
  const { value } = token;
  const secret = `${process.env.JWT_SECRET}` || "";
  try {
    verify(value, secret);
    return new Response(
      JSON.stringify({
        message: "Authorized!",
      }),
      {
        status: 200,
      },
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
      }),
      {
        status: 400,
      },
    );
  }
}
