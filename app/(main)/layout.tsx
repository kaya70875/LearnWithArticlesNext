import type { Metadata } from "next";
import "../globals.css";
import { Open_Sans } from "next/font/google";
import SessionProvider from "../../providers/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Learn With Articles",
  description: "Learn English and write better with articles",
};

const openSans = Open_Sans({ subsets: ["latin"] });

const session = await getServerSession(authOptions);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className} antialiased`} suppressHydrationWarning
      >
        <main className="bg-main h-screen">
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
