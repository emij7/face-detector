import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    login: "/login",
  },
  callbacks: {
    authorize({ auth, request: { nextUrl } }) {
      console.log("nexturl", nextUrl);
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname.match("");
      if (isOnHome) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
};
