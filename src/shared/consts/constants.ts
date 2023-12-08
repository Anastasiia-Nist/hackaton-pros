export const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNSIsImF1ZCI6WyJmYXN0YXBpLXVzZXJzOmF1dGgiXSwiZXhwIjoxNzAyNjIzMzUzfQ.7KGVMB4J8q5ZXY4fdImoB5JKuM76P97hH_VIvrAGMhk';

export const BASE_URL = 'http://81.31.246.17';

export enum MarkupType {
  YES = 'YES',
  NO = 'NO',
  DEFFERED = 'HOLD',
  ALL = 'ALL',
}

export enum StaticticMarkupType {
  YES = 'да',
  NO = 'нет',
  DEFFERED = 'отложить',
}

export const StatisticToProductState = {
  [StaticticMarkupType.YES]: MarkupType.YES,
  [StaticticMarkupType.NO]: MarkupType.NO,
  [StaticticMarkupType.DEFFERED]: MarkupType.DEFFERED,
};

export const MarkupTypeText = {
  [MarkupType.YES]: 'Размечено',
  [MarkupType.NO]: 'Нет совпадений',
  [MarkupType.DEFFERED]: 'Отложено',
  [MarkupType.ALL]: 'Все',
};
