'use server';

import {fetchClient, generatePostTag, updateClient} from '@/common/clientAPI/fetchClient';
import {Post} from '../types/Posts';
import {revalidatePath, revalidateTag} from 'next/cache';
import {unknown} from 'zod';
import {redirect} from 'next/navigation';

export const likePost = async (postId: number) => {
    //pobrac artykul
    const post = await fetchClient<Post>(`http://localhost:3004/posts/${postId}`);

    //wyslac do servera update artykulu z akutalna iloscia reactions + 1
    await updateClient('PATCH', `http://localhost:3004/posts/${postId}`,
        {
            reactions: post.reactions + 1,
        });
    revalidateTag(generatePostTag(postId));
    // revalidatePath(`/posts/${postId}`)
};

export const savePost = async (formData: FormData) => {
    //pobrac artykul
    const data: { [key: string]: unknown } = {};
    for (const pair of formData.entries()) {
        data[pair[0]] = pair[1];
    }
    data.tags = data.tags ? (data.tags as string).split(',') : [];
    data.reactions = 0; // nie mamy w naszysz FORM wiec podajemy, ze nie ma zadnego like
    await updateClient('POST', 'http://localhost:3004/posts', data);
    revalidatePath('/posts'); // odswiezenie calej strony postow
    redirect("/posts"); // przekierowanie do strony postow, po zrewalidowanu cache wyswietlamy nowy post
};
