"use client";
import React from 'react'
import { PostCard } from '@/lib/posts'
import { Button } from '@/components/ui/button';


type Props = {
    tagInfo: PostCard[];
}

export default function TagFilter({ tagInfo, }: Props) {


    const tags = Array.from(new Set(tagInfo.flatMap(post => post.tags ?? [])))



    return (
        <div className='flex flex-wrap' >
            {tags.map((tag, index) => (
                <Button
                    key={index}

                    className='bg-gray-100 text-black hover:text-white border mx-2 my-2 cursor-pointer' >{tag}</Button>
            ))}

        </div>
    )
}
