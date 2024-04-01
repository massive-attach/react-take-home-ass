import { faker } from "@faker-js/faker";
import { createApi } from 'unsplash-js';
import 'dotenv/config'
import nodeFetch from 'node-fetch';

const accessKey = process.env.VITE_UNSPLASH_ACCESS_KEY;

const unsplash = createApi({  
  accessKey,
  fetch: nodeFetch
});

async function getPhotoSrc(query = 'abstract') {
  return unsplash.photos.getRandom({ query })
    // actually bad for debugging
    // .catch(err => {
    //   console.log('error occurred: ', err);
    // })
    .then(result => { 
      if (result.errors) {
        // handle error here
        console.log('error occurred: ', result.errors[0]);
      } else {
        // handle success here
        const photo = result.response;
        // console.log(result);

        // those params make a small square image
        const src = photo.urls.raw + '&q=85&fm=webp&ar=1:1&fit=crop&w=200&h=200';

        return src;
      }
    });
}

export async function getBallotData() {
  const categories = ["adjective", "noun", /*"adverb"*/];

  const resData = [];

  function coinFlip() {
    return Math.random() < 0.5;
  }

  function getWord(cat) {
    let catB = cat;

    if (cat === "adjective") {
      catB = coinFlip() ? "adjective" : "noun";        
    }

    return faker.word[catB]()    
  }

  const allWords = []

  categories.forEach((cat) => {
    const length = 2 + Math.floor(Math.random() * 1);

    resData.push({
      catName: cat,
      nominees: Array(length)
        .fill(null)
        .map(() => {
          const word = getWord(cat);
          allWords.push(word);
          return {
            word,
          };
        }),
    });
  });

  const promises = allWords.map(async (word) => ({ [word]: await getPhotoSrc(word) }));

  return Promise.all(promises)
    .then((sources) => {
      const sourcesB = sources.reduce((acc, obj) => {
        return { ...acc, ...obj }
      });
      return {resData, sources: sourcesB};
    })
}

// notice the params: https://images.unsplash.com/photo-1546514355-7fdc90ccbd03?ixlib=rb-4.0.3
// &q=85&fm=webp&ar=1:1&fit=crop&w=200&h=200
