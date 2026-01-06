import { ArticleH1 } from "../typography/ArticleH1";
import Image from "next/image";
import BlogCardM from "../CardM";
export default function Popular() {
    return (
        <>
            <section className="bg-home-section relative z-10">
                <div className="flex gap-4 max-w-container mx-auto p-5 relative z-10">
                    <ArticleH1 className="text-text-inverse">
                        Popular
                    </ArticleH1>
                    <Image
                        src="/images/icons/popularIcon.svg"
                        alt="Popular"
                        width={48}
                        height={48}
                    />
                </div>
                <div className="md:grid md:grid-cols-12 gap-6 max-w-container mx-auto p-5  relative z-10">
                    <div className="md:col-span-12 grid gap-6 md:grid-cols-3">
                        <BlogCardM />
                        <BlogCardM />
                        <BlogCardM />
                    </div>
                </div>
            </section>
        </>

    )
}
