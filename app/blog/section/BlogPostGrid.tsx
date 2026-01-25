import React from 'react'
import CardM from '../../../components/ui/CardM'
import type { PostCard } from "@/lib/posts";

type Props = {
    allPosts: PostCard[];
}

export default function BlogPostGrid({ allPosts }: Props) {
    return (
        <section className='py-16'>
            <div className='flex flex-col md:grid grid-cols-12 gap-x-10 gap-y-10 max-w-container mx-auto px-4'>
                {allPosts.map((post) => (
                    <div className='md:col-span-6 lg:col-span-4' key={post.id}>
                        <CardM posts={post} />
                    </div>
                ))}
            </div>
        </section>
    )
}
