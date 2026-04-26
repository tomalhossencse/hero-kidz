import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoutes = ["/dashbaord", "/cart", "/checkout", "/my-orders"];

export async function proxy(req) {
  const token = await getToken({ req });
  // console.log(token);

  const isLogin = Boolean(token);

  const reqPath = req.nextUrl.pathname;

  const isPrivate = privateRoutes.some((route) => reqPath.startsWith(route));

  if (!isLogin && isPrivate) {
    // const loginUrl = new URL("/login", req.url);
    // loginUrl.searchParams.set("callbackUrl", reqPath);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${reqPath}`, req.url),
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashbaord/:path*",
    "/cart/:path*",
    "/checkout/:path*",
    "/my-orders/:path*",
  ],
};
