import React from "react";
import "./ButtonComponents.scss";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface LinkProps {
  logo?: StaticImageData;
  customStyles?: string;
  destination: string;
  children: React.ReactNode;
  alt?: string;
}

const MainLinkComponent: React.FC<LinkProps> = ({
  destination,
  logo,
  alt,
  customStyles,
  children,
  ...rest
}) => {
  return (
    <Link
      href={destination}
      className={`btn btn--link ${customStyles}`}
      {...rest}
    >
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
    </Link>
  );
};

export default MainLinkComponent;
