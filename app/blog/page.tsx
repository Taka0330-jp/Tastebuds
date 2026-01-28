import React from 'react'
import { DisplayH1 } from '@/components/typography/DisplayH1';
import TagFilter from './components/TagFilter';
import { getAllPosts } from '@/lib/posts'
import CardM from '../../components/ui/CardM'
import { Input } from '@/components/ui/shadcn/input';


export default async function page() {

    const allPosts = await getAllPosts();
    return (
        <main className='bg-blog-archive'>
            {/* Blog-hero */}
            <section className='blog-hero  pt-16'>
                <div >
                    <DisplayH1 className='text-text-inverse text-center mt-8'>Blog Post Archive</DisplayH1>
                </div>
                <div className='layout-grid-12 mt-12'>
                    <div className='col-start-3 col-end-11'>
                        <Input placeholder='e.g Cafe' className='bg-gray-300 mb-4' />
                        <TagFilter tagInfo={allPosts} />
                    </div>
                </div>
            </section>
            {/* BlogCards */}
            <section className='py-16'>
                <div className='flex flex-col md:grid grid-cols-12 gap-x-10 gap-y-10 max-w-container mx-auto px-4'>
                    {allPosts.map((post) => (
                        <div className='md:col-span-6 lg:col-span-4' key={post.id}>
                            <CardM posts={post} />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}
