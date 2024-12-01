"use client";
import React, {FC} from "react";
import {savePost} from '@/app/posts/actions';

export const FormPost:FC = () => {
    return(
        <form action={savePost}>
            <div className="form-line">
                <label>Title: </label>
                <input name="title" type="text"/>
            </div>
            <div className="form-line">
                <label>Body: </label>
                <textarea name="body" />
            </div>
            <div className="form-line">
                <label>Tags</label>
                <small>Separate by , (comma)</small>
                <input name="tags"/>
            </div>
            <button className="button">Save</button>
        </form>
    );
};

export default FormPost;