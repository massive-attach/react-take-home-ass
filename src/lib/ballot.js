import { faker } from "@faker-js/faker";

export function getBallotData() {
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

  categories.forEach((cat) => {
    const length = 3 + Math.floor(Math.random() * 20);

    resData.push({
      catName: cat,
      nominees: Array(length)
        .fill(null)
        .map(() => {
          return {
            word: getWord(cat),
            // email: faker.internet.email(),
            srcSet: faker.image.avatar(),
          };
        }),
    });
  });

  return resData;
}
