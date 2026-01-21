import React from 'react'
import CardM from '../ui/CardM'
import type { PostCard } from "@/lib/posts";

type Props = {
    allPosts: PostCard[];
}

export default function BlogPostGrid({ allPosts }: Props) {
    return (
        <div>
            <div className='grid grid-cols-12 max-w-container mx-auto'>
                <div className='col-span-4'>
                    {allPosts.map((post) => (
                        <CardM key={post.id} posts={post} />
                    ))}
                </div>
            </div>

        </div>
    )
}
