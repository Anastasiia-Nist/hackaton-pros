import {
  MarkupType,
  MarkupTypeText,
  StaticticMarkupType,
} from 'shared/consts/constants';
import './MarkedStatus.scss';

type MarkedStatusProps = {
  state: string;
};

export const MarkedStatus = ({ state }: MarkedStatusProps) => {
  if (!state) {
    return <span className="marked-status">Не размечено</span>;
  }

  if (state === MarkupType.YES || state === StaticticMarkupType.YES) {
    return (
      <span className="marked-status marked-status_success">
        {MarkupTypeText[MarkupType.YES]}
      </span>
    );
  }

  if (state === MarkupType.NO || state === StaticticMarkupType.NO) {
    return (
      <span className="marked-status marked-status_failed">
        {MarkupTypeText[MarkupType.NO]}
      </span>
    );
  }

  if (state === MarkupType.DEFFERED || state === StaticticMarkupType.DEFFERED) {
    return (
      <span className="marked-status marked-status_deffered">
        {MarkupTypeText[MarkupType.DEFFERED]}
      </span>
    );
  }

  return null;
};
