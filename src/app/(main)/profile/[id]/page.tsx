import React from "react";
import "@/styles/pages/profile.scss";
import MovieSliderComponent from "@/components/MoviesSliderComponent/MoviesSliderComponent";
import ProfileAvatar from "@/components/UserProfileComponent/UserProfile";
import profileImage from "@public/assets/icons/profile_img.png";
import Image from "next/image";
import { useGetData } from "@/hooks/useGetData";
import { useUserData } from "@/hooks/useUserData";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import ProfileButtons from "@/components/ProfileButtonsComponent/ProfileButtons";
import { UserPost } from "@/types/types";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const session = await getServerSession(authOptions);
  const { getUser } = useUserData();
  const { getUserByEmail } = await useUserData();

  const currentUser = await getUserByEmail(session?.user?.email as string);

  const user = await getUser(parseInt(id));

  const lastTwoComments = user?.Post?.slice(-2) as UserPost[];

  const { movies } = await useGetData();
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
              <ProfileButtons
                userId={user?.id as number}
                currentId={currentUser?.id as number}
              />
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
function getUserByEmail(arg0: string) {
  throw new Error("Function not implemented.");
}
