import SignUpComponent from "@/components/SignUpComponent/SignUpComponent";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import background from "/public/assets/backgrounds/Side_Picture.png";
import logo from "@public/assets/icons/Logo-version.png";

export default async function SingIn() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/profile");
  }
  return (
    <section className="auth-layout__wrapper">
      <div className="auth-layout__left">
        <Image
          className="auth-layout__logo"
          width={280}
          height={60}
          src={logo}
          alt="logo"
          sizes="280px"
        ></Image>
        <Image
          className="auth-layout_background"
          src={background}
          alt="new"
          style={{ width: "100%", height: "100%" }}
          sizes="(min-width: 1040px) 40vw, 45vw"
          fill
        ></Image>
      </div>
      <div className="auth-layout__right">
        <SignUpComponent />
      </div>
    </section>
  );
}
