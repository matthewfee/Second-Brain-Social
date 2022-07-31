// import { langCodes } from '../../constants/constants';

import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HEADER_IMAGE_URL } from '../../constants/constants';
import { auth } from '../../services/firebase';
import { MyImage } from '../MyImage';
import { useStateValue } from '../../contexts';

export const Container = ({ children }) => {
  const [user, setUser] = useState({ email: '' });
  const { state } = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  let isLoggedIn = false;

  if (auth.currentUser !== null) {
    isLoggedIn = true;
  }

  return (
    <div className="relative h-full w-full flex flex-col">
      <div className="header fixed left-0 right-0 flex items-center justify-between p-4 bg-[#fff] z-10">
        <div className="logo text-[#4E5D78] font-bold text-2xl flex">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4 0H15.6C18.3583 0 21.0035 1.12381 22.9539 3.12419C24.9043 5.12458 26 7.83769 26 10.6667C26 13.4956 24.9043 16.2088 22.9539 18.2091C21.0035 20.2095 18.3583 21.3333 15.6 21.3333V26C9.1 23.3333 0 19.3333 0 10.6667C0 7.83769 1.09571 5.12458 3.04609 3.12419C4.99647 1.12381 7.64175 0 10.4 0V0Z"
              fill="#377DFF"
            />
            <path
              d="M19 9C19 10.5913 18.3679 12.1174 17.2426 13.2426C16.1174 14.3679 14.5913 15 13 15C11.4087 15 9.88258 14.3679 8.75736 13.2426C7.63214 12.1174 7 10.5913 7 9L9.4 9C9.4 9.95478 9.77928 10.8705 10.4544 11.5456C11.1295 12.2207 12.0452 12.6 13 12.6C13.9548 12.6 14.8705 12.2207 15.5456 11.5456C16.2207 10.8705 16.6 9.95478 16.6 9H19Z"
              fill="white"
            />
          </svg>

          <Link className="logo-title ml-2.5" href="/">
            <span className="pl-4 cursor-pointer">Second Brain</span>
          </Link>
          {/* 
          <div className="logo-title ml-2.5">Second Brain</div> */}
        </div>
        {isLoggedIn && (
          <div className="login-info-container flex">
            <div className="user-name-container pr-5 text-lg font-medium flex items-center">
              {user?.displayName ? user?.displayName : 'User'}
            </div>
            <div className="pl-5 pr-8 rounded-xl overflow-hidden h-12 w-12 relative cursor-pointer ">
              <MyImage src={HEADER_IMAGE_URL} width={60} height={60} alt="Profile picture" />
            </div>
          </div>
        )}
      </div>
      {state.alert.show ? (
        <div
          className={`fixed top-8 left-1/2 -translate-x-1/2 z-10 ${
            state.alert.success
              ? 'bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md'
              : 'bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md'
          }`}
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className={`fill-current h-6 w-6 ${
                  state.alert.success ? 'text-teal-500 mr-4' : 'text-red-500 mr-4'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">{state.alert.header}</p>
              <p className="text-sm">{state.alert.message}</p>
            </div>
          </div>
        </div>
      ) : null}
      <div className="mt-24">{children}</div>
    </div>
  );
};

export default Container;
