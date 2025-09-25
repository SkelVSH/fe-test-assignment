import { useOnlineState } from '@/hooks/useOnlineState';
import styles from './Status.module.css';
import clockIcon from '@assets/clock.svg';
import wifiOnIcon from '@assets/wifi-on.svg';
import wifiOffIcon from '@assets/wifi-off.svg';
import refreshIcon from '@assets/refresh.svg';
import { useRates } from '@/providers/RatesContext';
import { formatTimestamp } from '@/utils/formatTimestamp';

export const Status = () => {
  const isOnline = useOnlineState();
  const { forceRefetch, isLoading, lastUpdateTS } = useRates();

  return (
    <div className={styles.container}>
      <span
        className={`${styles.coloredBox} ${isOnline ? styles.green : styles.red}`}>
        <img src={isOnline ? wifiOnIcon : wifiOffIcon} alt="Connection icon" />
        {isOnline ? 'Online' : 'Offline'}
      </span>
      <p className={styles.lastUpdate}>
        <img src={clockIcon} alt="Clock icon" />
        {isOnline ? 'Last updated:' : 'Using cached rates from'}{' '}
        {lastUpdateTS && formatTimestamp(lastUpdateTS)}
      </p>
      <button
        className={`${styles.coloredBox} ${styles.blue}`}
        onClick={forceRefetch}
        disabled={isLoading}>
        <img src={refreshIcon} alt="Refresh button" />
        Refresh rates
      </button>
    </div>
  );
};
