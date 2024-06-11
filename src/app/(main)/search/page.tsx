import SearchInput from "@/components/SearchInputComponent/SearchInput";
import SearchResults from "@/components/SearchResultsComponent/SearchResults";
import SimilarResults from "@/components/SearchResultsComponent/SimilarResults";
import { useGetData } from "@/hooks/useGetData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KinoMoe - Search",
  description: "Entertainment platform for everyone",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const { searchMoviesByTitle, searchMoviesByDesc } = await useGetData();

  let movies: any[] = [];
  let moviesByDesc: any[] = [];

  if (searchParams.q) {
    movies = await searchMoviesByTitle(searchParams.q);
    moviesByDesc = await searchMoviesByDesc(searchParams.q);
  }

  return (
    <main className="main-page">
      <div className="margin-block-m ">
        <SearchInput icon={true} url="search" />
      </div>
      <SearchResults movies={movies} />
      <SimilarResults moviesByDesc={moviesByDesc} />
    </main>
  );
}
