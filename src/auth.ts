import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const ALLOWED_DOMAINS = ["college.harvard.edu"];
const ALLOWED_EMAILS = ["treasurer@thehua.org"];

function isAllowed(email: string | null | undefined): boolean {
  if (!email) return false;
  const domain = email.split("@")[1] ?? "";
  return ALLOWED_DOMAINS.includes(domain) || ALLOWED_EMAILS.includes(email);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      authorization: { params: { prompt: "select_account" } },
    }),
  ],
  callbacks: {
    signIn({ profile }) {
      return isAllowed(profile?.email);
    },
    session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/grant-application/sign-in",
    error: "/grant-application/sign-in",
  },
});
