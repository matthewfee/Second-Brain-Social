import { useRouter } from 'next/router';
import { useState } from 'react';
import { createUser } from '../../../services/users';
import { Button } from '../../Button';
import { DatePicker } from '../../DatePicker';
import { GenderPicker } from '../../GenderPicker';
// import { GenderPicker } from '../..';
import { AppleExternalSignup, GoogleExternalSignup } from '../ExternalSignup';
import { TextInput } from '../NameInput';
import { PasswordInput } from '../PasswordInput';
import { useStateValue, setUser } from '../../../contexts';
import { PROFILE_PICTURE_DEFAULT_URL } from '../../../constants/constants';

export const SignupForm = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useStateValue();

  const router = useRouter();

  const handleSignup = async () => {
    const createdUser = await createUser({
      email,
      password,
      name: 'test2',
      dateOfBirth: '12/1/2003',
      gender: 'female',
      profilePictureURL: PROFILE_PICTURE_DEFAULT_URL,
    });
    dispatch(setUser(createdUser));
    router.push('/feed');
  };

  return (
    <form className="bg-white rounded-lg p-5 min-w-[400px] w-full max-w-xl mx-4 md:mx-auto flex flex-col justify-between gap-5 drop-shadow-xl">
      <div className="signup-with flex justify-between">
        <GoogleExternalSignup login={login} />
        <AppleExternalSignup login={login} />
      </div>
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-gray-300" />
        <span className="flex-shrink mx-4 text-gray-600">OR</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>
      <TextInput type="email" value={email} inputChange={setEmail} />
      <PasswordInput
        password={password}
        setPassword={setPassword}
        placeholder="Your password here"
      />
      <PasswordInput
        password={passwordConfirmation}
        setPassword={setPasswordConfirmation}
        placeholder="Password confirmation"
      />
      {password !== passwordConfirmation ? (
        <div className="text-red-500">Passwords don&apos;t match</div>
      ) : null}
      <div className="bottom-form-section flex flex-row justify-between">
        <DatePicker />
        <GenderPicker />
      </div>
      <Button
        callback={() => {
          handleSignup();
        }}
      >
        Sign Up
      </Button>
      <small className="mx-auto">
        Already have an account?
        <button
          role="link"
          className="text-blue-500 hover:text-blue-700 ml-2"
          tabIndex={0}
          onClick={() => router.push('/login')}
          onKeyPress={() => router.push('/login')}
          type="button"
        >
          Sign In
        </button>
      </small>
    </form>
  );
};
