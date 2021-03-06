/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRouter } from 'next/router';
import { TextInput } from './TextInput';
import { GoogleExternalSignup, GithubExternalSignup } from './ExternalSignup';
import { Button } from '../Button';
import { PasswordInput } from './PasswordInput';
import { DatePickerField } from '../DatePicker';

export const Form = ({ login, signup }) => {
  const router = useRouter();

  return (
    <form className="bg-white rounded-lg p-5 min-w-[400px] w-full max-w-xl mx-4 md:mx-auto flex flex-col justify-between gap-5 drop-shadow-xl">
      <div className="signup-with flex justify-between">
        <GoogleExternalSignup login={login} />
        <GithubExternalSignup login={login} />
      </div>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-gray-300" />
        <span className="flex-shrink mx-4 text-gray-600">OR</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>

      {signup && <TextInput type="name" />}
      {signup && <TextInput type="email" />}
      {signup && <PasswordInput placeholder="Your password here" />}
      {signup && <PasswordInput placeholder="Password confirmation" />}
      {signup && (
        <div className="bottom-form-section flex flex-row justify-between">
          <DatePickerField name="dateOfBirth" />
          <div className="gender flex gap-2 p-2 rounded-xl border-2 border-gray-400 w-full max-w-[240px]">
            <label htmlFor="gender" key="male" className="p-1">
              <input type="radio" />
              <span className="ml-1">Male </span>
            </label>
            <label htmlFor="gender" key="female" className="p-1">
              <input type="radio" />
              <span className="ml-1">Female </span>
            </label>
            <label htmlFor="gender" key="other" className="p-1">
              <input type="radio" />
              <span className="ml-1">Other </span>
            </label>
          </div>
        </div>
      )}

      {signup && <Button>Sign Up</Button>}

      {signup && (
        <small className="mx-auto">
          Already have an account?
          <a
            role="link"
            className="text-blue-500 hover:text-blue-700 ml-2"
            tabIndex={0}
            onClick={() => router.push('/login')}
            onKeyPress={() => router.push('/login')}
          >
            Sign In
          </a>
        </small>
      )}

      {login && <TextInput type="email" />}
      {login && <PasswordInput />}
      {login && <Button>Login</Button>}

      {login && (
        <small className="mx-auto">
          {`Don't have an account?  `}
          <a className="text-blue-500 hover:text-blue-700" href="#">
            Sign Up
          </a>
        </small>
      )}
    </form>
  );
};
