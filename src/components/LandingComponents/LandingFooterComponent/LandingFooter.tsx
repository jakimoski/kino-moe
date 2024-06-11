import React from "react";
import "./LandingFooter.scss";
import Image from "next/image";
import Logo from "@public/assets/icons/LOGO.png";

const IMAGE_WIDTH = 250;
const IMAGE_HEIGHT = 100;

export default function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="landing-footer__wrapper">
        <span className="landing-footer__name">
          Kinemoe.mk {`© ${new Date().getFullYear()}`}
        </span>
        <Image
          className="landing-footer__logo"
          src={Logo}
          alt="footer"
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
        ></Image>
      </div>
    </footer>
  );
}
