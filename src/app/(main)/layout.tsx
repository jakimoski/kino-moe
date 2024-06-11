import FooterComponent from "@/components/FooterComponent/FooterComponent";
import NavbarComponent from "@/components/NavbarComponent/NavbarComponent";
import { authOptions } from "@/lib/auth";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "KinoMoe - Series",
  description: "Entertainment platform for everyone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  return (
    <>
      <NavbarComponent />
      {children}
      <FooterComponent />
    </>
  );
}
