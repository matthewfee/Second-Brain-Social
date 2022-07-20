/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { TextInput } from '../NameInput';
import { GoogleExternalSignup, AppleExternalSignup } from '../ExternalSignup';
import { Button } from '../../Button';
import { PasswordInput } from '../PasswordInput';
import { auth } from '../../../services/firebase';
import { useStateValue, setUser } from '../../../contexts';

export const LoginForm = ({ login }) => {
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('password');
  // const [user, setUser] = useState({ email: 'NO EMAIL' });

  const { dispatch } = useStateValue();

  const router = useRouter();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // console.log('LOGGED IN');
        setUser(currentUser);
        router.push('/feed');
      } else {
        // console.log('LOGGED OUT');
      }
    });
  }, []);

  useEffect(() => {
    getRedirectResult(auth)
      // .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;

      // The signed-in user info.
      // const { user } = result;
      // })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const signInWithGoogle = () => {
    console.log('SIGNING IN WITH GOOGLE');
    signInWithRedirect(auth, provider)
      // .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      // const { user } = result;
      // ...
      // })
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

  const firebaseLogin = async () => {
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser(userData.user));
      router.push('/feed');
    } catch (error) {
      console.log(error.message);
    }
  };

  const keyHandlerLogin = (e) => {
    if (e.key === 'Enter') {
      firebaseLogin();
    }
  };

  return (
    <form className="bg-white rounded-lg p-5 min-w-[400px] w-full max-w-xl mx-4 md:mx-auto flex flex-col justify-between gap-5 drop-shadow-xl">
      <div className="signup-with flex justify-between">
        <GoogleExternalSignup login={login} callback={signInWithGoogle} />
        <AppleExternalSignup login={login} />
      </div>
      {/* <h1>User {state.user?.email}</h1> */}
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-gray-300" />
        <span className="flex-shrink mx-4 text-gray-600">OR</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>
      <TextInput
        keyCallback={(e) => keyHandlerLogin(e)}
        type="email"
        value={email}
        inputChange={setEmail}
      />
      <PasswordInput
        keyCallback={(e) => keyHandlerLogin(e)}
        password={password}
        setPassword={setPassword}
      />
      <Button callback={() => firebaseLogin()}>Login</Button>
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
    </form>
  );
};
