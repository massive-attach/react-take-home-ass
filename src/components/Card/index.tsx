import cn from "classnames";
import styles from "./Card.module.scss";


type CardProps = {
  nominee: {
    word: string;
  };
  src: string
  isSelected: boolean;
}

export default function Card({ nominee, src, isSelected }: CardProps) {
  const { word} = nominee;

  return (
    <div className={cn(styles.card, { [styles.isSelected]: isSelected })}>
      <h3>{word}</h3>

      <div className={styles.portraitWrap}>
        <img src={src} alt={word} className={styles.portrait} />
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
