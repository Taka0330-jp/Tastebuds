import HomeHero from "@/components/sections/HomeHero";
import Popular from "@/components/sections/Popular";
import RecentPosts from "@/components/sections/RecentPosts";
import { getRecentPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getRecentPosts(4);

  return (
    <>
      <HomeHero />
      <RecentPosts posts={posts} />
      <Popular />
    </>
  );
}
