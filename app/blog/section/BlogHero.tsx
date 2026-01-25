import { DisplayH1 } from '../../../components/typography/DisplayH1'
import TagFilter from '../components/TagFilter'
import { PostCard } from '@/lib/posts'

type Props = {
    allPost: PostCard[]
}

export default function BlogHero({ allPost }: Props) {

    return (
        <div >
            <DisplayH1 className='text-text-inverse px-4'>
                Blog Post Archive
            </DisplayH1>
            <TagFilter tagInfo={allPost} />
        </div>
    )
}
