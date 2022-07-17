import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';
import {
  earthSVG,
  feedSVG,
  communitySVG,
  messageSVG,
  notificationSVG,
  userSVG,
  settingsSVG,
  logoutSVG,
} from './SVGs';

export const Sidebar = () => {
  const router = useRouter();

  const firebaseLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const navs = [
    { name: 'Feed', path: '/', comp: feedSVG, notification: 0 },
    {
      name: 'My Community',
      path: '/community',
      comp: communitySVG,
      notification: 0,
    },
    { name: 'Messages', path: '/messages', comp: messageSVG, notification: 0 },
    {
      name: 'Notification',
      path: '/notification',
      comp: notificationSVG,
      notification: 2,
    },
    { name: 'Explore', path: '/explore', comp: earthSVG, notification: 0 },
    { name: 'Profile', path: '/profile', comp: userSVG, notification: 0 },
    { name: 'Settings', path: '/settings', comp: settingsSVG, notification: 0 },
    { name: 'Logout', path: '/logout', comp: logoutSVG, notification: 0, callback: firebaseLogout },
  ];

  const baseClassName =
    'flex gap-3 items-center p-4 m-2 rounded-lg hover:bg-[#4E5D78] hover:text-white cursor-pointer';

  const navsList = (
    <ul>
      {navs.map((nav) => {
        const className =
          router.asPath === nav.path
            ? `${baseClassName} bg-[#4E5D78] text-white`
            : `${baseClassName}`;

        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <li key={nav.path} className={className} onClick={nav?.callback}>
            {nav.comp}
            <Link href={nav.path}>{nav.name}</Link>
            {nav.notification ? (
              <div className="flex items-center justify-center bg-red-500 rounded-full text-white h-5 w-5">
                2
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
  return <aside className="">{navsList}</aside>;
};
