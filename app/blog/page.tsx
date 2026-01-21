import React from 'react'
import BlogHero from '@/components/sections/BlogHero'
import BlogPostGrid from '@/components/sections/BlogPostGrid'
import { getRecentPosts } from '@/lib/posts'

export default async function page() {
    const posts = await getRecentPosts(4);
    return (
        <main className='bg-blog-archive '>
            <section className='max-w-container mx-auto pt-16'>
                <BlogHero />
            </section>
            <section >
                <BlogPostGrid posts={posts} />
            </section>
        </main>
    )
}
