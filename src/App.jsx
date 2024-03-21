import { useState, useCallback } from "react";

import Card from "./components/Card";
import Modal from "./components/Modal";
import { useFetch } from "./hooks/useFetch";
import { slugify } from "./utils";

function App() {
  const [data, setData] = useState([]);
  const [payload, setPayload] = useState({});

  const handleFormChange = useCallback(
    (e, i) => {
      const catName = data[i].catName;
      const nomineeName = e.target.value;
      setPayload((prevPayload) => ({ ...prevPayload, [catName]: nomineeName }));
    },
    [data]
  );

  const [isOpen, setIsOpen] = useState(false);

  function close() {
    setIsOpen(false);
  }

  function handleSubmit(e) {
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

  const submitDisabled = Object.keys(payload).length < data.length;

  return (
    <>
      <h1>Awards 2021</h1>
      {data.map((category, i) => (
        <div key={slugify(category.catName)} className="category">
          <form onChange={(e) => handleFormChange(e, i)}>
            <h2 className="category__title" data-testid="cat-title">
              {category.catName}
            </h2>

            <div className="card-grid">
              {category.nominees.map((nominee) => {
                const isSelected =
                  category.catName in payload &&
                  payload[category.catName] === nominee.name;
                return (
                  <Card
                    {...{ nominee, isSelected }}
                    key={slugify(nominee.name)}
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
