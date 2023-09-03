import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { api, type RouterOutputs } from "~/utils/api";


import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { CeneteredLoadingSpinner } from "~/components/LoadingSpinner";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const { user } = useUser();

  const [input, setInput] = useState("")

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting, } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("")
      void ctx.posts.getAllWithAuthor.invalidate()
    },
    onError: (err: any) => {
      const errorMessage = err.data?.zodError?.fieldErrors?.content
      console.log(err)
      if (errorMessage) {
        toast.error(errorMessage[0])
      } else {
        toast.error("Failed to post! Please try again.")
      }
    }
  });

  if (!user) return null;

  return (
    <div className="flex gap-3 w-full">
      <Image src={user.imageUrl} alt="user profile image" width={56} height={56} className="rounded-full" />

      <input type="text" placeholder="Type something funny!" className="bg-transparent grow outline-none"
        value={input} onChange={(e) => setInput(e.target.value)} disabled={isPosting}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            if (input !== "") {
              void mutate({ content: input })
            }
          }
        }}
      />

      {input !== "" && !isPosting
        ? <button onClick={() => mutate({ content: input })} className="">Post</button>
        : null}

      {isPosting ? <CeneteredLoadingSpinner size={20} /> : null}
    </div>
  );
};

type PostWithAuthor = RouterOutputs["posts"]["getAllWithAuthor"][number];

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

const Feed = () => {
  const { data, isLoading } = api.posts.getAllWithAuthor.useQuery();

  if (isLoading) return <CeneteredLoadingSpinner size={45} />

  if (!data) return <div>Something went wrong</div>

  return (
    <div className="flex flex-col h-full">
      {data.map((postWithAuthor) => (
        <PostView key={postWithAuthor.post.id} {...postWithAuthor} />
      ))}
    </div>
  )
}

export default function Home() {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Start fetching asap (used in Feed component, but already starting to fetch here)
  api.posts.getAllWithAuthor.useQuery();

  if (!userLoaded) return <div />;

  return (
    <>
      <Head>
        <title>Home Owl</title>
        <meta name="description" content="Keep a watchful eye on your chores!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center h-screen">
        <div className="md:max-w-2xl w-full h-full border-x border-slate-400">
          <div className="flex border-b border-slate-400 p-4">
            {isSignedIn
              ? <div className="flex justify-center">
                <CreatePostWizard />
                <SignOutButton />
              </div>
              : <SignInButton />
            }
          </div>
          <Feed />
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {/* {secretMessage && <span> - {secretMessage}</span>} */}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
