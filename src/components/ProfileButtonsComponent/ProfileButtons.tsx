"use client";
import React from "react";
import MainButtonComponent from "../ButtonComponents/MainButtonComponent";
import likeIcon from "@public/assets/icons/ph_heart-light.png";
import adicon from "@public/assets/icons/plus_icon.png";
import shareIcon from "@public/assets/icons/share_icon.png";
import { supabase } from "@/lib/supabaseClient";

function ProfileButtons({
  userId,
  currentId,
}: {
  userId?: number;
  currentId?: number;
}) {
  const addFriend = async () => {
    try {
      const { error } = await supabase
        .from("Friend")
        .insert({ userId: currentId, friendId: userId });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const followUser = async () => {
    try {
      const { error } = await supabase
        .from("Follow")
        .insert({ followerId: 2, followingId: userId });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };
  return (
    <>
      <MainButtonComponent
        customStyles="btn--icon"
        logo={likeIcon}
        alt="like-icon"
        handler={followUser}
      ></MainButtonComponent>
      <MainButtonComponent
        customStyles="btn--icon"
        handler={addFriend}
        logo={adicon}
        alt="add-icon"
      ></MainButtonComponent>
      <MainButtonComponent
        customStyles="btn--icon"
        logo={shareIcon}
        alt="share-icon"
      ></MainButtonComponent>
    </>
  );
}

export default ProfileButtons;
