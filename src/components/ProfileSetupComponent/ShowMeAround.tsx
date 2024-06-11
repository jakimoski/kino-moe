"use client";
import { useState } from "react";
import MainButtonComponent from "../ButtonComponents/MainButtonComponent";
import RightArrow from "@public/assets/icons/right-arow.png";
import LeftArrow from "@public/assets/icons/left_arow.png";
import ShowMeLogo from "@public/assets/icons/show-me-around.png";
import DiveInLogo from "@public/assets/icons/dive-in.png";
import { useSetStep, useUserProfile } from "@/store/userProfile";
import PreferenceInput from "./PreferenceInput";

function ShowMeAround() {
  const [showMeAround, setShowMeAround] = useState<boolean>(false);
  const step = useSetStep((state) => state.step);
  const increaseStep = useSetStep((state) => state.increaseStep);
  const decreaseStep = useSetStep((state) => state.decreaseStep);

  const user = useUserProfile((state) => state.user);
  const setUser = useUserProfile((state) => state.setUser);

  const handleGoNext = () => {
    setUser({ ...user, showMeAround });
    increaseStep();
  };

  return (
    <div className="profile-setup">
      <div className="profile-setup__wrapper">
        <h2 className="profile-setup__title">
          <span className="profile-setup__title--step">{step}</span>How do you
          wish to engage with kinemoe?
        </h2>
        <div className="profile-setup__inputs">
          <PreferenceInput
            name="show"
            title="Show me around"
            logo={ShowMeLogo}
            handler={() => setShowMeAround(true)}
            checkInput={showMeAround === true}
          />
          <PreferenceInput
            name="dive-in"
            title="Dive right in and explore"
            logo={DiveInLogo}
            handler={() => setShowMeAround(false)}
            checkInput={showMeAround === false}
          />
        </div>
      </div>
      <div className="profile-setup__buttons">
        <MainButtonComponent
          customStyles="btn--icon--sm"
          logo={LeftArrow}
          handler={() => decreaseStep()}
          alt="Back"
        >
          Back
        </MainButtonComponent>
        <MainButtonComponent
          customStyles="btn--icon--sm"
          rightLogo={RightArrow}
          handler={handleGoNext}
          alt="Next"
        >
          Next
        </MainButtonComponent>
      </div>
    </div>
  );
}

export default ShowMeAround;
