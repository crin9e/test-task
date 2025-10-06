import { Navigation } from '../Navigation/Navigation';
import { cocktailCodes } from '../../constants';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navigation tabs={cocktailCodes} />
      {children}
    </div>
  );
};
