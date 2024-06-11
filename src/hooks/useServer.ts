"use server";

import prisma from "@/lib/dbPrisma";

export async function getArtistMovies(name: string) {
  const artistMovie = await prisma.movie.findMany({
    where: { actors: { has: name } },
    take: 8,
  });
  return artistMovie;
}
