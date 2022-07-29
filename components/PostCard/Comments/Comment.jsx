import { useState, useEffect } from 'react';
import { getUser } from '../../../services/users';
import { MyImage } from '../../MyImage';

export const Comment = ({ comment }) => {
  const [userThatCommented, setUserThatCommented] = useState();

  const fetchUserThatCommented = async () => {
    const user = await getUser(comment.userId);
    setUserThatCommented(user);
  };
  useEffect(() => {
    fetchUserThatCommented();
  }, []);

  //   console.log('comment: ', comment);
  console.log('userThatCommented: ', userThatCommented);

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
          <div className="text-gray-600 bg-white w-full rounded-lg p-2">
            <div className="font-bold">{userThatCommented.name}</div>
            <div className="text-gray-400 text-xs -mt-1">9h ago</div>
            <div className="mt-2 text-sm">{comment.comment}</div>
          </div>
        </>
      ) : null}
    </div>
  );
};
