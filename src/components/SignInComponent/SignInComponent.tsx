"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import "./SignInComponent.scss";
import MainButtonComponent from "../ButtonComponents/MainButtonComponent";
import GoogleLogo from "@public/assets/icons/flat-color-icons_google.png";
import FacebookLogo from "@public/assets/icons/facebook.png";
import logo from "@public/assets/icons/Logo-version.png";
import { isValidEmail } from "@/utils/validity";
import Input from "../FormComponent/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const IMAGE_HEIGHT = 60;
const IMAGE_WIDTH = 280;

const SignInComponent = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if email is valid
    if (email.trim() === "") {
      setEmailError("Please enter your email");
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }

    // Check if password is valid
    if (password.trim() === "") {
      setPasswordError("Please enter your password");
      return;
    } else {
      setPasswordError("");
    }

    const signInData = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (signInData?.error) {
      setEmailError("Invalid email or password");
      setPasswordError("Invalid email or password");
    } else {
      router.push("/home");
    }
  };

  const googleSignInHandler = () => {
    signIn("google", { callbackUrl: "/home" });
  };

  const handleSignUpWithFacebook = () => {
    signIn("facebook", { callbackUrl: "/home" });
  };

  return (
    <div className="login-form">
      <Image
        className="login-form__logo"
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        src={logo}
        alt="logo"
      ></Image>
      <h3>Welcome!</h3>
      <p>Join us!</p>
      <form noValidate className="form" onSubmit={handleSignIn}>
        <Input
          label={"Email address"}
          value={email}
          error={emailError}
          type={"email"}
          id={"email"}
          changeHandler={setEmail}
        ></Input>
        <Input
          label={"Password"}
          value={password}
          error={passwordError}
          type={"password"}
          id={"password"}
          changeHandler={setPassword}
        ></Input>

        <MainButtonComponent type="submit" customStyles="btn--form  ">
          Sign In
        </MainButtonComponent>
      </form>

      <div className="login-form__social">
        <p className="form__divider"></p>
        <MainButtonComponent
          handler={googleSignInHandler}
          customStyles="btn--social"
          logo={GoogleLogo}
          alt="Google Logo"
        >
          Sign Up with Google
        </MainButtonComponent>
        <MainButtonComponent
          customStyles="btn--social"
          logo={FacebookLogo}
          alt="Google Logo"
          onClick={handleSignUpWithFacebook}
        >
          Sign Up with Facebook
        </MainButtonComponent>
      </div>

      <Link className="login-form__link" href="/sign-up">
        Create a new account
      </Link>
    </div>
  );
};

export default SignInComponent;
