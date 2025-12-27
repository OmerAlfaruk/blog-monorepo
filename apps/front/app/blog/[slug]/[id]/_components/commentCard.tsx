import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentEntity } from "@/lib/types/moduleTypes";
import { UserIcon } from "lucide-react";

type Props = {
    comment: CommentEntity

}

const CommentCard = ({comment}: Props) => {
    return (
        <div className="p-2 rounded rouded-md shadow-md">
            <div className="flex gap-2 text-slate-500 items-center">
                <Avatar className="border-2">
                    <AvatarImage src={comment.author.avatar?.toString()} className="rounded-full w-14 border border-white" />

                    <AvatarFallback>
                        <UserIcon className="w-8 text-slate-500"/>

                    </AvatarFallback>

                </Avatar>
                <p className="font-bold">{comment.author.name}</p>
                <p className="text-sm">{new Date(comment.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="mt-2">
                <p className="text-sm">{comment.content}</p>

            </div>
        </div>
    )
};

export default CommentCard;