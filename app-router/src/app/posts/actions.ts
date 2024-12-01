'use server';

import {fetchClient, generatePostTag, updateClient} from '@/common/clientAPI/fetchClient';
import {Post} from '../types/Posts';
import {revalidatePath, revalidateTag} from 'next/cache';

export const likePost = async (postId: number) => {
    //pobrac artykul
    const post = await fetchClient<Post>(`http://localhost:3004/posts/${postId}`);

    //wyslac do servera update artykulu z akutalna iloscia reactions + 1
    await updateClient('PATCH', `http://localhost:3004/posts/${postId}`,
        {reactions: post.reactions + 1,
        });
    revalidateTag(generatePostTag(postId));
    // revalidatePath(`/posts/${postId}`)
};
