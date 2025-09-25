import { Status } from '../Status';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Currency converter</h1>
      <p className={styles.subtitle}>Get real-time exchange rates</p>
      <Status />
    </header>
  );
};
