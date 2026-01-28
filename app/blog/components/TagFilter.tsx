"use client";
import React, { useEffect, useState } from 'react'
import { PostCard } from '@/lib/posts'
import { Button } from '@/components/ui/shadcn/button';
import { arrayToShuffled } from 'array-shuffle';
import { Card } from '@/components/ui/shadcn/card';
import { cn } from '@/lib/utils';


type Props = {
    tagInfo: PostCard[];
}

export default function TagFilter({ tagInfo, }: Props) {

    const [pickedTags, setPickedTags] = useState<string[]>([]);
    const [unPickedTags, setUnPickedTags] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const tags = Array.from(
            new Set(tagInfo.flatMap((post) => post.tags ?? []))
        );

        const shuffled = arrayToShuffled(tags)

        const pickedTags = shuffled.slice(0, 5);
        const unPickedTags = shuffled.slice(5)

        const timerId = window.setTimeout(() => {
            setPickedTags(pickedTags);
            setUnPickedTags(unPickedTags)
        }, 0);

        return () => {
            window.clearTimeout(timerId);
        };
    }, [tagInfo]);

    const handleClick = () => {
        setIsOpen(prev => !prev)
    }



    return (
        <div>
            <div className='flex flex-wrap gap-4' >
                {pickedTags.map((tag) => (
                    <Button
                        key={tag}
                        className='bg-gray-100 text-black hover:text-white border my-2 cursor-pointer' >{tag}</Button>
                ))}
                <Button
                    onClick={handleClick}
                    className={cn(
                        'border my-2 cursor-pointer',
                        isOpen
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-black hover:text-white'
                    )}
                >
                    More...</Button>
            </div>
            {
                isOpen && (
                    <Card className='rounded-lg bg-black border-gray-900 px-4 mt-4'>
                        <div className='flex flex-wrap'>
                            {unPickedTags.map((tag) => (
                                <Button
                                    key={tag}
                                    className='bg-gray-100 text-black hover:text-white border mx-2 my-2 cursor-pointer' >{tag}</Button>
                            ))}
                        </div>
                    </Card>
                )
            }
        </div >
    )
}

//Reference:
//https://www.npmjs.com/package/array-shuffle
//https://coureywong.medium.com/how-to-shuffle-an-array-of-items-in-javascript-39b9efe4b567