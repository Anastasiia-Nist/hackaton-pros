type MarkedStatus = {
  isMarked: MarkupType | undefined;
};

import { MarkupType } from 'store/statistics/statisticsSlice';
import './MarkedStatus.scss';

export const MarkedStatus = ({ isMarked }: MarkedStatus) => {
  if (!isMarked) {
    return <span className="marked-status">не размечено</span>;
  }

  if (isMarked === MarkupType.YES) {
    return (
      <span className="marked-status marked-status_success">Размечено</span>
    );
  }

  if (isMarked === MarkupType.NO) {
    return (
      <span className="marked-status marked-status_failed">Нет совпадений</span>
    );
  }

  if (isMarked === MarkupType.DEFFERED) {
    return (
      <span className="marked-status marked-status_deffered">отложено</span>
    );
  }

  return null;
};
