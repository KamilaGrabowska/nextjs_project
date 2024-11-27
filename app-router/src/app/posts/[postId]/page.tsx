import {NextPage} from 'next';
import {Post} from '../../types/Posts';
import style from './post.module.scss';
import {notFound} from 'next/navigation';

type PostPageProps = {
    params: {
        postId: string;
    };
};
const fetchPost = async (postId: number) => {
    const resp = await fetch(`http://localhost:3004/posts/${postId}`);

    if(!resp.ok && resp.status ===404) {
        throw notFound();
    }

    if(!resp.ok) {
        throw new Error ("problem with getting post");
    }
    const post: Post = await resp.json();
    return post;
};

export const generateMetadata = async ({params}: PostPageProps) => {
    const post = await fetchPost(+params.postId);
    return{
        title: post.title,
        description: `Read about ${post.title}`,
    };
}

const PostPage: NextPage<PostPageProps> = async  ({params}) => {
const post = await fetchPost(+params.postId);

  return (
      <div>
         <h1>{post.title}</h1>
         <p> {post.body}</p>
         <p> {post.tags && post.tags.length > 0 && (
             <div className={style.tags}>
                 {post.tags.map(tag => <em key={tag}>{tag}</em>)}
             </div>
         )}</p>
      </div>
  );
}

export default PostPage;
