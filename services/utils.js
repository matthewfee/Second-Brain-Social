import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

export const saveImages = async (images) => {
  try {
    if (Array.isArray(images)) {
      const imagesPath = await Promise.all(
        images.map(async (image) => {
          const imageRef = ref(storage, `images/${image.name + new Date().toISOString()}`);
          await uploadBytes(imageRef, image.image);
          const imagesDownloadPath = await getDownloadURL(imageRef);
          console.log('imagesDownloadPath array in services/utils: ', imagesDownloadPath);
          return imagesDownloadPath;
        })
      );
      return imagesPath;
    }
    const imageRef = ref(storage, `images/${images.name + new Date().toISOString()}`);
    await uploadBytes(imageRef, images.image);
    const imageDownloadPath = await getDownloadURL(imageRef);
    console.log('imageDownloadPath in services/utils: ', imageDownloadPath);
    return imageDownloadPath;
  } catch (error) {
    throw new Error(error);
  }
};
