import type { Metadata } from "next";
import "../globals.css";
import { Open_Sans, Inter, Lora } from "next/font/google";
import SessionProvider from "../../providers/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ToastProvider } from "@/context/ToastContext";

export const metadata: Metadata = {
  title: "Learn With Articles",
  description: "Learn English and write better with articles",
};

const openSans = Open_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const lora = Lora({ subsets: ["latin"] });


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${lora.className} antialiased`} suppressHydrationWarning
      >
        <main className="bg-main min-h-screen">
          <SessionProvider session={session}>
            <ToastProvider>
              {children}
            </ToastProvider>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
