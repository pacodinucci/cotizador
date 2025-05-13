// import { auth } from "./auth";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  adminRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  console.log("✅ Middleware ejecutándose en:", req.nextUrl.pathname);
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  // const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && isAdminRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  if (isAdminRoute) {
    console.log("IS ADMIN ROUTE");
    const role = req.auth?.user?.role;
    if (role !== "ADMIN") {
      return Response.redirect(new URL("/", nextUrl));
    }
  }

  return;
});

// export const config = {
//   // matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
//   matcher: ["/((?!_next|api|.*\\..*).*)"],
// };
