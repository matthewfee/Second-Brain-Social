import Image from 'next/image';

/* eslint-disable jsx-a11y/anchor-is-valid */
export const GoogleExternalSignup = ({ login, callback }) => (
  <button
    type="button"
    onClick={callback}
    href="#"
    className="bg-gray-200 hover:bg-gray-300 w-[48%] md:px-4 flex gap-3 items-center justify-center rounded-lg shrink-0"
  >
    <Image src="/icons/google.svg" width={20} height={20} />
    <span className="text-[#4E5D78] text-sm my-2 font-semibold md:text-base leading-6">
      {login ? 'Login' : 'Signup'} with Google
    </span>
  </button>
);

export const GithubExternalSignup = ({ login, callback }) => (
  <button
    type="button"
    onClick={callback}
    href="#"
    className="bg-gray-200 hover:bg-gray-300 w-[48%] md:px-4 flex gap-3 items-center justify-center rounded-lg shrink-0"
  >
    <Image src="/icons/github.svg" width={20} height={20} />

    <span className="text-[#4E5D78] text-sm my-2 font-semibold md:text-base leading-6">
      {login ? 'Login' : 'Signup'} with Github
    </span>
  </button>
);
