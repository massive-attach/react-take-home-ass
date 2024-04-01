import { createApi } from 'unsplash-js';
import { Random } from 'unsplash-js/dist/methods/photos/types';


const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const unsplash = createApi({  
  accessKey,
});

// transformations performed on the API backend
const config = {
  q: 85,       // quality
  fm: 'webp',  // format
  ar: '1:1',   // aspect ratio
  fit: 'crop', // fit
  w: 200,      // width
  h: 200,      // height
}

function getConfigStr() {
  return Object.entries(config).reduce((acc, [key, value]) => {
    return acc + `&${key}=${value}`;
  }, '');
}

export async function getPhotoSrc(query = 'abstract') {
  return unsplash.photos.getRandom({ query }).then(result => {
      if (result.errors) {
        // handle error here
        console.log('error occurred: ', result.errors[0]);
      } else {
        const isArray = Array.isArray(result.response);
        
        // if the response is an array, we take the first element
        const photo = [result.response].flat()[0];        

        // those params make a small square image
        const src = photo.urls.raw + getConfigStr();

        return src;
      }
    });
}
