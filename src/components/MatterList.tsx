import React, { useCallback, useState } from "react";
import { Badge, Card, Group, Text } from "@mantine/core";
import { UpdateMatterModal } from "./UpdateMatterModal";

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
  deleted_flg: boolean; // 削除フラグ
  checked_flg: boolean; // チェック完了フラグ
  fixed_flg: boolean; // 確定フラグ
};

type MatterListProps = {
  matterList: Matter[];
  uuid: string;
  getMatterList: VoidFunction;
};

export const MatterList = (props: MatterListProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [matterData, setMatterData] = useState<Matter>({
    id: 0,
    user_id: props.uuid,
    title: "",
    team: "",
    classification: "",
    trello_url: "",
    customer: "",
    billing_amount: 0,
    started_date: new Date(),
    billing_date: new Date(),
    payment_due_date: new Date(),
    comment: "",
    created_time: new Date(),
    checked_flg: false,
    deleted_flg: false,
    fixed_flg: false,
  });

  const handleUpdateMatterModal = useCallback(
    (matter: Matter, isOpened: boolean) => {
      setMatterData(matter);
      setIsOpened(isOpened);
    },
    []
  );

  return (
    <div className="m-10">
      {props.matterList.map((matter) => {
        return (
          <Card
            key={matter.id}
            shadow="sm"
            p="lg"
            className="mb-5 border hover:cursor-pointer h-25 rounded"
            onClick={() => handleUpdateMatterModal(matter, true)}
          >
            <Card.Section className="flex justify-between">
              <p>{matter.title}</p>
              <Badge
                color={
                  matter.checked_flg
                    ? "green"
                    : matter.fixed_flg
                    ? "blue"
                    : "pink"
                }
                variant="light"
                className="my-2 mx-5 text-base"
              >
                {matter.checked_flg
                  ? "チェック済"
                  : matter.fixed_flg
                  ? "確定"
                  : "未確定"}
              </Badge>
            </Card.Section>

            <Group position="apart">
              <Text weight={300} className="flex justify-between">
                <p>チーム：{matter.team}</p>
                <p>分類：{matter.classification}</p>
              </Text>
            </Group>

            <Text size="sm" style={{ color: "black", lineHeight: 1.5 }}>
              {`請求額：${matter.billing_amount}円`}
              <br /> {`振込期限：${matter.payment_due_date}`}
            </Text>
          </Card>
        ) : null;
      })}
      <UpdateMatterModal
        uuid={props.uuid}
        getMatterList={props.getMatterList}
        matter={matterData}
        isOpened={isOpened}
        setIsOpened={setIsOpened}
      />
    </div>
  );
};
