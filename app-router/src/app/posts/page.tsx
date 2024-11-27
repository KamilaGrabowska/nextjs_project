import { Post, Posts } from "@/types/Posts";
import style from "@//app/posts/posts.module.scss";
import { commonMetadata } from '@/common/shared-metadata';
import { Pagination } from '@/common/components/Pagination';
import { SearchParams } from '@/types/NextTypes';
import Link from 'next/link';
import { fetchClient } from '@/common/clientAPI/fetchClient';
import { POSTS_TOTAL } from '@/common/config';

export const metadata = {
    title: `Posts ${commonMetadata.title}`,
    description: "Posts page",
};

type PostsPageProps = {} & SearchParams;

const POST_PER_PAGE = 10; // we should take this information from API but for test I hardcoded it

export default async function PostsPage({ searchParams }: PostsPageProps) {
    let page = 1;
    if (searchParams?.page) {
        page = Number(searchParams?.page) || 1;
    }

    // Wyciąganie obiektu posts z odpowiedzi API
    const  posts  = await fetchClient<Posts>(
        `http://localhost:3004/posts?_limit=${POST_PER_PAGE}&_page=${page}`,
        { revalidate: 5 }
    );

    return (
        <div>
            <h1>Posts</h1>
            {posts.map((post) => (
                <div className={style.item} key={post.id}>
                    {post.title}
                    <br />
                    <Link href={`/posts/${post.id}`}>Read more</Link>
                </div>
            ))}

            <Pagination page={page} total={POSTS_TOTAL} perPage={POST_PER_PAGE} />
        </div>
    );
}