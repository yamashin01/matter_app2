import { createClient } from "@supabase/supabase-js";
import { basicObjType, costObjType } from "src/utils/typelist";

// 環境変数のロード
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// 環境変数が設定されていなかったらエラーを投げる
if (!SUPABASE_URL) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}
if (!SUPABASE_KEY) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_KEY");
}

export const client = createClient(SUPABASE_URL, SUPABASE_KEY);

// 案件情報を取得する
export const getMatterData = async () => {
  const { data, error } = await client.from("matter").select("*").order("id");
  if (!error && data) {
    return data;
  }
  return [];
};

// 案件を新規追加する
export const addMatterData = async (
  uuid: string,
  basicForm: basicObjType,
  costFormList: costObjType[],
  fixed: boolean
) => {
  const { data, error } = await client.from("matter").insert([
    {
      user_id: uuid,
      title: basicForm.title,
      team: basicForm.team,
      classification: basicForm.classification,
      trello_url: basicForm.trelloUrl,
      customer: basicForm.customer,
      billing_amount: basicForm.billing_amount,
      started_date: basicForm.started_date,
      billing_date: basicForm.billing_date,
      payment_due_date: basicForm.payment_due_date,
      comment: basicForm.comment,
      cost_data1: costFormList[0] !== null ? costFormList[0] : null,
      cost_data2: costFormList[1] !== null ? costFormList[1] : null,
      cost_data3: costFormList[2] !== null ? costFormList[2] : null,
      cost_data4: costFormList[3] !== null ? costFormList[3] : null,
      cost_data5: costFormList[4] !== null ? costFormList[4] : null,
      cost_data6: costFormList[5] !== null ? costFormList[5] : null,
      cost_data7: costFormList[6] !== null ? costFormList[6] : null,
      cost_data8: costFormList[7] !== null ? costFormList[7] : null,
      cost_data9: costFormList[8] !== null ? costFormList[8] : null,
      cost_data10: costFormList[9] !== null ? costFormList[9] : null,
      fixed_flg: fixed,
    },
  ]);
  if (error) {
    return [];
  } else if (data) {
    return data;
  }
  return [];
};
