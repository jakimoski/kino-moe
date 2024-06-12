"use client";
import React, { useRef } from "react";
import "./LandingHeaderComponent.scss";
import Logo from "@public/assets/icons/LOGO.png";
import Image from "next/image";
import LandingHeaderMovies from "./LandingHeaderMovies";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import icon1 from "@public/assets/icons/icon1.png";
import icon2 from "@public/assets/icons/icon2.png";
import icon3 from "@public/assets/icons/iscon3.png";
import icon4 from "@public/assets/icons/icon4.png";
import icon5 from "@public/assets/icons/icon5.png";

const IMAGE_WIDTH = 716;
const IMAGE_HEIGHT = 256;
const IMAGE_WIDTH_ICON = 150;
const IMAGE_HEIGHT_ICON = 150;

const variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
};

export default function LandingHeaderComponent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <header className="header-landing">
      <div>
        <Image
          className="header-landing-logo"
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          src={Logo}
          alt="Logo"
          style={{ width: "100%", height: "100%" }}
        ></Image>
      </div>
      <div className="header-landing-text">
        <h1>EXPLORE, ENGAGE & EXPRESS YOURSELF</h1>
        <h3>Watch, learn, collaborate beyond the screen</h3>
      </div>
      <div>
        <Link className="btn" href="/sign-in">
          Sign up/Log in
        </Link>
      </div>
      <LandingHeaderMovies />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 15,
          duration: 0.5,
        }}
        className="header-landing__icons"
      >
        <Image
          src={icon1}
          alt="icon1"
          width={IMAGE_WIDTH_ICON}
          height={IMAGE_HEIGHT_ICON}
        />
        <Image
          src={icon2}
          alt="icon2"
          width={IMAGE_WIDTH_ICON}
          height={IMAGE_HEIGHT_ICON}
        />
        <Image
          src={icon3}
          alt="icon3"
          width={IMAGE_WIDTH_ICON}
          height={IMAGE_HEIGHT_ICON}
        />
        <Image
          src={icon4}
          alt="icon4"
          width={IMAGE_WIDTH_ICON}
          height={IMAGE_HEIGHT_ICON}
        />
        <Image
          src={icon5}
          alt="icon5"
          width={IMAGE_WIDTH_ICON}
          height={IMAGE_HEIGHT_ICON}
        />
      </motion.div>
    </header>
  );
}
