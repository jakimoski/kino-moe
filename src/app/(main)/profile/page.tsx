import React from "react";
import "@/styles/pages/profile.scss";
import MovieSliderComponent from "@/components/MoviesSliderComponent/MoviesSliderComponent";
import ProfileAvatar from "@/components/UserProfileComponent/UserProfile";
import MainButtonComponent from "@/components/ButtonComponents/MainButtonComponent";
import likeIcon from "@public/assets/icons/ph_heart-light.png";
import adicon from "@public/assets/icons/plus_icon.png";
import shareIcon from "@public/assets/icons/share_icon.png";
import profileImage from "@public/assets/icons/profile_img.png";
import Image from "next/image";
import { useGetData } from "@/hooks/useGetData";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { useUserData } from "@/hooks/useUserData";
import { CommentType } from "@/types/types";

export default async function ProfilePage() {
  const { movies } = await useGetData();
  const { getUserByEmail } = await useUserData();
  const session = await getServerSession(authOptions);

  const user = await getUserByEmail(session?.user?.email as string);

  const lastTwoComments: CommentType[] = user?.Post?.slice(-2);

  return (
    <main>
      <section className="profile-page">
        <div className="profile-page__header"></div>
        <div className="profile-page__wrapper">
          <div className="profile-page__profile">
            <ProfileAvatar
              email={user?.email}
              userName={user?.userName}
              accountType={user?.type}
              image={user?.image}
              bio={user?.bio}
            />
          </div>
          <div className="profile-page__info">
            <div className="profile-page__buttons">
              <MainButtonComponent
                customStyles="btn--icon"
                logo={likeIcon}
                alt="like-icon"
              ></MainButtonComponent>
              <MainButtonComponent
                customStyles="btn--icon"
                logo={adicon}
                alt="add-icon"
              ></MainButtonComponent>
              <MainButtonComponent
                customStyles="btn--icon"
                logo={shareIcon}
                alt="share-icon"
              ></MainButtonComponent>
            </div>
            <div>
              <h4>
                Comments by {user?.userName ? user.userName : user?.email}:
              </h4>
              {lastTwoComments?.map((comment) => {
                return (
                  <div key={comment.id} className="profile-page__comments">
                    <div className="profile-page__comments__user">
                      <Image
                        src={user?.image ? user.image : profileImage}
                        width={50}
                        height={50}
                        alt={
                          user?.userName
                            ? user.userName
                            : (user?.email as string)
                        }
                        sizes="100vw"
                      ></Image>
                      <p className="profile-page__comments__username">
                        {user?.userName ? user.userName : user?.email}:
                      </p>
                    </div>
                    <div>
                      <p className="profile-page__comments__body">
                        {comment.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="profile-page__movies">
              <h3>What {user?.userName} watched:</h3>
              <MovieSliderComponent content={movies} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
