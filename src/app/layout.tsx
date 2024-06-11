import type { Metadata } from "next";
import "../styles/main.scss";
import NextAuthProvider from "@/components/NextAuthProvider/NextAuthProvider";

export const metadata: Metadata = {
  title: "KinoMoe",
  description: "Entertainment platform for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
