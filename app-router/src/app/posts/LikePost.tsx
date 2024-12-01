'use client';

import React, {FC, useCallback} from 'react';
import {likePost} from '@/app/posts/actions';

type LikePostProps = {
    postId: number
};

export const LikePost: FC<LikePostProps> = ({postId}) => {

    const onLike = useCallback(async () => {
        await likePost(postId)
    }, [postId]);

    return (
        <div>
            <button onClick={onLike} className="button">
                <img src="/like.png" alt="like + 1" height={16} width={16}/>
            </button>
        </div>
    );
};

export default LikePost;
