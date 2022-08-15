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
  console.log('postToAdd: ', postToAdd);
  try {
    const imagesPath = await saveImages(images);

    if (images) {
      postToAdd.images = imagesPath;
    }

    const addedPost = await addDoc(postsColRef, postToAdd);
    return addedPost;
  } catch (error) {
    console.error('ADD POST ERROR', error);
    return {};
  }
};

// get collection data
export const deletePost = async (postID) => {
  const docRef = doc(db, 'posts', postID);
  try {
    await deleteDoc(docRef);
    //   return deletedPost;
  } catch (error) {
    throw new Error(error);
  }
};

export const likePost = async (post, userID) => {
  const docRef = await doc(db, 'posts', post.postId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    if (data.userLikes) {
      if (data?.userLikes?.includes(userID)) {
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

export const commentPost = async (commentText, postId, userId, commentId) => {
  const docRef = doc(db, 'posts', postId);
  const docSnap = await getDoc(docRef);

  const commentDate = new Date();

  if (docSnap.exists()) {
    const data = docSnap.data();

    let { comments } = data;
    if (comments) {
      comments.push({ comment: commentText, userId, commentDate, commentId });
    } else {
      comments = [{ comment: commentText, userId, commentDate, commentId }];
    }

    await updateDoc(docRef, {
      comments,
    });
  }
};

export const deleteCommentFromPost = async (updatedComments, postId) => {
  const docRef = doc(db, 'posts', postId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    console.log('data: ', data);

    await updateDoc(docRef, {
      comments: updatedComments,
    });
  }
};
