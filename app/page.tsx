import HomeHero from "@/components/sections/HomeHero";
import Popular from "@/components/sections/Popular";
import RecentPosts from "@/components/sections/RecentPosts";
import SubscribeForm from "@/components/sections/SubscribeForm";
import { getRecentPosts } from "@/lib/posts";
import PinnedAnimationSection from "@/components/sections/ScrollTrigger";


export default async function Home() {
  const posts = await getRecentPosts(4);

  return (
    <>
      <HomeHero />
      <RecentPosts posts={posts} />
      <Popular />
      <PinnedAnimationSection />
      <SubscribeForm />
    </>
  );
}
