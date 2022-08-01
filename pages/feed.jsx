import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { SyncLoader } from 'react-spinners';
import { CreatePost, PostCard, Sidebar, FriendsList } from '../components';
import { useStateValue, setUser, setAlert } from '../contexts';
import { auth } from '../services/firebase';
import { getPosts, getUser } from '../services';

const Feed = () => {
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useStateValue();
  const [posts, setPosts] = useState();
  // used to display sub menu when post threeDots is clicked
  const [displayPostSubMenu, setdisplayPostSubMenu] = useState([]);

  const router = useRouter();

  const fetchPosts = async () => {
    const receivedPosts = await getPosts();
    const receivedPostsSortedByRecentDate = receivedPosts.sort(
      (a, b) => b.createdDate - a.createdDate
    );
    setdisplayPostSubMenu(receivedPosts.map((post) => ({ id: post.postId, show: false })));
    setPosts(receivedPostsSortedByRecentDate);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const updateUser = async () => {
          try {
            const userCol = await getUser(currentUser.uid);
            dispatch(setUser({ ...userCol, uid: currentUser.uid }));
            dispatch(
              setAlert({
                show: true,
                header: 'Successfull',
                message: `Welcome ${userCol.displayName}`,
                success: true,
              })
            );
            setTimeout(() => {
              dispatch(setAlert({ show: false, header: '', message: '' }));
            }, 5000);
            router.push('/feed');
          } catch (error) {
            console.log('error: ', error);
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
        };
        updateUser();
      } else {
        router.push('/login');
      }
    });
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="relative w-full flex flex-row justify-center">
      <div className="hidden lg:block fixed top-24 left-0 bottom-0 w-1/5 max-w-[200px] mr-2 bg-white">
        <Sidebar />
      </div>
      <div className="post-content-container flex flex-col items-center w-full lg:w-3/5 mx-4 lg:ml-4 lg:mr-8 lg:pb-8 bg-gray-200 rounded-xl">
        <CreatePost fetchPosts={fetchPosts} />
        {posts ? (
          posts.map((post) => (
            <PostCard
              key={post.postId}
              post={post}
              fetchPosts={fetchPosts}
              displayPostSubMenu={displayPostSubMenu}
              setdisplayPostSubMenu={setdisplayPostSubMenu}
            />
          ))
        ) : (
          <SyncLoader className="mt-24" />
        )}
      </div>
      <div className="hidden lg:block fixed right-0 bottom-0 top-32 bg-white w-1/5 mx-auto max-w-[300px]">
        <FriendsList />
      </div>
    </div>
  );
};

export default Feed;
