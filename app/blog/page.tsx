import React from 'react'
import BlogHero from '@/components/sections/BlogHero'
import BlogPostGrid from '@/components/sections/BlogPostGrid'

import { getAllPosts } from '@/lib/posts'

export default async function page() {

    const allPosts = await getAllPosts();
    return (
        <main className='bg-blog-archive '>
            <section className='max-w-container mx-auto pt-16'>
                <BlogHero />
            </section>
            <section >
                <BlogPostGrid allPosts={allPosts} />
            </section>
        </main>
    )
}
