import {Posts} from "@/types/Posts";
import style from "@//app/posts/posts.module.scss";
import {commonMetadata} from '@/common/shared-metadata';
import {Pagination} from '@/common/components/Pagination';
import {SearchParams} from '@/types/NextTypes';

export const metadata= {
    title: `Posts ${commonMetadata.title}`,
    description: "Posts page",
};
type PostsPageProps = {} & SearchParams;

const POST_PER_PAGE = 10; //  we should take this information from API but for test I hardcoded it
const POSTS_TOTAL= 60; //  we should take this information from API but for test I hardcoded it

export default async function PostsPage({searchParams}: PostsPageProps) {
    let page =1;
    if (searchParams?.page) {
        page = Number(searchParams?.page) || 1;
    }
    const res = await fetch(`http://localhost:3004/posts?_limit=${POST_PER_PAGE}&_page=${page}`,
    {next:{revalidate:5}}
    );

    if (!res.ok) {
        throw new Error("Problem with the posts");
    }

    const posts: Posts = await res.json();

    return (
        <div>
            <h1>Posts</h1>
            {posts.map((posts)=> (
                <div className={style.item} key={posts.id}>{posts.title}</div>
            ))}

            <Pagination page={page} total={POSTS_TOTAL} perPage={POST_PER_PAGE} />
        </div>
    );
}
