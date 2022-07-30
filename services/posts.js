import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  increment,
  updateDoc,
} from 'firebase/firestore';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db } from './firebase';
import { saveImages } from './utils';

// collection ref
const postsColRef = collection(db, 'posts');

// get collection data
export const getPosts = async () => {
  try {
    const posts = [];
    const querySnapshot = await getDocs(postsColRef);
    querySnapshot.forEach((snapshopDoc) => {
      // doc.data() is never undefined for query doc snapshots

      const newObj = snapshopDoc.data();
      newObj.postId = snapshopDoc.id;
      posts.push(newObj);
    });
    return posts;
  } catch (error) {
    console.log('error in getPosts service: ', error);
    return error;
  }
};

// get collection data
export const addPost = async (newPost, images) => {
  const postToAdd = newPost;
  try {
    const imagesPath = saveImages(images);

    if (postToAdd.images) {
      postToAdd.images = imagesPath;
    }

    const addedPost = await addDoc(postsColRef, postToAdd);
    return addedPost;
  } catch (error) {
    console.error(error);
    return {};
  }
};

// get collection data
export const deletePost = async (postID) => {
  const docRef = doc(db, 'posts', postID.value);
  try {
    const deletedPost = await deleteDoc(docRef);
    console.log(deletedPost);
    //   return deletedPost;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (post, userID) => {
  const docRef = await doc(db, 'posts', post.postId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    console.log('postdata', data, userID);

    if (data.userLikes) {
      if (data?.userLikes?.includes(userID)) {
        console.log('user already liked post');

        // remove like from post

        await updateDoc(docRef, {
          likes: increment(-1),
          userLikes: [...data.userLikes.filter((item) => item !== userID)],
        });
        return;
      }
    }

    await updateDoc(docRef, {
      likes: increment(1),
      userLikes: [...data.userLikes, userID],
    });

    return;
  }
  console.log('No post found');
};

export const commentPost = async (commentText, postId, userId) => {
  const docRef = doc(db, 'posts', postId);
  const docSnap = await getDoc(docRef);

  const commentDate = new Date();

  if (docSnap.exists()) {
    const data = docSnap.data();

    let { comments } = data;
    if (comments) {
      comments.push({ comment: commentText, userId, commentDate });
    } else {
      comments = [{ comment: commentText, userId, commentDate }];
    }

    await updateDoc(docRef, {
      comments,
    });
  }
};
