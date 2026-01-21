import React from 'react'
import CardM from '../ui/CardM'
import type { PostCard } from "@/lib/posts";

type Props = {
    posts: PostCard[];
}

export default function BlogPostGrid({ posts }: Props) {
    return (
        <div>
            <div className='grid grid-cols-12 max-w-container mx-auto'>
                <div className='col-span-4'>
                    {posts[0] ? <CardM posts={posts[0]} /> : null}
                </div>
            </div>

        </div>
    )
}
