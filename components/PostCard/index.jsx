import { PostHeader } from './PostHeader';
import { PostImage } from './PostImage';
import { PostReacted } from './PostReacted';
import { PostReactions } from './PostReactions';
import { PostComments } from './PostComments';

export const PostCard = ({ post }) => (
  // console.log('');

  <div
    className="bg-white mt-8 md:rounded-lg p-5 
    mx-4 md:mx-auto flex 
    flex-col justify-between 
    gap-5 drop-shadow-xl
    w-full max-w-[512px]
    h-auto text-gray-600"
  >
    <PostHeader headerImageSRC={post.images[0]} />
    <p className="text-gray-600">{post.text}</p>
    <div className="flex gap-1">
      {post.images.length >= 1 && post.images.map((image) => <PostImage src={image} />)}
    </div>
    <PostReacted />
    <PostReactions />
    <PostComments />
  </div>
);
