import CreatePostContainer from "./_component/createPostContainer";
import UpSertForm from "./_component/upsertForm";
 
const CreatePostPage = () => {
    return (
        <div className="bg-white shadow-md rounded-md p-6 max-w-2xl w-full mt-10">
            <h1 className="text-2xl font-bold text-center text-slate-700">Create Post</h1>

            <CreatePostContainer/>
        </div>
    )
};

export default CreatePostPage