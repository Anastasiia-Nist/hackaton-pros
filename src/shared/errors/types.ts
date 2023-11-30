export type ErrorType =
  | string
  | {
      loc: [string | number];
      msg: string;
      type: string;
    }[];
