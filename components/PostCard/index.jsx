import { useState } from 'react';
import { PostHeader } from './PostHeader';
import { PostImage } from './PostImage';
import { PostReacted } from './PostReacted';
import { PostReactions } from './PostReactions';
import { PostComments } from './PostComments';
import { useStateValue } from '../../contexts';
import { Comments } from './Comments';

export const PostCard = ({ post, fetchPosts }) => {
  const { state } = useStateValue();
  const [showComments, setShowComments] = useState(false);

  const toggleShowComments = () => {
    console.log('TOGGLE SHOW COMMENTS');
    setShowComments((prevState) => !prevState);
  };

  return (
    <div
      className="bg-white mt-8 md:rounded-lg p-5 
    mx-4 md:mx-auto flex 
    flex-col justify-between 
    gap-5 drop-shadow-xl
    w-full max-w-[512px]
    h-auto text-gray-600"
    >
      <PostHeader
        headerImageSRC={post.user.profilePictureURL}
        date={post?.createdDate}
        post={post}
      />
      <p className="text-gray-600">{post.text}</p>
      <div className="flex gap-1">
        {post?.images?.length >= 1 &&
          post.images.map((image, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <PostImage key={i} src={image} />
          ))}
      </div>
      <PostReacted comments={post?.comments} likes={post?.likes} />
      <PostReactions
        post={post}
        toggleShowComments={toggleShowComments}
        showCommentsButton={post?.comments?.length > 0}
        fetchPosts={fetchPosts}
      />
      <PostComments postId={post.postId} user={state.user} fetchPosts={fetchPosts} />
      {post.comments && showComments && <Comments comments={post.comments} />}
    </div>
  );
};
