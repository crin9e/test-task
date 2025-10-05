import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.scss';

interface NavTabsProps {
  tabs: string[];
}

export const Navigation = ({ tabs }: NavTabsProps) => {
  const location = useLocation();
  const currentTab = location.pathname.split('/')[1] || tabs[0];

  return (
    <nav className={styles.nav}>
      <div className={styles.tabsContainer}>
        {tabs.map(tab => (
          <Link
            key={tab}
            to={`/${tab}`}
            className={`${styles.tab} ${currentTab === tab ? styles.active : ''}`}
          >
            {tab}
          </Link>
        ))}
      </div>
    </nav>
  );
};
