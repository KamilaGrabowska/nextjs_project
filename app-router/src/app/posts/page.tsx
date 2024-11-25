import {Posts} from "@/types/Posts";
import style from "@//app/posts/posts.module.scss";
import {commonMetadata} from '@/common/shared-metadata';

export const metadata= {
    title: `Posts ${commonMetadata.title}`,
    description: "Posts page",
};

export default async function PostsPage(){
    const res = await fetch("http://localhost:3004/posts");

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
        </div>
    );
}
