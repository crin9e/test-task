import { Link, useLocation } from 'react-router-dom';

interface NavTabsProps {
  tabs: string[];
}

export const Navigation = ({ tabs }: NavTabsProps) => {
  const location = useLocation();
  const currentTab = location.pathname.split('/')[1] || tabs[0];

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {tabs.map(tab => (
          <Link
            key={tab}
            to={`/${tab}`}
            style={{
              padding: '0.5rem 1rem',
              textDecoration: 'none',
              color: currentTab === tab ? '#007bff' : '#333',
              borderBottom: currentTab === tab ? '2px solid #007bff' : 'none',
              fontWeight: currentTab === tab ? 'bold' : 'normal',
            }}
          >
            {tab.toUpperCase()}
          </Link>
        ))}
      </div>
    </nav>
  );
};
