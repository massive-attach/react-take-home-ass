import { useState, useCallback } from "react";

import Card from "./components/Card";
import Modal from "./components/Modal";
import { useFetch } from "./hooks/useFetch";
import { slugify } from "./utils";

type Data = {
  catName: string;
  nominees: { word: string; srcSet: string }[];
}

type StateShape = {
  resData: Data[];
  sources: {
    [key: string]: string;
  }
}


type Payload = {
  [key: string]: string;
}

function App() {
  const [data, setData] = useState<StateShape>();
  const [payload, setPayload] = useState<Payload>({});

  const handleFormChange = useCallback(
    (e: React.FormEvent<HTMLFormElement>, i: number) => {
      const catName = data?.resData[i].catName ?? 'x';
      const nomineeWord = (e.target as HTMLInputElement).value;
      setPayload((prevPayload) => ({ ...prevPayload, [catName]: nomineeWord }));
    },
    [data]
  );

  const [isOpen, setIsOpen] = useState(false);

  function close() {
    setIsOpen(false);
  }

  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();

    const keys = Object.keys(payload);

    if (keys.length === 0) return;

    // format payload
    const formattedPayload = keys.map((key) => {
      return {
        category: key,
        nominee: payload[key],
      };
    });

    console.log("submit", formattedPayload);
    setIsOpen(true);
  }

  // useFetch here
  useFetch("/ballot", setData);

  const submitDisabled = Object.keys(payload).length < (data?.resData.length || 0);


  return (
    <>
      <h1>Awards 2021</h1>
      {data?.resData.map((category, i) => (
        <div key={slugify(category.catName)} className="category">
          <form onChange={(e) => handleFormChange(e, i)}>
            <h2 className="category__title" data-testid="cat-title">
              {category.catName}
            </h2>

            <div className="card-grid">
              {category.nominees?.map((nominee) => {
                const { word } = nominee;
                const isSelected =
                  category.catName in payload &&
                  payload[category.catName] === word;
                return (
                  <Card
                  key={word}
                  src={data?.sources[word]}
                  {...{ nominee, isSelected }}
                  />
                );
              })}
            </div>
          </form>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="btn submit"
        disabled={submitDisabled}
        title={submitDisabled ? "Please pick a nominee in each category" : ""}
      >
        submit
      </button>

      <Modal {...{ isOpen, close, payload }} />
    </>
  );
}

export default App;
