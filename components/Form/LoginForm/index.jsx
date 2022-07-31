/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  GithubAuthProvider,
  fetch,
} from 'firebase/auth';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { TextInput } from '../TextInput';
import { GoogleExternalSignup, GithubExternalSignup } from '../ExternalSignup';
import { Button } from '../../Button';
import { PasswordInput } from '../PasswordInput';
import { auth } from '../../../services/firebase';
import { useStateValue, setUser } from '../../../contexts';
import { getUser, createUser } from '../../../services/users';

export const LoginForm = ({ login }) => {
  const { dispatch } = useStateValue();

  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const githubProvider = new GithubAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('currentUSER', currentUser);
        dispatch(setUser(currentUser));
        router.push('/feed');
      } else {
        // console.log('LOGGED OUT');
      }
    });
  }, []);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;

        // The signed-in user info.
        const { user } = result;

        console.log('AUTH USER', user);

        createUser(user);
      })
      .catch((error) => {
        console.error(error);
        console.log('FIREBASE ERROR', error);
        // if (
        //   error.email &&
        //   error.credential &&
        //   error.code === 'auth/account-exists-with-different-credential'
        // ) {
        //   console.log('ERROR WITH SIGNIN');
        // }
      });
  }, [auth]);

  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the ////Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        // const { user } = result;
        // console.log('AUTH USER', user);
        // createUser(user);
      })
      .catch((error) => {
        console.error(error);
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        //  The email of the user's account used.
        // const { email } = error.customData;
        // /The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const signInWithGithub = () => {
    signInWithRedirect(auth, githubProvider)
      .then((result) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const firebaseLogin = async (values) => {
    try {
      const userData = await signInWithEmailAndPassword(auth, values.email, values.password);
      const userCol = await getUser(userData.user.uid);
      dispatch(setUser({ ...userCol, uid: userData.user.uid }));
      router.push('/feed');
    } catch (error) {
      console.log(error.message);
      if (error.message.includes('user-not-found')) {
        router.push('/signup');
      }
    }
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Please enter your Email'),
    password: yup
      .string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        firebaseLogin(values);
      }}
    >
      <Form className="bg-white rounded-lg p-5 min-w-[400px] w-full max-w-xl mx-4 md:mx-auto flex flex-col justify-between gap-5 drop-shadow-xl">
        <div className="signup-with flex justify-between">
          <GoogleExternalSignup login={login} callback={signInWithGoogle} />
          <GithubExternalSignup login={login} callback={signInWithGithub} />
        </div>
        {/* <h1>User {state.user?.email}</h1> */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-300" />
          <span className="flex-shrink mx-4 text-gray-600">OR</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        <TextInput label="Your Email" name="email" type="email" placeholder="Your Email" />

        <PasswordInput
          name="password"
          type="password"
          label="Password"
          placeholder="Your password here"
        />
        <Button type="submit">Sign In</Button>
        <small className="mx-auto">
          {`Don't have an account?  `}
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 ml-2"
            tabIndex={0}
            onClick={() => router.push('/signup')}
            onKeyPress={() => router.push('/signup')}
          >
            Sign Up
          </button>
        </small>
      </Form>
    </Formik>
  );
};
