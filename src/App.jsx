import { useState } from "react";

import "./App.css";
import Card from "./components/Card";
import Modal from "./components/Modal";
import { useFetch } from "./hooks/useFetch";

function App() {
  function handleFormChange(e, i) {
    const catName = data[i].catName;
    const nomineeName = e.target.value;
    setPayload({ ...payload, ...{ [catName]: nomineeName } });
    // console.log("change", payload);
  }

  const [payload, setPayload] = useState({});
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

  const [data, setData] = useState([]);

  // useFetch here
  useFetch("/ballot", setData);

  return (
    <>
      <h1>Awards 2021</h1>
      {data.map((category, i) => (
        <div key={i} className="category">
          <form onChange={(e) => handleFormChange(e, i)}>
            <h2 className="category__title" data-testid="cat-title">
              {category.catName}
            </h2>
            <div className="card__wrap">
              {category.nominees.map((nominee, i) => {
                const isSelected =
                  category.catName in payload &&
                  payload[category.catName] === nominee.name;
                return <Card {...{ nominee, isSelected }} key={i} />;
              })}
            </div>
          </form>
        </div>
      ))}

      <button onClick={handleSubmit} className="btn submit">
        submit
      </button>

      <Modal {...{ isOpen, close, payload }} />
    </>
  );
}

export default App;
