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

export default function Card({ nominee, isSelected }) {
  const { name, srcSet } = nominee;

  return (
    <div className={cn(styles.card, { [styles.isSelected]: isSelected })}>
      <h3>{name}</h3>

      <div className={styles.portraitWrap}>
        <img src={srcSet} alt={name} className={styles.portrait} />
      </div>

      {/* // select button which is actually a radio -- we only want to select one per category */}
      <label className={styles.btn}>
        <span className={styles.radio} />
        <span>Pick</span>

        <input hidden={true} type="radio" name="nominee" value={name} />
      </label>
    </div>
  );
}
