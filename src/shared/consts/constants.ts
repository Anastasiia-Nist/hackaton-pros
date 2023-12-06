export const BASE_URL = import.meta.env.VITE_BASE_URL;
// export const BASE_URL = 'http://localhost:3001';

export const TOKEN = import.meta.env.VITE_TOKEN;

export enum MarkupType {
  YES = 'да',
  NO = 'нет',
  DEFFERED = 'отложить',
  ALL = 'все',
}

export const MarkupTypeText = {
  [MarkupType.YES]: 'Размечено',
  [MarkupType.NO]: 'Нет совпадений',
  [MarkupType.DEFFERED]: 'Отложено',
  [MarkupType.ALL]: 'Все',
};
