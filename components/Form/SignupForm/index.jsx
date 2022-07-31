/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { createUser } from '../../../services/users';
import { Button } from '../../Button';
import { DatePickerField } from '../../DatePicker';
import { GenderPicker } from '../../GenderPicker';
import { GithubExternalSignup, GoogleExternalSignup } from '../ExternalSignup';
import { TextInput } from '../TextInput';
import { PasswordInput } from '../PasswordInput';
import { useStateValue, setUser, setAlert } from '../../../contexts';
import { PROFILE_PICTURE_DEFAULT_URL } from '../../../constants/constants';
import { auth } from '../../../services/firebase';

export const SignupForm = ({ login }) => {
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useStateValue();

  const router = useRouter();

  const handleSignup = async (values) => {
    try {
      const createdUser = await createUser({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        displayName: `${values.firstName} ${values.lastName}`,
        dateOfBirth: values.dateOfBirth.toString(),
        gender: values.gender,
        profilePictureURL: PROFILE_PICTURE_DEFAULT_URL,
      });
      dispatch(setUser(createdUser));
      dispatch(
        setAlert({
          show: true,
          header: 'Successful',
          message: 'Account created successfully',
          success: true,
        })
      );
      setTimeout(() => {
        dispatch(setAlert({ show: false, header: '', message: '' }));
      }, 5000);
      router.push('/feed');
    } catch (error) {
      if (error.message.includes('email-already-in-use')) {
        dispatch(
          setAlert({
            show: true,
            header: 'Account Creation Error',
            message: 'This email is already being used',
            success: false,
          })
        );
        setTimeout(() => {
          dispatch(setAlert({ show: false, header: '', message: '' }));
        }, 5000);
      }
    }
  };

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider).catch((error) => {
      console.error(error);
      dispatch(
        setAlert({
          show: true,
          header: 'Account Creation Error',
          message: error.message,
          success: false,
        })
      );
      setTimeout(() => {
        dispatch(setAlert({ show: false, header: '', message: '' }));
      }, 5000);
    });
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    gender: '',
    dateOfBirth: null,
  };

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .max(15, 'Must be 15 characters or less')
      .required('Please enter your First Name'),
    lastName: yup
      .string()
      .max(20, 'Must be 20 characters or less')
      .required('Please enter your Last Name'),
    email: yup.string().email('Invalid email address').required('Please enter your Email'),
    password: yup
      .string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    gender: yup.string().required('Please select a gender'),
    dateOfBirth: yup.date().required('Please select a gender'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSignup(values);
      }}
    >
      <Form className="bg-white rounded-lg p-5 min-w-[400px] w-full max-w-xl mx-4 md:mx-auto flex flex-col justify-between gap-5 drop-shadow-xl">
        <div className="signup-with flex justify-between">
          <GoogleExternalSignup login={login} callback={signInWithGoogle} />
          <GithubExternalSignup login={login} />
        </div>
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-300" />
          <span className="flex-shrink mx-4 text-gray-600">OR</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        <TextInput label="First Name" name="firstName" type="text" placeholder="First Name" />
        <TextInput label="Last Name" name="lastName" type="text" placeholder="Last Name" />
        <TextInput label="Email" name="email" type="email" placeholder="Your Email" />
        <PasswordInput
          name="password"
          type="password"
          label="Password"
          placeholder="Your password here"
        />
        <PasswordInput
          name="passwordConfirmation"
          type="password"
          label="Password"
          placeholder="Type again your password here"
        />
        <div className="bottom-form-section flex flex-row justify-between">
          <DatePickerField name="dateOfBirth" />
          <GenderPicker name="gender" />
        </div>
        <Button type="submit">Sign Up</Button>
        <small className="mx-auto">
          Already have an account?
          <button
            className="text-blue-500 hover:text-blue-700 ml-2"
            tabIndex={0}
            onClick={() => router.push('/login')}
            onKeyPress={() => router.push('/login')}
            type="button"
          >
            Sign In
          </button>
        </small>
      </Form>
    </Formik>
  );
};
