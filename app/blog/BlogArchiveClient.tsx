"use client"
import React, { useMemo, useState } from 'react'
import { DisplayH1 } from '@/components/typography/DisplayH1';
import TagFilter from './components/TagFilter';
import CardM from '../../components/ui/CardM'
import { Input } from '@/components/ui/shadcn/input';
import { PostCard } from '@/lib/posts';

type Props = {
    allPosts: PostCard[];
};


export default function BlogArchiveClient({ allPosts }: Props) {

    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const filteredPosts = useMemo(() => {
        if (!selectedTag) return allPosts;
        return allPosts.filter((post) => (post.tags ?? []).includes(selectedTag))
    }, [allPosts, selectedTag])

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

// 1. 状態をどこに置くか決める（最重要）

// 絞り込み表示に関わる状態は、カード一覧を描画している場所と同じ階層に置く必要があります。
// 	•	推奨：BlogArchiveClient（または cards を描画している親）に selectedTag を置く
// 	•	理由：TagFilter と cards が 同じ state を共有できるから
// 	•	TagFilter 自身に selectedTag を置くのは非推奨
// 	•	理由：TagFilter は cards を持ってないので、絞り込みに反映しづらい

// ⸻

// 2. 親が持つ state を定義する

// 親（cards を表示する側）で持つべき状態は最低これ：
// 	•	selectedTag: string | null
// 	•	null = 絞り込み無し（全カード表示）
// 	•	string = そのタグで絞り込み

// （検索もやるなら query も同じ親に置く）

// ⸻

// 3. TagFilter を「表示＋通知」のコンポーネントにする

// TagFilter は次の役割に限定します：
// 	•	タグ一覧を表示する（picked / more）
// 	•	クリックされたタグを 親に通知する

// TagFilter は「どのカードを表示するか」判断しない。

// 必要な props の考え方：
// 	•	親 → 子：selectedTag（今どれが選ばれてるか）
// 	•	親 → 子：onSelectTag(tag)（タグクリックを伝える関数）
// 	•	親 → 子：タグ一覧（または posts から TagFilter 内でタグ生成してもOK）

// ⸻

// 4. 「タグクリック時のルール」を決める

// クリックイベントでやるべき挙動を仕様として固定します：
// 	•	タグ A をクリック
// → selectedTag = "A"
// 	•	同じタグ A をもう一度クリック
// → selectedTag = null（解除）
// 	•	Clear ボタン（任意）
// → selectedTag = null

// ⸻

// 5. 親で「絞り込み済みの投稿配列」を作る

// 親で filteredPosts を作るルール：
// 	•	selectedTag === null → allPosts をそのまま
// 	•	selectedTag !== null → post.tags にそのタグが含まれるものだけ

// この filteredPosts を cards の map に使うだけで連動します。

// ⸻

// 6. カード一覧（グリッド）を filteredPosts に接続する

// カード表示側の map を：
// 	•	今：allPosts.map(...)
// 	•	変更後：filteredPosts.map(...)

// にするだけで完成します。

// ※ cards を別コンポーネント（PostGrid）に分けるなら
// 	•	親で filteredPosts を作る
// 	•	PostGrid posts={filteredPosts} として渡す
// で同じ。

// ⸻

// 7. UIのフィードバックを入れる（使いやすさ）

// 最低限入れるとUXが一気に良くなるもの：
// 	•	選択中タグのボタンだけ見た目を変える（active）
// 	•	「現在のフィルタ：〇〇」表示（任意）
// 	•	「結果が0件」の空状態表示（No results）
// 	•	Clear ボタン（任意だが便利）

// ⸻

// 8. テスト観点（バグを潰す）

// 動作チェックリスト：
// 	•	pickedTags を押して絞り込みできる
// 	•	More… 内のタグでも同じ
// 	•	同じタグ2回押しで解除できる
// 	•	タグが undefined の post が混ざっていても落ちない（post.tags ?? []）
// 	•	結果が0件でもUIが壊れない

// ⸻

// 9. 仕上げ（将来拡張を見据える）

// 将来「検索＋タグ」もやるなら：
// 	•	親で selectedTag と query を持つ
// 	•	filteredPosts は「タグ条件 AND 検索条件」の両方を満たすものにする

// ⸻

// 最短の実装方針まとめ
// 	•	state（selectedTag）は cards を描画する親に置く
// 	•	TagFilter は クリックを親に伝えるだけ
// 	•	親が filteredPosts を作って cards に使う

// ⸻

// 必要なら次に、あなたの今のファイル構成（page.tsx / TagFilter.tsx / CardM）に合わせて「どのファイルで何を移すか」の**作業手順チェックリスト（作業順）**も作れます。
