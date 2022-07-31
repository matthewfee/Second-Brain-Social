// import { MyImage } from '../../MyImage';
import { useState } from 'react';
import Image from 'next/image';
import { PostProfileImage } from '../PostProfileImage';

export const PostHeader = ({ headerImageSRC, date, post }) => {
  let dateTime = null;
  // eslint-disable-next-line no-unused-vars
  const [svgSource, setSvgSource] = useState('/icons/threeDots.svg');

  if (date) {
    dateTime = date.toDate().toDateString();
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        {headerImageSRC && <PostProfileImage imageSRC={headerImageSRC} />}
        <div className="text-xl">
          <p className="text-sm">{post?.user.displayName}</p>
          <p className="text-gray-400 text-xs">{dateTime}</p>
        </div>
      </div>
      <div
        className="hover:text-blue-400 cursor-pointer"
        onMouseEnter={() => setSvgSource('/icons/blueThreeDots.svg')}
        onMouseLeave={() => setSvgSource('/icons/threeDots.svg')}
      >
        <Image src={svgSource} width={20} height={20} alt="menu" className=" " />
      </div>
    </div>
  );
};
