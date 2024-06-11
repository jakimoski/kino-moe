import ArtistOverview from "@/components/ArtistOverviewComponent/ArtistOverview";

export default async function PhotoModal({
  params: { id },
}: {
  params: { id: string };
}) {
  const artistName = decodeURI(id);

  return (
    <main className="main-page">
      <ArtistOverview name={artistName} />
    </main>
  );
}
