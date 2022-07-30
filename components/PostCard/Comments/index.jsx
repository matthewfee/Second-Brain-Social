import { Comment } from './Comment';

export const Comments = ({ comments }) => {
  console.log('comments in Comments: ', comments);

  return (
    <div className="bg-gray-100">
      {comments.map((comment) => (
        <Comment key={comment.comment} comment={comment} />
      ))}
    </div>
  );
};
