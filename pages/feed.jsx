import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CreatePost, PostCard, Sidebar } from '../components';
import { useStateValue, setUser } from '../contexts';
import { auth } from '../services/firebase';

const Feed = () => {
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useStateValue();

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log('CURRENT USER', currentUser);
      if (currentUser) {
        console.log('LOGGED IN in feeds');
        dispatch(setUser(currentUser));
      } else {
        router.push('/login');
      }
    });
  }, []);

  return (
    <div className="feed-content w-full flex flex-row">
      <Sidebar />
      <div className="post-content-container flex flex-col items-center w-full p-0 m-0  ">
        <CreatePost />
        <PostCard />
      </div>
    </div>
  );
};

export default Feed;
