import {notFound} from 'next/navigation';

type FetchClientOptions = {
    revalidate?: number;
};

export async function fetchClient<P = unknown>(
    url: string,
    options: FetchClientOptions = {revalidate:10}
){
    const {revalidate} = options;
    const resp = await fetch(url, {next:{revalidate:10}});

    if(!resp.ok && resp.status ===404) {
        throw notFound();
    }

    if(!resp.ok) {
        throw new Error ("problem with getting post");
    }
    const post: P = await resp.json();
    return post;
};
