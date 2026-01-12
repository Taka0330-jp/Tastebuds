import HomeHeroParallaxClient from "./HomeParallaxClient";
import { getRecentPosts } from "@/lib/posts";

export default async function HomeParallax() {
    const posts = await getRecentPosts(4);
    return <HomeHeroParallaxClient posts={posts} />
}