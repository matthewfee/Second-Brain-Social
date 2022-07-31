import Image from 'next/image';
import { likePost } from '../../../services/posts';
import { useStateValue } from '../../../contexts';

export const PostReactions = ({ post, toggleShowComments, showCommentsButton, fetchPosts }) => {
  const { state } = useStateValue();

  const userId = state?.user?.uid;

  const userHasLikedPost = post?.userLikes?.includes(userId);
  const postLikesString = post.likes > 0 ? `(${post?.likes})` : '';

  return (
    <div className="flex justify-between py-1 border-t-2 border-b-2 border-gray-300">
      <button
        type="button"
        onClick={async () => {
          await likePost(post, userId);
          fetchPosts();
        }}
        className={`flex gap-1 items-center hover:text-blue-500 cursor-pointer ${
          userHasLikedPost ? 'text-blue-500' : ''
        }`}
      >
        {!userHasLikedPost && <Image src="/icons/unliked.svg" height={20} width={20} />}
        {userHasLikedPost && <Image src="/icons/liked.svg" height={20} width={20} />}
        <span className="ml-[10px] text-md">
          {userHasLikedPost ? `Liked ` : `Like `}
          {postLikesString}
        </span>
      </button>
      {showCommentsButton && (
        <button
          type="button"
          onClick={toggleShowComments}
          className="flex gap-1 items-center hover:text-blue-500 cursor-pointer"
        >
          <Image src="/icons/comments.svg" height={20} width={20} />
          <span className="ml-[10px] text-md">Comments</span>
        </button>
      )}
      {/* <div className="flex gap-1 items-center hover:text-blue-500 cursor-pointer">
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          stroke="currentColor"
          className="h-4 w-4"
          fill="currentColor"
        >
          <path d="M490.57,427.47H190.49a21.43,21.43,0,0,1-15.15-36.59l94.35-94.35c-25.08-23-58.36-35.85-93.85-35.85-66.18,0-122.24,44.69-133.31,106.27A21.43,21.43,0,0,1,.09,361.24C23,108.89,232.53,106,234.64,106c61,0,119.27,22.51,163.18,62.43l77.59-77.58A21.43,21.43,0,0,1,512,106V406A21.43,21.43,0,0,1,490.57,427.47ZM242.24,384.61H469.13V157.71L413,213.85a20.79,20.79,0,0,1-15.68,6.27,21.4,21.4,0,0,1-15.35-7c-37-40.84-90.73-64.26-147.32-64.26-5.31,0-102.79,2.17-157.39,97.35a183.54,183.54,0,0,1,98.58-28.36c55.1,0,106.24,23.91,140.3,65.61a21.43,21.43,0,0,1-1.44,28.72Z" />
        </svg>
        Share
      </div> */}
    </div>
  );
};
