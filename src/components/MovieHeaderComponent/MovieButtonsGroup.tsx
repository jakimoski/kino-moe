import "./MovieButtons.scss";
import MainLinkComponent from "../ButtonComponents/LinkComponent";
import playIcon from "@public/assets/icons/play-bold.png";
import likeIcon from "@public/assets/icons/ph_heart-light.png";
import addIcon from "@public/assets/icons/plus_icon.png";
import shareIcon from "@public/assets/icons/share_icon.png";
import MainButtonComponent from "../ButtonComponents/MainButtonComponent";
import { supabase } from "@/lib/supabaseClient";

function MovieButtonsGroup({
  movieId,
  userId,
}: {
  userId: number;
  movieId: number;
}) {
  const addToWatchList = async () => {
    try {
      const { error } = await supabase
        .from("WatchList")
        .insert({ userId, movieId });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  return (
    <div className="movie-buttons-component">
      <MainLinkComponent
        logo={playIcon}
        alt="play-icon"
        customStyles="btn--sm"
        destination={`/play/${movieId.toString()}`}
      >
        Watch
      </MainLinkComponent>
      <MainButtonComponent
        customStyles="btn--icon"
        logo={likeIcon}
        alt="like-icon"
      ></MainButtonComponent>
      <MainButtonComponent
        customStyles="btn--icon"
        logo={addIcon}
        alt="add-icon"
      ></MainButtonComponent>
      <MainButtonComponent
        customStyles="btn--icon"
        logo={shareIcon}
        alt="share-icon"
      ></MainButtonComponent>
    </div>
  );
}

export default MovieButtonsGroup;
