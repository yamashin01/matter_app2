export const teamList = ["本部", "事業創出", "広報", "SDGs", "事務局"];

export const classificationList = [
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
