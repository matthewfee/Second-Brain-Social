import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  increment,
  update,
  updateDoc,
  get,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage, db, firebaseApp } from './firebase';

// collection ref
const postsColRef = collection(db, 'posts');

// get collection data
export const getPosts = async () => {
  try {
    const posts = [];
    const querySnapshot = await getDocs(postsColRef);
    querySnapshot.forEach((snapshopDoc) => {
      // doc.data() is never undefined for query doc snapshots

      console.log(snapshopDoc, 'snapshopDoc');

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
    const imagesPath = await Promise.all(
      images.map(async (image) => {
        const imageRef = ref(storage, `images/${image.name + new Date().toISOString()}`);
        await uploadBytes(imageRef, image.image);
        const imageDownloadPath = await getDownloadURL(imageRef);
        return imageDownloadPath;
      })
    );
    console.log('imagesPath: ', imagesPath);
    postToAdd.images = imagesPath;
    const addedPost = await addDoc(postsColRef, postToAdd);
    return addedPost;
  } catch (error) {
    console.log(error);
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

export const likePost = async (post) => {
  const docRef = await doc(db, 'posts', post.postId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    console.log('Document data:', data);

    if (data.userLikes.includes(post.uid)) {
      console.log('user already liked post');
      return;
    }

    await updateDoc(docRef, {
      likes: increment(1),
      userLikes: [...data.userLikes, post.uid],
    });
  } else {
    console.log('No post found');
  }
};
