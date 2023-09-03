import { type RouterOutputs } from "~/utils/api";


import Image from "next/image";
import Link from "next/link";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export type PostWithAuthor = RouterOutputs["posts"]["getAll"][number];

const PostView = ({ post, author }: PostWithAuthor) => {
    return (
        <div className="flex p-4 border-b border-slate-400 gap-3" key={post.id}>
            <Image src={author.imageUrl} width={56} height={56} className="rounded-full" alt="post author profile picture" />
            <div className="flex flex-col">
                <div className="flex gap-1 text-slate-300">
                    <Link href={`/@${author.name}`}>
                        <span>{`@${author.name} `}</span>
                    </Link>
                    <Link href={`/post/${post.id}`}>
                        <span className="font-thin">{` - ${dayjs(post.createdAt).fromNow()}`}</span>
                    </Link>
                </div>
                <span className="text-2xl">{post.content}</span>
            </div>
        </div>
    )
}


export default PostView