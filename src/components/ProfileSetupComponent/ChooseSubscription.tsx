import React from "react";
import PricingComponent from "../PricingComponent/PricingComponent";
import MainButtonComponent from "../ButtonComponents/MainButtonComponent";
import RightArrow from "@public/assets/icons/right-arow.png";
import LeftArrow from "@public/assets/icons/left_arow.png";
import { useSetStep, useUserProfile } from "@/store/userProfile";

type ChooseSubscriptionProps = {
  step: number;
  setStep: (prev: number) => void;
};

function ChooseSubscriptionComponent() {
  const user = useUserProfile((state) => state.user);
  const step = useSetStep((state) => state.step);
  const setUser = useUserProfile((state) => state.setUser);
  const increaseStep = useSetStep((state) => state.increaseStep);
  const decreaseStep = useSetStep((state) => state.decreaseStep);

  const handleFreeSubscription = () => {
    setUser({ ...user, accountType: "free" });
  };

  const handlePaidSubscription = () => {
    setUser({ ...user, accountType: "paid" });
  };

  const handlePointsSubscription = () => {
    setUser({ ...user, accountType: "points" });
  };

  return (
    <div>
      <h2 className="profile-setup__title">
        <span className="profile-setup__title--step">{step}</span>How do you
        wish to engage with kinemoe?
      </h2>
      <PricingComponent
        handleFreeSubscription={handleFreeSubscription}
        handlePaidSubscription={handlePaidSubscription}
        handlePointsSubscription={handlePointsSubscription}
      />
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
          handler={() => increaseStep()}
          alt="Next"
        >
          Next
        </MainButtonComponent>
      </div>
    </div>
  );
}

export default ChooseSubscriptionComponent;
