import React from 'react'
import BlogHero from '@/app/blog/section/BlogHero'
import BlogPostGrid from '@/app/blog/section/BlogPostGrid'

import { getAllPosts } from '@/lib/posts'

export default async function page() {

    const allPosts = await getAllPosts();
    return (
        <main className='bg-blog-archive '>
            <section className='max-w-container mx-auto pt-16'>
                <BlogHero allPost={allPosts} />
            </section>
            <section >
                <BlogPostGrid allPosts={allPosts} />
            </section>
        </main>
    )
}
