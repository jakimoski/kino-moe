import { VideoPlayer } from "@/components/PlayerComponent/PlayerComponent";
import React, { use } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { useGetData } from "@/hooks/useGetData";
import { MovieType } from "@/types/types";

export default async function Play({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const { getMovie } = await useGetData();
  const movie = await getMovie(Number(params.id));

  console.log(movie);

  if (!session) {
    return redirect("/");
  }
  return <VideoPlayer movie={movie as MovieType} />;
}
