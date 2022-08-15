import { useState, useEffect } from 'react';
import { getUser } from '../../../services/users';
import { MyImage } from '../../MyImage';
import { useStateValue } from '../../../contexts';

export const Comment = ({ comment, handleDeleteComment }) => {
  const [userThatCommented, setUserThatCommented] = useState();
  const [showDeleteIcon, setShowDeleteIcon] = useState();

  const { state } = useStateValue();

  const handleShowDeleteIcon = () => {
    if (state.user.uid === comment.userId) {
      setShowDeleteIcon(true);
    }
  };

  const fetchUserThatCommented = async () => {
    const user = await getUser(comment.userId);
    setUserThatCommented(user);
  };
  useEffect(() => {
    fetchUserThatCommented();
  }, []);

  let commentTime = null;

  if (comment.commentDate) {
    commentTime = comment.commentDate.toDate().toDateString();
  }

  return (
    <div className="flex gap-6 mx-2 my-4">
      {userThatCommented !== undefined ? (
        <>
          <div className="relative h-12 w-12 rounded-full">
            <MyImage
              src="https://firebasestorage.googleapis.com/v0/b/meetmax-d2df1.appspot.com/o/images%2Fuser%20default.png2022-07-09T14%3A22%3A41.925Z?alt=media&token=dec4832e-eae6-4080-9f93-a54392885233"
              alt="profile"
              classes="rounded-full"
            />
          </div>
          <div
            className="flex justify-between items-center text-gray-600 bg-white w-full rounded-lg p-2"
            onMouseEnter={handleShowDeleteIcon}
            onMouseLeave={() => setShowDeleteIcon(false)}
          >
            <div className="">
              <div className="font-bold text-sm">{userThatCommented.displayName}</div>
              <div className="text-gray-400 text-xs -mt-1">{commentTime}</div>
              <div className="mt-2 text-sm">{comment.comment}</div>
            </div>
            {showDeleteIcon && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 cursor-pointer hover:bg-red-200 rounded-full p-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                onClick={() => handleDeleteComment(comment)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};
