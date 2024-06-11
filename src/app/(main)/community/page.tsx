import "@/styles/pages/community.scss";
import { Metadata } from "next";

import PostAccordion from "@/components/PostAcordionComponent/PostAccordion";
import Chart from "@/components/ChartComponent/Chart";
import SmallCommentComponent from "@/components/SmallCommentComponent/SmallCommentComponent";
import CommunitySearch from "@/components/CommunitySerachComponent/ComumunitySearch";
import { usePost } from "@/hooks/usePost";
import ShowMoreBtn from "@/components/ShowMoreBtn/ShowMoreBtn";

export const metadata: Metadata = {
  title: "KinoMoe - Community ",
  description: "Entertainment platform for everyone",
};

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: { q: string; o: string; r: string };
}) {
  let query = searchParams.q;
  let order = searchParams.o;
  let take = Number(searchParams.r);

  const { showMorePosts } = usePost();

  if (!query) {
    query = "";
  }
  if (!order) {
    order = "desc";
  }

  if (!take) {
    take = 10;
  }
  const posts = await showMorePosts(take, query, order);
  const newPosts = posts.slice(0, 2);

  const postsLength = posts.length;

  return (
    <main className="main-page">
      <h1 className="community-page__title">Community</h1>
      <section className="community-page">
        <div className="community-page__buttons">
          <CommunitySearch />
        </div>
        <div className="community-page__post">
          <PostAccordion posts={posts} />
          <div className="community-page__show-more">
            {postsLength > 9 && <ShowMoreBtn initialShowMore={20} />}
          </div>
        </div>
        <div className="community-page__stats">
          <Chart
            title="Community"
            percentage={80}
            total="525"
            direction="row"
          />
          <Chart
            title="Discussions"
            percentage={10}
            total={postsLength.toString()}
            direction="row"
          />
          <p>Latest Comments:</p>
          {newPosts.map((post) => (
            <SmallCommentComponent
              key={post.id}
              username={
                post.user.userName ? post.user.userName : post.user.email
              }
              text={post.title}
              image={post.user.image ? post.user.image : ""}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
