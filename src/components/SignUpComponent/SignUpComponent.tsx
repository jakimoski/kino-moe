"use client";
import { useState } from "react";
import Image from "next/image";
import "../SignInComponent/SignInComponent.scss";
import MainButtonComponent from "../ButtonComponents/MainButtonComponent";
import GoogleLogo from "../../../public/assets/icons/flat-color-icons_google.png";
import FacebookLogo from "../../../public/assets/icons/facebook.png";
import AppleLogo from "../../../public/assets/icons/apple-filled.png";
import logo from "../../../public/assets/icons/Logo-version.png";
import { isValidEmail, isValidPassword } from "@/utils/validity";
import Input from "../FormComponent/Input";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/store/userProfile";
import { hashPassword } from "@/lib/actions";

const IMAGE_HEIGHT = 60;
const IMAGE_WIDTH = 280;

const SignUpComponent: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const setUser = useUserProfile((state) => state.setUser);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if email is valid
    if (email.trim() === "") {
      setEmailError("Please enter your email");
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email");
      return;
    } else {
      setEmailError("");
    }

    // Check if password is valid
    if (password.trim().length < 6) {
      setPasswordError("Your password must be at least 6 characters long");
      return;
    } else if (!isValidPassword(password)) {
      setPasswordError(
        "Your password must contain at least one special character"
      );
    } else if (isValidPassword(password)) {
      setPasswordError("");
    }

    // Check if confirm password is valid
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Please confirm your password");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return;
    } else {
      setConfirmPasswordError("");
    }

    if (emailError || passwordError || confirmPasswordError) return;

    const newUSer = {
      email: email,
      password: await hashPassword(password),
    };

    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      console.error("Error signing up:", response.status);
      setEmailError("User with this email already exists");
      return;
    }

    if (response.ok) {
      setUser(newUSer);
      router.push("/profile-setup");
    }
  };

  const handleSignUpWithGoogle = () => {};

  const handleSignUpWithFacebook = () => {
    // Handle sign up with Facebook logic here
  };

  return (
    <div className="login-form">
      <div className="login-form__social">
        <Image
          className="login-form__logo"
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          src={logo}
          alt="logo"
        ></Image>
        <h3>Create your account</h3>
        <MainButtonComponent
          customStyles="btn--social"
          logo={GoogleLogo}
          alt="Google Logo"
          onClick={handleSignUpWithGoogle}
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
        <MainButtonComponent
          customStyles="btn--social"
          logo={AppleLogo}
          alt="Google Logo"
          onClick={handleSignUpWithFacebook}
        >
          Sign up with Apple
        </MainButtonComponent>
      </div>

      <p className="form__divider"></p>

      <div>
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

          <Input
            label={"Confirm Password"}
            value={confirmPassword}
            error={confirmPasswordError}
            type={"password"}
            id={"confirm-password"}
            changeHandler={setConfirmPassword}
          ></Input>

          <MainButtonComponent customStyles="btn--form  ">
            Register
          </MainButtonComponent>
        </form>
      </div>
    </div>
  );
};

export default SignUpComponent;
