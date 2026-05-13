"use client"
import { useMemo, useState } from 'react';

//typography
import { DisplayH1 } from '@/components/typography/DisplayH1';

//components
import TagFilter from './components/TagFilter';
import CardM from '../../components/ui/CardM';
import SearchPost from './components/SearchPost';

// import type
import type { PostCard } from '@/lib/posts';

type Props = {
    allPosts: PostCard[];
};


export default function BlogArchiveClient({ allPosts }: Props) {

    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [filteredSearch, setFilteredSearch] = useState<string | null>(null);


    const filteredPosts = useMemo(() => {
        const tagQuery = selectedTag
        const textQuery = (filteredSearch ?? '').trim().toLowerCase()

        return allPosts.filter((post) => {
            // tag filter
            if (tagQuery) {
                const tags = Array.isArray(post.tags) ? post.tags : []
                if (!tags.includes(tagQuery)) return false
            }

            // text search
            if (textQuery) {
                const title = (post.title ?? '').toLowerCase()
                const excerpt = (post.excerpt ?? '').toLowerCase()
                const tags = Array.isArray(post.tags) ? post.tags : []

                const titleHit = title.includes(textQuery)
                const excerptHit = excerpt.includes(textQuery)
                const tagHit = tags.some((t) =>
                    t.toLowerCase().includes(textQuery)
                )

                if (!titleHit && !excerptHit && !tagHit) return false
            }

            return true
        })
    }, [allPosts, selectedTag, filteredSearch])

    return (
        <main className='bg-blog-archive'>
            {/* Blog-hero */}
            <section className='blog-hero  pt-16'>
                <div >
                    <DisplayH1 className='text-text-inverse text-center mt-8'>Blog Post Archive</DisplayH1>
                </div>
                <div className='layout-grid-12 mt-12'>
                    <div className='col-span-12 md:col-start-3 md:col-end-11'>
                        <SearchPost setFilteredSearch={setFilteredSearch} />
                        <TagFilter tagInfo={allPosts} selectedTag={selectedTag} onSelectTag={setSelectedTag} />
                    </div>
                </div>
            </section>
            {/* BlogCards */}
            <section className='py-16'>
                <div className='flex flex-col md:grid grid-cols-12 gap-x-10 gap-y-10 max-w-container mx-auto px-4'>
                    {filteredPosts.map((post) => (
                        <div className='md:col-span-6 lg:col-span-4' key={post.id}>
                            <CardM posts={post} />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

// lifting state up
//https://react.dev/learn/sharing-state-between-components#lifting-state-up-by-example
