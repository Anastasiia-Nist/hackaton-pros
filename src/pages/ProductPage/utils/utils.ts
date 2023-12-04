import { MarkupType } from 'store/statistics/statisticsSlice';

export const isMarkable = (markedType: MarkupType | undefined) => {
  switch (markedType) {
    case MarkupType.YES:
    case MarkupType.DEFFERED:
    case MarkupType.NO:
      return false;
    default:
      return true;
  }
};
