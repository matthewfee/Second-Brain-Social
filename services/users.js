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
      return docSnap.data();
    }
    // doc.data() will be undefined in this case
    console.log('No user with ID: ', uid);
    return false;
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
  // check if user exists

  const userDoc = await getUser(user.uid);

  if (userDoc) {
    return;
  }

  const userToSave = {
    displayName: user?.displayName || null,
    firstName: user?.firstName || null,
    lastName: user?.lastName || null,
    dateOfBirth: user?.dateOfBirth || null,
    gender: user?.gender || null,
    profilePictureURL: user?.profilePictureURL || null,
    email: user?.email || null,
  };

  if (user.email && user.password) {
    try {
      const userData = await createUserWithEmailAndPassword(auth, user.email, user.password);

      await setDoc(doc(db, 'users', userData.user.uid), userToSave);
    } catch (error) {
      console.error(error.message);
    }
  } else {
    await setDoc(doc(db, 'users', user.uid), userToSave);
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
