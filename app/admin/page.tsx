// app/admin/page.tsx
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { PencilRuler, ClipboardList } from "lucide-react";
import { DisplayH1 } from "@/components/typography/DisplayH1";
import { ArticleH1 } from "@/components/typography/ArticleH1";

export default function AdminPage() {

    const name = "Taka";

    return (
        <main className="min-h-[calc(100vh-0px)] ">
            {/* 既存のHeader/Footerが layout.tsx にある前提で、ここは中身だけ */}
            <section className="mx-auto w-full max-w-6xl px-6 py-20">
                {/* Greeting */}
                <DisplayH1>
                    Hi,{name}
                </DisplayH1>

                {/* Cards */}
                <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
                    {/* New Post */}
                    <Link href="/admin/new" className="group">
                        <Card className="mx-auto w-full max-w-sm rounded-2xl border bg-white shadow-sm transition-transform duration-150 group-hover:-translate-y-1 group-hover:shadow-md">
                            <CardHeader className="pb-0">
                                <CardTitle>
                                    <ArticleH1 as="h2" className="text-center">
                                        New Post
                                    </ArticleH1>
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="flex items-center justify-center pb-10 pt-8">
                                <div className="flex h-28 w-28 items-center justify-center">
                                    <PencilRuler className="h-28 w-28 text-black" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Post list */}
                    <Link href="/admin/posts" className="group">
                        <Card className="mx-auto w-full max-w-sm rounded-2xl border bg-white shadow-sm transition-transform duration-150 group-hover:-translate-y-1 group-hover:shadow-md">
                            <CardHeader className="pb-0">
                                <CardTitle>
                                    <ArticleH1 as="h2" className="text-center">
                                        Post list
                                    </ArticleH1>
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="flex items-center justify-center pb-10 pt-8">
                                <div className="flex h-28 w-28 items-center justify-center">
                                    <ClipboardList className="h-28 w-28 text-black" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </section>
        </main>
    );
}
