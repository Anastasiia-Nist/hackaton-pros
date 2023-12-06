export const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNSIsImF1ZCI6WyJmYXN0YXBpLXVzZXJzOmF1dGgiXSwiZXhwIjoxNzAyNDA5MDAyfQ.4jH5Czxs4V7WaUiB8pOrsUjU_kwe2nNc7_2YC9Bg40U';

export const BASE_URL = 'http://81.31.246.17';

export enum MarkupType {
  YES = 'YES',
  NO = 'NO',
  DEFFERED = 'HOLD',
  ALL = 'ALL',
}

export const MarkupTypeText = {
  [MarkupType.YES]: 'Размечено',
  [MarkupType.NO]: 'Нет совпадений',
  [MarkupType.DEFFERED]: 'Отложено',
  [MarkupType.ALL]: 'Все',
};
