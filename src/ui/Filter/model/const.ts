import { MarkedType } from 'store/filters/filtersSlice';

export type MarkedValues = {
  label: string;
  value: MarkedType;
};

export const markedValues = [
  {
    label: 'Все',
    value: 'all',
  },
  {
    label: 'Отмеченные',
    value: 'marked',
  },
  {
    label: 'Не отмеченные',
    value: 'unmarked',
  },
];
