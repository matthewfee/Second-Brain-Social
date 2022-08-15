/* eslint-disable no-unused-vars */
import { useState } from 'react';
import _uniqueId from 'lodash/uniqueId';
import { PostComment } from '../PostComment';
import { PostProfileImage } from '../PostProfileImage';
import { commentPost } from '../../../services/posts';

export const PostComments = ({ postId, user, fetchPosts }) => {
  const [commentText, setCommentText] = useState('');
  const [commentId] = useState(_uniqueId('prefix-'));

  const sendComment = async () => {
    setCommentText('');
    await commentPost(commentText, postId, user.uid, commentId);
    fetchPosts();
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="">
        {user.profilePictureURL && <PostProfileImage imageSRC={user.profilePictureURL} />}
      </div>
      <div className="flex-1">
        <PostComment setCommentText={setCommentText} commentText={commentText} />
      </div>
      {/* <div className="send hover:bg-blue-200 cursor-pointer p-2 rounded-md"> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-send h-6 w-6 hover:text-blue-500 cursor-pointer"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokewinecap="round"
        strokeLinejoin="round"
        onClick={sendComment}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="10" y1="14" x2="21" y2="3" />
        <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
      </svg>
    </div>
  );
  // </div>
};
