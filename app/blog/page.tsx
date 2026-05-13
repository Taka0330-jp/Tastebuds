
import { getAllPosts } from '@/lib/posts'
import BlogArchiveClient from './BlogArchiveClient';


export default async function page() {

    const allPosts = await getAllPosts();
    return (
        <BlogArchiveClient allPosts={allPosts} />
    )
}
