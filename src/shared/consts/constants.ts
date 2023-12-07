export const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNSIsImF1ZCI6WyJmYXN0YXBpLXVzZXJzOmF1dGgiXSwiZXhwIjoxNzAyNTM2Njc3fQ.d6EAa_HtV1SgcnmvGlv89mbUEviS_fDFh3Ll19NHlsg';

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

export const MarkupTypeText = {
  [MarkupType.YES]: 'Размечено',
  [MarkupType.NO]: 'Нет совпадений',
  [MarkupType.DEFFERED]: 'Отложено',
  [MarkupType.ALL]: 'Все',
};
