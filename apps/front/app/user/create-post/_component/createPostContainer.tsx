"use client"

import { seveNewPost } from "@/lib/actions/postActions";
import { useActionState } from "react";
import UpSertForm from "./upsertForm";

const CreatePostContainer = () => {
    const [state,action]=useActionState(seveNewPost,undefined )
    return (
        <div className="bg-white shadow-md rounded-md p-6 max-w-2xl w-full mt-10">
            <h1 className="text-2xl font-bold text-center text-slate-700">Create Post</h1>
            <UpSertForm state={state} formAction={action}/>
        </div>
    )
};

export default CreatePostContainer