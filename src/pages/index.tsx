import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { api, type RouterOutputs } from "~/utils/api";


import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import LoadingSpinner, { CeneteredLoadingSpinner, LoadingPage } from "~/components/LoadingSpinner";

dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className="flex gap-3 w-full">
      <Image src={user.imageUrl} alt="user profile image" width="14" height="14" className="rounded-full" />

      <input type="text" placeholder="Type something funny!" className="bg-transparent grow outline-none" />
    </div>
  );
};

type PostWithAuthor = RouterOutputs["posts"]["getAllWithAuthor"][number];

const PostView = ({ post, author }: PostWithAuthor) => {
  return (
    <div className="flex p-4 border-b border-slate-400 gap-3" key={post.id}>
      <Image src={author.imageUrl} width="48" height="14" className="rounded-full" alt="post author profile picture" />
      <div className="flex flex-col">
        <div className="flex text-slate-300">
          <span>{`@${author.name} `}</span>
          <span className="font-thin">{` - ${dayjs(post.createdAt).fromNow()}`}</span>
        </div>
        <span>{post.content}</span>
      </div>
    </div>
  )
}

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAllWithAuthor.useQuery();

  return (
    <>
      {
        postsLoading
          ? <CeneteredLoadingSpinner size={45} />
          : <div className="flex flex-col h-full">
            {data?.map((postWithAuthor) => (
              <PostView key={postWithAuthor.post.id} {...postWithAuthor} />
            ))}
          </div>
      }
    </>
  )
}

export default function Home() {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Start fetching asap (used in Feed component, but already starting to fetch here)
  api.posts.getAllWithAuthor.useQuery();

  console.log({ userLoaded, isSignedIn })

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
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />


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
