import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authMiddleware, clerkClient } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/", "/api/(.*)"],
  async afterAuth(auth, req) {
    if (!req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.next();
    }

    if (!auth.userId) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }

    const passkeyConfirmed = req.cookies.get('admin_passkey_confirmed')?.value === 'true';
    if (!passkeyConfirmed) {
      const verifyPasskeyUrl = new URL('/verify-passkey', req.url);
      verifyPasskeyUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(verifyPasskeyUrl);
    }

    // Optional: Check if user has admin rights
    // try {
    //   const user = await clerkClient.users.getUser(auth.userId);
    //   if (!user.publicMetadata.isAdmin) {
    //     return NextResponse.redirect(new URL('/', req.url));
    //   }
    // } catch (error) {
    //   console.error("Error checking admin status:", error);
    //   return NextResponse.redirect(new URL('/', req.url));
    // }

    // return NextResponse.next();
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};