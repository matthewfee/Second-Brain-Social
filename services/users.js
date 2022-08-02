import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, doc, deleteDoc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import { PROFILE_PICTURE_DEFAULT_URL } from '../constants/constants';

// collection ref
const usersColRef = collection(db, 'users');

// get 1 user from db
export const getUser = async (uid) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
    throw new Error("User don't exist in collection");
  } catch (error) {
    throw new Error(error);
  }
};

// get collection data
export const getUsers = async () => {
  try {
    onSnapshot(usersColRef, (snapshot) => {
      const users = snapshot.docs.map((snapshotDoc) => snapshotDoc.data());
      return users;
    });
  } catch (error) {
    console.error(error);
  }
};

// create a user
export const createUser = async (user) => {
  // checks if user already exists
  try {
    const userDoc = await getUser(user?.uid);

    if (userDoc) {
      console.log('USER ALREADY EXISTS', userDoc);
      return userDoc;
    }
  } catch (error) {
    console.log('USER NOT FOUND IN COLLECTION');
  }

  const userToSave = {
    displayName: user?.displayName || null,
    firstName: user?.firstName || null,
    lastName: user?.lastName || null,
    dateOfBirth: user?.dateOfBirth || null,
    gender: user?.gender || null,
    email: user?.email || null,
    profilePictureURL: PROFILE_PICTURE_DEFAULT_URL,
  };

  console.log('USER TO SAVE', userToSave);

  // if user has an email and password created on signup page, creates user with email and password

  if (user.email && user.password) {
    console.log('CREATING USER WITH EMAIL AND PASSWORD');
    try {
      const userData = await createUserWithEmailAndPassword(auth, user.email, user.password);

      await setDoc(doc(db, 'users', userData.user.uid), userToSave);
      return userToSave;
    } catch (error) {
      throw new Error(error);
    }
  }

  // this is for github and google signin, so user is created in collection

  await setDoc(doc(db, 'users', user.uid), {
    ...userToSave,
  });

  return userToSave;
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
