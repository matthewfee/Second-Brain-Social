import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, doc, deleteDoc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from './firebase';

// collection ref
const usersColRef = collection(db, 'users');

// get 1 user from db
export const getUser = async (uid) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      console.log('user data:', docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  } catch (error) {
    console.log(error);
  }
};

// get collection data
export const getUsers = async () => {
  try {
    onSnapshot(usersColRef, (snapshot) => {
      const users = snapshot.docs.map((snapshotDoc) => snapshotDoc.data());
      console.log('users in services: ', users);
      return users;
    });
  } catch (error) {
    console.log(error);
  }
};

// create a user
export const createUser = async (user) => {
  try {
    const userData = await createUserWithEmailAndPassword(auth, user.email, user.password);
    await setDoc(doc(db, 'users', userData.user.uid), {
      name: user.name,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
    });

    return userData.user;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

// get collection data
export const addUser = async (newUser) => {
  try {
    const addedUser = await addDoc(usersColRef, newUser);
    console.log(addedUser);
    return addedUser;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// get collection data
export const deleteUser = async (userID) => {
  const docRef = doc(db, 'users', userID.value);
  try {
    const deletedUser = await deleteDoc(docRef);
    console.log(deletedUser);
    //   return deletedPost;
  } catch (error) {
    console.log(error);
  }
};