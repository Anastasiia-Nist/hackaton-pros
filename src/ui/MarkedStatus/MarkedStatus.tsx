import { MarkupType } from 'shared/consts/constants';
import './MarkedStatus.scss';

type MarkedStatusProps = {
  state: string;
};

export const MarkedStatus = ({ state }: MarkedStatusProps) => {
  if (!state) {
    return <span className="marked-status">не размечено</span>;
  }

  if (state === MarkupType.YES) {
    return (
      <span className="marked-status marked-status_success">Размечено</span>
    );
  }

  if (state === MarkupType.NO) {
    return (
      <span className="marked-status marked-status_failed">Нет совпадений</span>
    );
  }

  if (state === MarkupType.DEFFERED) {
    return (
      <span className="marked-status marked-status_deffered">отложено</span>
    );
  }

  return null;
};
