import { faker } from "@faker-js/faker";

export function getBallotData() {
  const categories = ["A category number one", "Some other category"];

  const resData = [];

  categories.forEach((cat) => {
    const length = 3 + Math.floor(Math.random() * 20);

    resData.push({
      catName: cat,
      nominees: Array(length)
        .fill(null)
        .map(() => {
          return {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            srcSet: faker.image.avatar(),
          };
        }),
    });
  });

  return resData;
}
