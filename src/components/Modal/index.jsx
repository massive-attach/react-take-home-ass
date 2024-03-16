import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.scss";

Modal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  payload: PropTypes.object,
};

export default function Modal({ isOpen = false, payload = {}, close }) {
  const modal = useRef();

  useEffect(() => {
    if (isOpen) {
      modal.current.showModal();
    } else {
      modal.current.close();
    }
  }, [isOpen]);

  return (
    <dialog open className={styles.modal} ref={modal}>
      <form method="dialog">
        <h2>Success</h2>

        <button onClick={close} className={styles.close}>
          &times;
        </button>

        <div className={styles.content}>
          {Object.entries(payload)?.map(([key, value]) => (
            <section key={key}>
              <h3>{key}</h3>
              <p>{value}</p>
            </section>
          ))}
        </div>
      </form>
    </dialog>
  );
}
