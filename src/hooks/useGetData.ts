import prisma from "@/lib/dbPrisma";
import { TUser } from "@/types/types";

async function fetchMovies(filter: object, orderBy?: object, take: number = 8) {
  try {
    return await prisma.movie.findMany({
      where: filter,
      orderBy,
      take,
      select: {
        id: true,
        title: true,
        type: true,
        posterImage: true,
        bannerImage: true,
        videoSrc: true,
        genres: true,
        actors: true,
        directors: true,
        awards: true,
        writers: true,
        producers: true,
        cinematography: true,
        costumeDesign: true,
        editing: true,
        views: true,
        description: true,
        comments: true,
        createdAt: true,
        WatchLists: true,
      },
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
}

export const useGetData = async () => {
  async function getUser(email: string) {
    try {
      return await prisma.user.findFirst({
        where: { email },
      });
    } catch (error) {
      console.error("Error getting user:", error);
      throw new Error("Failed to get user");
    }
  }

  async function getMovies() {
    try {
      return await fetchMovies({ type: "Movie" }, { createdAt: "desc" });
    } catch (error) {
      console.error("Error getting movies:", error);
      throw new Error("Failed to get movies");
    }
  }

  async function getNewMovies() {
    try {
      return await fetchMovies({
        type: "Movie",
      });
    } catch (error) {
      console.error("Error getting new movies:", error);
      throw new Error("Failed to get new movies");
    }
  }

  async function getArtistMovies(name: string) {
    try {
      return await fetchMovies({ actors: { has: name } });
    } catch (error) {
      console.error("Error getting artist movies:", error);
      throw new Error("Failed to get artist movies");
    }
  }

  async function getKidsMovies() {
    try {
      return await fetchMovies({ type: "Kids" });
    } catch (error) {
      console.error("Error getting kids movies:", error);
      throw new Error("Failed to get kids movies");
    }
  }

  async function getMovie(slug: number) {
    try {
      return await prisma.movie.findFirst({
        where: { id: slug },
      });
    } catch (error) {
      console.error("Error getting movie:", error);
      throw new Error("Failed to get movie");
    }
  }

  async function getPopularMovies(type: string) {
    try {
      return await fetchMovies({ type }, { views: "desc" });
    } catch (error) {
      console.error("Error getting popular movies:", error);
      throw new Error("Failed to get popular movies");
    }
  }

  async function updateMovie(id: number) {
    try {
      return await prisma.movie.update({
        where: { id },
        data: { views: { increment: 1 } },
      });
    } catch (error) {
      console.error("Error updating movie:", error);
      throw new Error("Failed to update movie");
    }
  }

  async function getSeries() {
    try {
      return await fetchMovies({ type: "Series" });
    } catch (error) {
      console.error("Error getting series:", error);
      throw new Error("Failed to get series");
    }
  }

  async function getPodcasts() {
    try {
      return await fetchMovies({ type: "Podcast" });
    } catch (error) {
      console.error("Error getting series:", error);
      throw new Error("Failed to get series");
    }
  }

  async function searchMoviesByTitle(search: string) {
    try {
      return await prisma.movie.findMany({
        where: { title: { contains: search } },
        take: 12,
      });
    } catch (error) {
      console.error("Error searching movies by title:", error);
      throw new Error("Failed to search movies by title");
    }
  }

  async function searchMoviesByDesc(search: string) {
    try {
      return await prisma.movie.findMany({
        where: { description: { contains: search } },
        take: 12,
      });
    } catch (error) {
      console.error("Error searching movies by description:", error);
      throw new Error("Failed to search movies by description");
    }
  }

  return {
    movies: await getMovies(),
    series: await getSeries(),
    kidsMovies: await getKidsMovies(),
    newMovies: await getNewMovies(),
    getArtistMovies,
    getMovie,
    getPopularMovies,
    searchMoviesByTitle,
    searchMoviesByDesc,
    getUser,
    getPodcasts,
  };
};
