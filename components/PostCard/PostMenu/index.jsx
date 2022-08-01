/* eslint-disable no-unused-vars */
import { useStateValue, setAlert } from '../../../contexts';
import { deletePost } from '../../../services';

export const PostMenu = ({ post, fetchPosts }) => {
  const { state, dispatch } = useStateValue();

  const handleDeletePost = async () => {
    if (state.user.uid === post.user.uid) {
      try {
        await deletePost(post.postId);
        dispatch(
          setAlert({
            show: true,
            header: 'Successfull',
            message: `Post deleted successfully`,
            success: true,
          })
        );
        setTimeout(() => {
          dispatch(setAlert({ show: false, header: '', message: '' }));
        }, 5000);
        fetchPosts();
      } catch (error) {
        dispatch(
          setAlert({
            show: true,
            header: 'Error',
            message: error.message,
            success: false,
          })
        );
        setTimeout(() => {
          dispatch(setAlert({ show: false, header: '', message: '' }));
        }, 5000);
      }
    } else {
      dispatch(
        setAlert({
          show: true,
          header: 'Error',
          message: `You are not authorized to delete this post`,
          success: false,
        })
      );
      setTimeout(() => {
        dispatch(setAlert({ show: false, header: '', message: '' }));
      }, 5000);
    }
  };

  return (
    <div className="absolute top-8 right-0 lg:-right-24 py-4 px-8 rounded-md bg-gray-200 z-10">
      <button
        type="button"
        className="py-2 px-4 bg-gray-300 rounded-lg cursor-pointer"
        onClick={handleDeletePost}
      >
        Delete Post
      </button>
    </div>
  );
};
