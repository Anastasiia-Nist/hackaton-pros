import { MarkupType, MarkupTypeText } from 'shared/consts/constants';

export type MarkedValues = {
  label: string;
  value: MarkupType;
};

export const markedValues = [
  {
    label: MarkupTypeText[MarkupType.ALL],
    value: MarkupType.ALL,
  },
  {
    label: MarkupTypeText[MarkupType.YES],
    value: MarkupType.YES,
  },
  {
    label: MarkupTypeText[MarkupType.NO],
    value: MarkupType.NO,
  },
  {
    label: MarkupTypeText[MarkupType.DEFFERED],
    value: MarkupType.DEFFERED,
  },
];
