"use client";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import "./ButtonComponents.scss";
import Image, { StaticImageData } from "next/image";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  logo?: StaticImageData;
  customStyles?: string;
  handler?: React.MouseEventHandler<HTMLButtonElement>;
  alt?: string;
  rightLogo?: StaticImageData;
}

const MainButtonComponent = ({
  handler,
  logo,
  alt,
  rightLogo,
  customStyles,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button onClick={handler} className={`btn ${customStyles}`} {...rest}>
      {logo && (
        <Image
          width={24}
          height={24}
          className="btn__logo"
          src={logo}
          alt={alt as string}
        />
      )}
      <span className="btn__children">{children}</span>
      {rightLogo && (
        <Image
          width={24}
          height={24}
          className="btn__logo--right"
          src={rightLogo}
          alt={alt as string}
        />
      )}
    </button>
  );
};

export default MainButtonComponent;
