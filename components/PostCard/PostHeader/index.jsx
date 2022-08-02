// import { MyImage } from '../../MyImage';
import { useState } from 'react';
import Image from 'next/image';
import { PostProfileImage } from '../PostProfileImage';

export const PostHeader = ({
  headerImageSRC,
  date,
  post,
  setdisplayPostSubMenu,
  displayPostSubMenu,
  userID,
  postID,
}) => {
  let dateTime = null;
  // eslint-disable-next-line no-unused-vars
  const [svgSource, setSvgSource] = useState('/icons/threeDots.svg');

  if (date) {
    dateTime = date.toDate().toDateString();
  }

  const handleDisplaySubMenu = () => {
    const newSubMenuState = displayPostSubMenu.map((postSubMenu) => {
      if (postSubMenu.id === post.postId) {
        return { ...postSubMenu, show: !postSubMenu.show };
      }
      return { ...postSubMenu, show: false };
    });
    setdisplayPostSubMenu(newSubMenuState);
  };

  const userIsPostAuthor = userID === postID;

  console.log('USER ID', userID, 'POST', post);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        {headerImageSRC && <PostProfileImage imageSRC={headerImageSRC} />}
        <div className="text-xl">
          <p className="text-sm">{post?.user.displayName}</p>
          <p className="text-gray-400 text-xs">{dateTime}</p>
        </div>
      </div>
      {userIsPostAuthor && (
        <div
          className="hover:text-blue-400 cursor-pointer"
          onMouseEnter={() => setSvgSource('/icons/blueThreeDots.svg')}
          onMouseLeave={() => setSvgSource('/icons/threeDots.svg')}
        >
          <Image
            src={svgSource}
            width={20}
            height={20}
            alt="menu"
            className=" "
            onClick={handleDisplaySubMenu}
          />
        </div>
      )}
    </div>
  );
};
