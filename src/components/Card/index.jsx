import cn from "classnames";
import PropTypes from "prop-types";

import styles from "./Card.module.scss";

Card.propTypes = {
  nominee: PropTypes.shape({
    name: PropTypes.string,
    srcSet: PropTypes.string,
  }),
  isSelected: PropTypes.bool,
};

type CardProps = {
  nominee: {
    word: string;
    srcSet: string;
  };
  isSelected: boolean;
}

export default function Card({ nominee, isSelected }: CardProps) {
  const { word, srcSet } = nominee;

  return (
    <div className={cn(styles.card, { [styles.isSelected]: isSelected })}>
      <h3>{word}</h3>

      <div className={styles.portraitWrap}>
        <img src={srcSet} alt={word} className={styles.portrait} />
      </div>

      {/* // select button which is actually a radio -- we only want to select one per category */}
      <label className={styles.btn}>
        <span className={styles.radio} />
        <span>Pick</span>

        <input hidden={true} type="radio" name="nominee" value={word} />
      </label>
    </div>
  );
}
