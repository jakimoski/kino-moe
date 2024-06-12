import MainButtonComponent from "../ButtonComponents/MainButtonComponent";
import Image, { StaticImageData } from "next/image";

import RightArrow from "@public/assets/icons/right-arow.png";
import LeftArrow from "@public/assets/icons/left_arow.png";
import UserProfileAvatar from "../UserProfileComponent/UserProfileAvatar";
import ProfileImage from "@public/assets/icons/profile_img.png";
import ImagePick from "@public/assets/icons/image_picker.png";
import { useState } from "react";
import { useSetStep, useUserProfile } from "@/store/userProfile";
import { setProfileInfo } from "@/lib/actions";

function ProfileInfo() {
  const user = useUserProfile((state) => state.user);
  const step = useSetStep((state) => state.step);
  const setUser = useUserProfile((state) => state.setUser);
  const increaseStep = useSetStep((state) => state.increaseStep);
  const decreaseStep = useSetStep((state) => state.decreaseStep);

  const [profileImage, setProfileImage] = useState<StaticImageData>();

  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];

    if (!image) return;
    const extension = image.name.split(".").pop();
    const fileName = `/assets/users/${user?.email}.${extension}`;

    setUser({ ...user, image: fileName });
    const newImage = new FileReader();
    newImage.onload = (e) => {
      setProfileImage(e.target?.result as unknown as StaticImageData);
    };

    newImage.readAsDataURL(image);
  };

  const nextStep = () => {
    setUser({ ...user, userName, bio });

    increaseStep();
  };

  return (
    <>
      <h2 className="profile-setup__title">
        <span className="profile-setup__title--step">{step}</span>Setup Profile
      </h2>
      <section className="profile-setup__wrapper">
        <form className="profile-setup__image-form" action={setProfileInfo}>
          <div className="profile-setup__image-picker">
            <Image
              src={profileImage ? profileImage : ProfileImage}
              width={200}
              height={200}
              alt="profile-image"
            />
            <label htmlFor="image">
              {profileImage ? "Change Photo" : "Upload Photo"}
              <Image src={ImagePick} width={10} height={10} alt="image_pick" />
            </label>
            <input
              onChange={handleImageChange}
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg"
            />
          </div>
          <input type="hidden" name="name" value={user?.email} />
          {profileImage ? (
            <MainButtonComponent type="submit" customStyles="btn--link">
              Save Photo
            </MainButtonComponent>
          ) : null}
        </form>
        <div className="profile-setup__info">
          <div>
            <label htmlFor="userName"></label>
            <input
              name="userName"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="bio"></label>
            <textarea
              onChange={(e) => setBio(e.target.value)}
              name="bio"
              placeholder="Tell us about yourself..."
              id="profile-bio"
              cols={30}
              rows={5}
            ></textarea>
          </div>
        </div>
        <div className="profile-setup__buttons">
          <MainButtonComponent
            customStyles="btn--icon--sm"
            logo={LeftArrow}
            handler={decreaseStep}
            alt="Back"
          >
            Back
          </MainButtonComponent>
          <MainButtonComponent
            customStyles="btn--icon--sm"
            rightLogo={RightArrow}
            alt="Next"
            type="submit"
            handler={nextStep}
          >
            Next
          </MainButtonComponent>
        </div>
      </section>
    </>
  );
}

export default ProfileInfo;
