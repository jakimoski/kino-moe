"use client";
import { useState } from "react";
import MainButtonComponent from "../ButtonComponents/MainButtonComponent";
import Image from "next/image";

import ArtistIcon from "@public/assets/icons/Artist Icon.png";
import ViewerIcon from "@public/assets/icons/iconoir_user-bag.png";
import RightArow from "@public/assets/icons/right-arow.png";
import { useSetStep, useUserProfile } from "@/store/userProfile";

function ChooseTypeComponent() {
  const [accountType, setAccountType] = useState("viewer");
  const step = useSetStep((state) => state.step);
  const increaseStep = useSetStep((state) => state.increaseStep);
  // const decreaseStep = useSetStep((state) => state.decreaseStep);

  const user = useUserProfile((state) => state.user);
  const setUser = useUserProfile((state) => state.setUser);

  const handleType = () => {
    setUser({ ...user, accountType });
    increaseStep();
  };

  return (
    <div>
      <h2 className="profile-setup__title">
        <span className="profile-setup__title--step">{step}</span>Join as a
        viewer or artist:
      </h2>
      <div className="profile-setup__wrapper">
        <div className="profile-setup__box ">
          <label className="profile-setup__label">
            <input
              type="checkbox"
              onChange={() => setAccountType("artist")}
              checked={accountType === "artist"}
              className="profile-setup__checkbox"
            />
            <span className="profile-setup__checkbox__content">
              <Image
                className="profile-setup__checkbox__icon"
                src={ArtistIcon}
                alt="artist"
              />
              <span className="profile-setup__checkbox__title">
                Sign up as Artist
              </span>
            </span>
          </label>
        </div>
        <div className="profile-setup__box ">
          <label className="profile-setup__label">
            <input
              onChange={() => setAccountType("viewer")}
              type="checkbox"
              checked={accountType === "viewer"}
              className="profile-setup__checkbox"
            />
            <span className="profile-setup__checkbox__content">
              <Image
                className="profile-setup__checkbox__icon"
                src={ViewerIcon}
                alt="viewer"
              />
              <span className="profile-setup__checkbox__title">
                Sign up as Viewer
              </span>
            </span>
          </label>
        </div>
      </div>
      <div className="profile-setup__buttons">
        <MainButtonComponent
          customStyles="btn--icon--sm"
          rightLogo={RightArow}
          handler={handleType}
          alt="Next"
        >
          Next
        </MainButtonComponent>
      </div>
    </div>
  );
}

export default ChooseTypeComponent;
