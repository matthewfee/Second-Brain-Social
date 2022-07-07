import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage, db } from './firebase';

// collection ref
const postsColRef = collection(db, 'posts');

// get collection data
export const getPosts = async () => {
  try {
    const posts = [];
    const querySnapshot = await getDocs(postsColRef);
    querySnapshot.forEach((snapshopDoc) => {
      // doc.data() is never undefined for query doc snapshots
      posts.push(snapshopDoc.data());
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
