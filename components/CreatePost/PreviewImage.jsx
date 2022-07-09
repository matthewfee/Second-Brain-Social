// import React from 'react';

export const PreviewImage = ({ image, handleDeleteImage }) => (
  <div className="relative inline-block">
    <img className="h-24 w-24 rounded-lg object-cover" src={image} alt={image} />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-1 right-1 h-8 w-8 cursor-pointer text-red-900  bg-red-200 rounded-full p-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
      onClick={() => handleDeleteImage(image)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  </div>
);
