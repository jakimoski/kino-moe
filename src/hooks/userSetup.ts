/* eslint-disable react-hooks/exhaustive-deps */
import { useUserProfile } from "@/store/userProfile";
import { useCallback, useEffect, useState } from "react";

export const useUserSetup = () => {
  const [cultures, setCultures] = useState<string[]>([]);
  const [recommendations, setRecommended] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const user = useUserProfile((state) => state.user);
  const setUser = useUserProfile((state) => state.setUser);

  const handleInterestChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;
      setInterests((prev) =>
        checked ? [...prev, name] : prev.filter((interest) => interest !== name)
      );
    },
    []
  );

  const handleCultureChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;
      setCultures((prev) =>
        checked ? [...prev, name] : prev.filter((culture) => culture !== name)
      );
    },
    []
  );

  const handleRecommendationChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;
      setRecommended((prev) =>
        checked
          ? [...prev, name]
          : prev.filter((recommendation) => recommendation !== name)
      );
    },
    []
  );

  const handlePrivacyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPrivacy(event.target.name);
    },
    []
  );

  const handleNotificationChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;
      if (name === "no-notifications") {
        setNotifications(checked ? ["no-notifications"] : []);
      } else {
        setNotifications((prev) =>
          checked
            ? [...prev, name]
            : prev.filter((notification) => notification !== name)
        );
      }
    },
    []
  );

  useEffect(() => {
    setUser({
      ...user,
      interests,
      cultures,
      recommendations,
      privacy,
      notifications,
    });

    localStorage.setItem(
      "user-preferences",
      JSON.stringify({
        ...user,
        interests,
        cultures,
        recommendations,
        privacy,
        notifications,
      })
    );
  }, [interests, cultures, recommendations, privacy, notifications]);

  return {
    cultures,
    recommendations,
    privacy,
    interests,
    notifications,
    handleInterestChange,
    handleCultureChange,
    handleRecommendationChange,
    handlePrivacyChange,
    handleNotificationChange,
  };
};
