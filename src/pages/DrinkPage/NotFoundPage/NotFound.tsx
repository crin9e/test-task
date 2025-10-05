import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => (
  <div>
    Drink not found!{' '}
    <Link key={'return'} to={`/`}>
      return
    </Link>
  </div>
);
