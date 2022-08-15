import { Comment } from './Comment';
import { deleteCommentFromPost } from '../../../services';

export const Comments = ({ comments, postId, fetchPosts }) => {
  const handleDeleteComment = async (comment) => {
    const updatedComments = comments.filter((c) => c.commentId !== comment.commentId);
    await deleteCommentFromPost(updatedComments, postId);
    fetchPosts();
  };

  return (
    <div className="bg-gray-100">
      {comments.map((comment) => (
        <Comment
          key={comment.comment}
          comment={comment}
          handleDeleteComment={handleDeleteComment}
        />
      ))}
    </div>
  );
};
