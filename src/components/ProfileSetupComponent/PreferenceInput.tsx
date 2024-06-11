"use client";
import React, { InputHTMLAttributes } from "react";
import "./PreferenceInput.scss";
import Image, { StaticImageData } from "next/image";

type PreferenceInputProps = {
  name: string;
  title: string;
  logo?: StaticImageData;
  handler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  restProps?: InputHTMLAttributes<HTMLInputElement>;
  checkInput?: boolean;
};

function PreferenceInput({
  name,
  title,
  handler,
  logo,
  checkInput,
}: PreferenceInputProps) {
  return (
    <div className="user-preference">
      <input
        onChange={handler}
        className="user-preference__input"
        name={name}
        id={name}
        type="checkbox"
        value={title}
        checked={checkInput}
      />
      <label className="user-preference__label" htmlFor={name}>
        {logo ? <Image alt={name} src={logo} width={50} height={50} /> : null}
        {title}
      </label>
    </div>
  );
}

export default PreferenceInput;
