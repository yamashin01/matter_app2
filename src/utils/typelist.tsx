export const teamList = ["本部", "事業創出", "広報", "SDGs", "事務局"];

export const classificationList = [
  "会員費",
  "受託案件",
  "認定ファシリ",
  "ボードゲーム",
  "イベント",
  "その他",
];

export interface basicObjType {
  title: string;
  team: string;
  classification: string;
  trelloUrl: string;
  customer: string;
  billing_amount: number;
  started_date: Date;
  billing_date: Date;
  payment_due_date: Date;
  comment: "";
}

export interface costObjType {
  name: string;
  item: string;
  payment_date: Date;
  supplier: string;
  withholding: boolean;
  certificate: string;
  amount_of_money: number;
  remarks: string;
}
