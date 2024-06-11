"use client";
import { useEffect, useState } from "react";
import "./NavbarComponent.scss";
import Avatar from "../AvatarComponent/Avatar";
import Image from "next/image";
import Home from "@public/assets/icons/Home.png";
import Squares from "@public/assets/icons/squares.png";
import ChatIcon from "@public/assets/icons/wpf_chat.png";
import CameraIcon from "@public/assets/icons/camera.png";
import SettingsIcon from "@public/assets/icons/Group (1).png";
import MoviesIcon from "@public/assets/icons/Movies.png";
import SeriesIcon from "@public/assets/icons/Series.png";
import PodcastIcon from "@public/assets/icons/Podcasts.png";
import KidsIcon from "@public/assets/icons/Kids.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabaseClient";

const IMAGE_WIDTH = 40;
const IMAGE_HEIGHT = 40;

export default function NavbarComponent() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [profileImg, setProfileImg] = useState<string | null>();

  const showRooms = () => {
    setActive((prev) => !prev);
  };

  useEffect(() => {
    setActive(false);

    async function getCurrentUser() {
      if (profileImg || !session) return;

      try {
        const { data, error } = await supabase
          .from("User")
          .select()
          .eq("email", session?.user?.email)
          .single();

        if (error) {
          console.error("Error fetching user data:", error);
          return;
        }

        if (data) {
          setProfileImg(data.image);
          localStorage.setItem("user", JSON.stringify(data));
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    }

    getCurrentUser();
  }, [pathname, profileImg, session]);

  return (
    <nav className="main-nav">
      <div className="main-nav__avatar">
        <Link href={"/profile"}>
          <Avatar image={profileImg ? profileImg : ""} />
        </Link>
      </div>
      <ul className="main-nav__list">
        <li className="main-nav__list__item">
          <Link href={"/home"}>
            <Image
              src={Home}
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              alt="home-icon"
            ></Image>{" "}
          </Link>
        </li>
        <li className="main-nav__list__item">
          <Image
            onClick={showRooms}
            src={Squares}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            alt="rooms-icon"
          ></Image>
          <ul
            className={`main-nav__sub-list ${
              active && "main-nav__sub-list--show"
            }`}
          >
            <li>
              <Link href={"/movies-room"}>
                <Image
                  src={MoviesIcon}
                  width={IMAGE_WIDTH}
                  height={IMAGE_HEIGHT}
                  alt="rooms-icon"
                  style={{ width: "100%", height: "100%" }}
                ></Image>{" "}
              </Link>
            </li>
            <li>
              <Link href={"/series-room"}>
                <Image
                  src={SeriesIcon}
                  width={IMAGE_WIDTH}
                  height={IMAGE_HEIGHT}
                  alt="rooms-icon"
                  style={{ width: "100%", height: "100%" }}
                ></Image>
              </Link>
            </li>
            <li>
              <Link href={"/podcasts"}>
                <Image
                  src={PodcastIcon}
                  width={IMAGE_WIDTH}
                  height={IMAGE_HEIGHT}
                  alt="rooms-icon"
                  style={{ width: "100%", height: "100%" }}
                ></Image>
              </Link>
            </li>
            <li>
              <Link href={"/kids-room"}>
                <Image
                  src={KidsIcon}
                  width={IMAGE_WIDTH}
                  height={IMAGE_HEIGHT}
                  alt="rooms-icon"
                  style={{ width: "100%", height: "100%" }}
                ></Image>{" "}
              </Link>
            </li>
          </ul>
        </li>
        <li className="main-nav__list__item">
          <Link href={"/community"}>
            <Image
              src={ChatIcon}
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              alt="chat-icon"
            ></Image>{" "}
          </Link>
        </li>
        <li className="main-nav__list__item">
          <Image
            src={CameraIcon}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            alt="camera-icon"
          ></Image>
        </li>
      </ul>
      <Image
        src={SettingsIcon}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        alt="home-icon"
      ></Image>
    </nav>
  );
}
