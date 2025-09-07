import SearchBox from '../SearchBox/SearchBox';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.content}>
          <h1>Discover the beauty of nature, one flower at a time.</h1>
          <SearchBox />
        </div>
      </div>
    </section>
  );
}
