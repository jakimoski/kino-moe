"use client";
import "./profilesetup.scss";
import ChooseTypeComponent from "./ChooseType";
import ChooseSubscriptionComponent from "./ChooseSubscription";
import ProfileInfo from "./ProfileInfo";
import ProfilePreferences from "./ProfilePreferences";
import { useSetStep, useUserProfile } from "@/store/userProfile";
import { redirect } from "next/navigation";
import ShowMeAround from "./ShowMeAround";

function ProfileSetupComponent() {
  const step = useSetStep((state) => state.step);
  const user = useUserProfile((state) => state.user);

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="profile-setup">
      {step === 1 ? <ChooseTypeComponent /> : null}
      {step === 2 ? <ChooseSubscriptionComponent /> : null}
      {step === 3 ? <ProfileInfo /> : null}
      {step === 4 ? <ShowMeAround /> : null}
      {step === 5 ? <ProfilePreferences /> : null}
    </div>
  );
}

export default ProfileSetupComponent;
