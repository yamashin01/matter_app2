export const teamList = [
  { value: "本部", label: "本部" },
  { value: "事業創出", label: "事業創出" },
  { value: "広報", label: "広報" },
  { value: "SDGs", label: "SDGs" },
  { value: "事務局", label: "事務局" },
];

export const classificationList = [
  { value: "会員費", label: "会員費" },
  { value: "受託案件", label: "受託案件" },
  { value: "認定ファシリ", label: "認定ファシリ" },
  { value: "ボードゲーム", label: "ボードゲーム" },
  { value: "イベント", label: "イベント" },
  { value: "その他", label: "その他" },
];

export const costItemList = [
  { value: "備品購入", label: "備品購入" },
  { value: "システム料", label: "システム料" },
  { value: "施設利用料", label: "施設利用料" },
  { value: "メンバー報酬", label: "メンバー報酬" },
  { value: "外注費", label: "外注費" },
  { value: "広告宣伝費", label: "広告宣伝費" },
  { value: "シンラボ活動費", label: "シンラボ活動費" },
  { value: "広告宣伝費", label: "広告宣伝費" },
  { value: "教育・研修費", label: "教育・研修費" },
  { value: "営業費", label: "営業費" },
  { value: "その他", label: "その他" },
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
