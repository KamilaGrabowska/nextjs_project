import {NextPage} from 'next';
import {Post} from '../../types/Posts';
import style from './post.module.scss';
import {fetchClient, generatePostTag} from '@/common/clientAPI/fetchClient';
import LikePost from '@/app/posts/LikePost';

type PostPageProps = {
    params: {
        postId: string;
    };
};
const fetchPost = async (postId: number) => {
    return await fetchClient<Post>(`http://localhost:3004/posts/${postId}`,
        {tags: [generatePostTag(postId)]
        });
};

export const generateMetadata = async ({params}: PostPageProps) => {
    const post = await fetchPost(+params.postId);
    return {
        title: post.title,
        description: `Read about ${post.title}`,
    };
};

const PostPage: NextPage<PostPageProps> = async ({params}) => {
    const post = await fetchPost(+params.postId);

    return (
        <div>
            <h1>{post.title}</h1>
            <p> {post.body}</p>
            {post.tags && post.tags.length > 0 && (
                <div className={style.tags}>
                    {post.tags.map((tag: string) => (
                        <em key={tag}>{tag}</em>
                    ))}
                </div>
            )}
            <div className={style.likes}> Likes: {post.reactions}</div>
            <LikePost postId={post.id}/>
        </div>
    );
};

export default PostPage;
