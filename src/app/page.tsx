import ArtistCardComponent from "@/components/ArtistCardComponent/ArtistCardComponent";
import LandingFooter from "@/components/LandingComponents/LandingFooterComponent/LandingFooter";
import LandingHeaderComponent from "@/components/LandingComponents/LandingHeaderComponent/LandingHeaderComponent";
import LandingMoviesGroup from "@/components/LandingComponents/LandingMoviesGroup/LandingMoviesGroup";
import MovieBannerComponent from "@/components/MovieBannerComponent/MovieBannerComponent";
import PricingComponent from "@/components/PricingComponent/PricingComponent";
import BannerImg from "../../public/assets/images/landing-banner.png";
import "../styles/pages/page.scss";
import "../styles/pages/landing.scss";

import { artists } from "@/tem-db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LandingArtistSlider from "@/components/LandingComponents/LandingArtistSlider/LandingArtistSlider";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/home");
  }

  return (
    <>
      <LandingHeaderComponent />

      <main className="page">
        <LandingMoviesGroup />

        <section className="landing-artist">
          <h2 className="landing-artist__title">Meet the artists</h2>
          <div className="landing-artist__wrapper">
            <LandingArtistSlider />
          </div>
        </section>

        <MovieBannerComponent
          background={true}
          imgSrc={BannerImg}
          alt="banner"
        />

        <PricingComponent />
      </main>

      <LandingFooter />
    </>
  );
}
