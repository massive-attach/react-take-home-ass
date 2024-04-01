import { useEffect, useRef } from "react";
import styles from "./Modal.module.scss";

type ModalProps = {
  isOpen?: boolean;
  close: () => void;
  payload?: Record<string, string>;
};

Modal.defaultProps = {
  isOpen: false,
  payload: {},
}

export default function Modal({ isOpen, payload, close}: ModalProps){
  const modal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modal.current?.showModal();
    } else {
      modal.current?.close();
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
          {Object.entries(payload || {})?.map(([key, value]) => (
            <section key={key}>
              <p>{key}</p>
              <h3>{value as string}</h3>
            </section>
          ))}
        </div>
      </form>
    </dialog>
  );
}
