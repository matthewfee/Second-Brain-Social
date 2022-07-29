import Image from 'next/image';

export const MyImage = ({ src, alt, classes }) => (
  <Image src={src} alt={alt} layout="fill" objectFit="cover" className={`${classes}`} /> // loader={myLoader}
);
