import { MyImage } from '../../MyImage';

export const PostProfileImage = ({ imageSRC }) => (
  <div className=" rounded-full overflow-hidden h-[50px] w-[50px] relative cursor-pointer p-0 m-0">
    <MyImage src={imageSRC} width={50} height={50} alt="Profile picture" />
  </div>
);
