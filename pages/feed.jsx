import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { CreatePost, PostCard, Sidebar, Modal, FriendsList } from '../components';
import { useStateValue, setUser, setModal } from '../contexts';
import { auth } from '../services/firebase';
import { getPosts } from '../services/posts';

const Feed = () => {
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useStateValue();
  const [posts, setPosts] = useState();

  const router = useRouter();

  const fetchPosts = async () => {
    const receivedPosts = await getPosts();
    setPosts(receivedPosts);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(setUser(currentUser));
      } else {
        router.push('/login');
      }
    });
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const openCreatePost = () => {
    dispatch(setModal({ show: true, content: 'createPost' }));
  };

  const closeCreatePost = () => {
    dispatch(setModal({ show: false, content: '' }));
  };

  return (
    <>
      {state.modal.show && (
        <Modal closeModal={closeCreatePost}>
          <CreatePost createPost closeCreatePost={closeCreatePost} fetchPosts={fetchPosts} />
        </Modal>
      )}
      <div className="relative feed-content w-full flex flex-row justify-center">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="post-content-container flex flex-col items-center w-3/5 mr-32 pb-8 m-0 bg-gray-100 rounded-xl">
          <CreatePost openCreatePost={openCreatePost} />

          {posts &&
            posts.map((post, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <PostCard key={i} post={post} />
            ))}
        </div>
        <FriendsList />
      </div>
    </>
  );
};

export default Feed;
