// import React from "react";
import { MyImage } from '../../MyImage';

export const PostImage = ({ src }) => (
  // console.log('');

  <div className="rounded-lg h-48 w-full relative overflow-hidden">
    <MyImage src={src} alt="Profile picture" />
  </div>
);
