import React from "react";
import { Badge, Card, Group, Text } from "@mantine/core";

export type Matter = {
  id: number; // 案件ID
  user_id: string; // ユーザーID
  title: string; // 案件名
  created_time: Date; // 案件作成日時
  team: string; // チーム
  classification: string; // 分類
  trello_url: string; // trello URL
  customer?: string; // 取引先
  billing_amount?: number; // 請求額
  started_date: Date; // 案件開始日
  billing_date?: Date; // 請求日
  payment_due_date?: Date; // 振込期限
  comment?: string; // コメント
  deleted_flag: boolean; // 削除フラグ
  checked_flag: boolean; // チェック完了フラグ
  fixed_flag: boolean; // 確定フラグ
};

type MatterListProps = {
  matterList: Matter[];
  uuid: string;
  getMatterList: VoidFunction;
  setOpened: React.Dispatch<boolean>;
};

export const MatterList = (props: MatterListProps) => {
  return (
    <div className="m-10">
      {props.matterList.map((matter) => {
        return (
          <Card
            key={matter.id}
            shadow="sm"
            p="lg"
            className="mb-5 border"
            // onClick={() => setOpened(true)}
          >
            <Card.Section className="flex justify-between">
              <p>{matter.title}</p>
              <Badge
                color="pink"
                variant="light"
                className="my-2 mx-5 text-base"
              >
                {matter.fixed_flag ? "確定" : "未確定"}
              </Badge>
            </Card.Section>

            <Group position="apart">
              <Text
                weight={300}
                className="flex justify-between place-items-stretch"
              >
                <p>チーム：{matter.team}</p>
                <p>分類：{matter.classification}</p>
              </Text>
            </Group>

            <Text size="sm" style={{ color: "black", lineHeight: 1.5 }}>
              {`請求額：${matter.billing_amount}円`}
              <br /> {`振込期限：${matter.payment_due_date}`}
            </Text>
          </Card>
        );
      })}
    </div>
  );
};
