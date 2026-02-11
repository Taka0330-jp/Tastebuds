"use client";
import React, { useEffect, useState } from 'react'
import { PostCard } from '@/lib/posts'
import { Button } from '@/components/ui/shadcn/button';
import { arrayToShuffled } from 'array-shuffle';
import { Card } from '@/components/ui/shadcn/card';
import { cn } from '@/lib/utils';


type Props = {
    tagInfo: PostCard[];
    selectedTag: string | null;
    onSelectTag: (tag: string | null) => void
}

export default function TagFilter({ tagInfo, selectedTag, onSelectTag }: Props) {

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



    return (
        <div>
            <div className='flex flex-wrap gap-4' >
                {/* MAIN RANDOM BUTTON */}
                {pickedTags.map((tag) => (
                    <Button
                        onClick={() => onSelectTag(selectedTag === tag ? null : tag)}
                        key={tag}
                        className={cn(
                            'border cursor-pointer',
                            selectedTag === tag
                                ? 'text-black bg-brand-primary border-transparent hover:text-black  hover:bg-brand-primary hover:border-transparent'
                                : 'text-gray-100  bg-black hover:text-black hover:bg-brand-primary hover:border-transparent'
                        )}
                    >{tag}</Button>
                ))}
                {/* MORE BUTTON */}
                <Button
                    onClick={() => setIsOpen(prev => !prev)}
                    className={cn(
                        'border cursor-pointer',
                        isOpen
                            ? 'text-black bg-gray-100 hover:text-black hover:bg-gray-100'
                            : 'text-gray-100 bg-black hover:text-black hover:bg-gray-100 '
                    )}
                >
                    More...</Button>
            </div>

            {/* EXTRA TAGS */}
            {
                isOpen && (
                    <Card className='rounded-lg bg-black border-gray-900 px-4 mt-4'>
                        <div className='flex flex-wrap gap-4'>
                            {unPickedTags.map((tag) => (
                                <Button
                                    onClick={() => onSelectTag(selectedTag === tag ? null : tag)}
                                    key={tag}
                                    className={cn(
                                        'border cursor-pointer',
                                        selectedTag === tag
                                           ? 'text-black bg-brand-primary border-transparent hover:text-black  hover:bg-brand-primary hover:border-transparent'
                                : 'text-gray-100  bg-black hover:text-black hover:bg-brand-primary hover:border-transparent'
                                    )} >{tag}</Button>
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
