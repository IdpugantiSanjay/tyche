export interface IRecord {
  _id: string;
  value: number;
  description: string;

  username: string;
  category: string;
  type: 1 | 2;
  accountId: string;
  createdDate: Date;
}

export type Records = IRecord[];
