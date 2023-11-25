import { Link } from 'react-router-dom';

type MarkedStatus = {
  isMarked: boolean;
  routePath: string;
};

export const MarkedStatus = ({ isMarked, routePath }: MarkedStatus) => {
  if (isMarked) {
    return (
      <span className="marked-status marked-status_marked">Размечено</span>
    );
  }

  return (
    <Link className="marked-status marked-status_type_link" to={routePath}>
      Разметить
    </Link>
  );
};
