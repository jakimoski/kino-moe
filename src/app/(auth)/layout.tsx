import React from "react";
import "@styles/pages/auth.scss";
import background from "/public/assets/backgrounds/Side_Picture.png";
import Image from "next/image";
import logo from "@public/assets/icons/Logo-version.png";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="auth-layout">{children}</main>;
}
