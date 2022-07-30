import { likePost } from '../../../services/posts';
import { useStateValue } from '../../../contexts';

export const PostReactions = ({ post, toggleShowComments, showCommentsButton }) => {
  const { state } = useStateValue();

  const userId = state?.user?.uid;

  const userHasLikedPost = post?.userLikes?.includes(userId);
  const postLikesString = post.likes > 0 ? `(${post?.likes})` : '';

  return (
    <div className="flex justify-between py-1 border-t-2 border-b-2 border-gray-300">
      <button
        type="button"
        onClick={() => likePost(post, userId)}
        className={`flex gap-1 items-center hover:text-blue-500 cursor-pointer ${
          userHasLikedPost ? 'text-blue-500' : ''
        }`}
      >
        {!userHasLikedPost && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {userHasLikedPost && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5941 1.52089C16.4037 3.48398 16.4661 6.61039 14.7829 8.64965L7.99905 16L1.21678 8.64965C-0.466386 6.61039 -0.403187 3.47879 1.40558 1.52089C2.81195 9.61665e-05 4.87431 -0.380751 6.60868 0.380943L3.47434 3.77221L4.60552 4.99698L7.99986 1.32441L7.98946 1.31229L8.00066 1.32354C9.87982 -0.50193 12.7838 -0.44134 14.5941 1.52089Z"
              fill="#377DFF"
            />
          </svg>
        )}
        {userHasLikedPost ? `Liked ` : `Like `}
        {postLikesString}
      </button>
      {showCommentsButton && (
        <button
          type="button"
          onClick={toggleShowComments}
          className="flex gap-1 items-center hover:text-blue-500 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Comments
        </button>
      )}
      <div className="flex gap-1 items-center hover:text-blue-500 cursor-pointer">
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
      </div>
    </div>
  );
};
