type MarkedStatus = {
  isMarked: boolean;
  routePath: string;
};

import './MarkedStatus.scss';

export const MarkedStatus = ({ isMarked }: MarkedStatus) => {
  if (isMarked) {
    return (
      <span className="marked-status marked-status_marked">размечено</span>
    );
  } else {
    return <span className="marked-status">не размечено</span>;
  }

  return null;
};
