"use client";
import "./ProfilePreferences.scss";

import PreferenceInput from "./PreferenceInput";
import MainButtonComponent from "../ButtonComponents/MainButtonComponent";
import { useUserSetup } from "@/hooks/userSetup";
import { useSetStep, useUserProfile } from "@/store/userProfile";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { supabase } from "@/lib/supabaseClient";

const profileInterests = [
  {
    name: "cinema",
    title: "Cinema",
  },
  {
    name: "visual-arts",
    title: "Visual Arts",
  },
  {
    name: "dance",
    title: "Dance",
  },
  {
    name: "theatre",
    title: "Theatre",
  },
  {
    name: "music",
    title: "Music",
  },
  {
    name: "literature",
    title: "Literature",
  },
];

const preferenceCultures = [
  {
    name: "macedonian",
    title: "Macedonian",
  },
  {
    name: "balkan",
    title: "Balkan Arts",
  },
  {
    name: "european",
    title: "European",
  },
  {
    name: "mediterranean",
    title: "Mediterranean",
  },
  {
    name: "global",
    title: "Global",
  },
];

const profileRecommendations = [
  {
    name: "action",
    title: "Action",
  },
  {
    name: "comedy",
    title: "Comedy",
  },
  {
    name: "drama",
    title: "Drama",
  },
  {
    name: "horror",
    title: "Horror",
  },
  {
    name: "science-fiction",
    title: "Science Fiction",
  },
  {
    name: "fantasy",
    title: "Fantasy",
  },
  {
    name: "romance",
    title: "Romance",
  },
  {
    name: "thriller",
    title: "Thriller",
  },
  {
    name: "documentary",
    title: "Documentary",
  },
];

function ProfilePreferences() {
  const {
    handleInterestChange,
    handleCultureChange,
    handleRecommendationChange,
    handlePrivacyChange,
    handleNotificationChange,
  } = useUserSetup();
  const router = useRouter();

  const user = useUserProfile((state) => state.user);
  const step = useSetStep((state) => state.step);

  const onSaveHandler = async (e: any) => {
    e.preventDefault();

    try {
      await supabase
        .from("User")
        .update({
          ...user,
        })
        .eq("email", user?.email);

      const signInData = await signIn("credentials", {
        email: user?.email,
        password: user?.password,
        redirect: false,
      });

      if (signInData?.error) {
        router.push("/sign-in");
      } else {
        router.push("/home");
      }
      localStorage.removeItem("user-preferences");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="profile-setup__title">
        <span className="profile-setup__title--step">{step}</span>Setup Profile
      </h2>
      <form className="user-preference-form" action="">
        <div className="user-preference-form__group">
          <h4 className="user-preference-form__title">
            Tell us what moves you. Select your interests to tailor your Kinemoe
            universe.
          </h4>
          <div className="user-preference-form__input-group">
            {profileInterests
              ? profileInterests.map((interest) => (
                  <PreferenceInput
                    key={interest.name}
                    name={interest.name}
                    title={interest.title}
                    handler={handleInterestChange}
                  />
                ))
              : null}
          </div>
        </div>
        <div className="user-preference-form__group">
          <div>
            <h4 className="user-preference-form__title">
              Which cultures resonate with you?
            </h4>
            <p>Your choices help us curate content just for you? </p>
          </div>
          <div className="user-preference-form__input-group">
            {preferenceCultures
              ? preferenceCultures.map((culture) => (
                  <PreferenceInput
                    key={culture.name}
                    name={culture.name}
                    title={culture.title}
                    handler={handleCultureChange}
                  />
                ))
              : null}
          </div>
          <div className="user-preference-form__group">
            <h4 className="user-preference-form__title">
              Content Recommendations
            </h4>
            <div className="user-preference-form__input-group">
              {profileRecommendations
                ? profileRecommendations.map((recommendation) => (
                    <PreferenceInput
                      key={recommendation.name}
                      name={recommendation.name}
                      title={recommendation.title}
                      handler={handleRecommendationChange}
                    />
                  ))
                : null}
            </div>
          </div>
          <div className="user-preference-form__group">
            <div>
              <h4 className="user-preference-form__title">
                Select your privacy settings
              </h4>
              <p>Choose who sees your profile:</p>
            </div>
            <div className="user-preference-form__input-group">
              <PreferenceInput
                handler={handlePrivacyChange}
                name="public"
                title="Public"
              />
              <PreferenceInput
                handler={handlePrivacyChange}
                name="friends"
                title="My friends"
              />
              <PreferenceInput
                handler={handlePrivacyChange}
                name="only-me"
                title="Only Me"
              />
            </div>
          </div>
          <div className="user-preference-form__group">
            <div>
              <h4 className="user-preference-form__title">Stay in the loop!</h4>
              <p>Set your preferences for updates and announcements.</p>
            </div>
            <div className="user-preference-form__input-group">
              <PreferenceInput
                name="email-notifications"
                title="Email Notifications"
                handler={handleNotificationChange}
              />
              <PreferenceInput
                name="push-notifications"
                title="Push Notifications"
                handler={handleNotificationChange}
              />
              <PreferenceInput
                name="no-notifications"
                title="No Notifications"
                handler={handleNotificationChange}
              />
            </div>
          </div>
        </div>
        <MainButtonComponent
          handler={onSaveHandler}
          type="submit"
          customStyles="btn--sm"
          title="Save"
        >
          Save
        </MainButtonComponent>
      </form>
    </div>
  );
}

export default ProfilePreferences;
