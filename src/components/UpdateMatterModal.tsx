import {
  Button,
  Checkbox,
  Modal,
  NativeSelect,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import React, { useCallback, useState } from "react";
import { client } from "src/libs/supabase";
import { Matter } from "./MatterList";

type PropsUpdateMatter = {
  uuid: string;
  getMatterList: VoidFunction;
  matter: Matter;
  isOpened: boolean;
  setIsOpened: React.Dispatch<boolean>;
};

const teamList = ["本部", "事業創出", "広報", "SDGs", "事務局"];
const classificationList = ["会員費", "受託案件", "認定ファシリ"];

export const UpdateMatterModal = (props: PropsUpdateMatter) => {
  const [title, setTitle] = useState<string>(props.matter.title);
  const [team, setTeam] = useState<string>(props.matter.team);
  const [classification, setClassification] = useState<string>(
    props.matter.classification
  );
  const [trelloUrl, setTrelloUrl] = useState<string>(props.matter.trello_url);
  const [customer, setCustomer] = useState<string | undefined>(
    props.matter.customer
  );
  const [billingAmount, setBillingAmount] = useState<number | undefined>(
    props.matter.billing_amount
  );
  const [startedDate, setStartedDate] = useState<Date | null>(
    props.matter.started_date
  );
  const [billingDate, setBillingDate] = useState<Date | null | undefined>(
    props.matter.billing_date
  );
  const [paymentDueDate, setPaymentDueDate] = useState<Date | null | undefined>(
    props.matter.payment_due_date
  );
  const [comment, setComment] = useState<string | number | undefined>(
    props.matter.comment
  );
  const [fixed, setFixed] = useState<boolean>(props.matter.fixed_flg);

  const closeModal = useCallback(() => {
    props.setIsOpened(false);
  }, []);

  const handleUpdateMatter = useCallback(
    async (uuid: string) => {
      if (title == "") {
        alert("Input Title.");
        return;
      }
      const { data, error } = await client
        .from("matter")
        .update([
          {
            user_id: uuid,
            title: title,
            team: team,
            classification: classification,
            trello_url: trelloUrl,
            customer: customer,
            billing_amount: billingAmount,
            started_date: startedDate,
            billing_date: billingDate,
            payment_due_date: paymentDueDate,
            comment: comment,
            fixed_flg: fixed,
          },
        ])
        .match({ id: props.matter.id });
      if (error) {
        alert("案件の更新に失敗しました。");
      } else {
        if (data) {
          alert("案件を更新しました。");
          props.getMatterList();
          closeModal();
        }
      }
    },
    [
      title,
      team,
      classification,
      trelloUrl,
      customer,
      billingAmount,
      startedDate,
      billingDate,
      paymentDueDate,
      comment,
      closeModal,
      props,
    ]
  );

  return (
    <>
      <Modal
        opened={props.opened}
        onClose={closeModal}
        size="70%"
        title="案件の更新"
        overflow="inside"
      >
        <div className="flex justify-between">
          <h4 className="mb-4">案件ID：{props.matter.id}</h4>
        </div>
        <section className="m-4">
          <h2 className="text-xl mb-4">基本情報</h2>
          <div className="m-4">
            <div className="flex mb-4 justify-between">
              <TextInput
                label="案件名"
                required
                defaultValue={props.matter.title}
                className="mr-2"
                style={{ flex: 1 }}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
              <NativeSelect
                label="チーム"
                required
                defaultValue={props.matter.team}
                className="mr-2"
                data={teamList}
                onChange={(e) => setTeam(e.currentTarget.value)}
              />
              <NativeSelect
                label="分類"
                required
                defaultValue={props.matter.classification}
                className="mr-2"
                data={classificationList}
                onChange={(e) => {
                  setClassification(e.currentTarget.value);
                }}
              />
              <TextInput
                label="trelloカードURL"
                placeholder="https://trello.com/XXXX"
                required
                defaultValue={props.matter.trello_url}
                onChange={(e) => setTrelloUrl(e.currentTarget.value)}
              />
            </div>
            <div className="flex mb-4 justify-between w-full">
              <TextInput
                label="取引先"
                className="mr-2 w-1/3"
                placeholder="株式会社○○○○"
                defaultValue={props.matter.customer}
                onChange={(e) => setCustomer(e.currentTarget.value)}
              />
              <NumberInput
                label="請求額"
                defaultValue={props.matter.billing_amount}
                className="mr-2"
                onChange={(value) =>
                  typeof value == "number"
                    ? setBillingAmount(value)
                    : setBillingAmount(0)
                }
              />
              <DatePicker
                placeholder="2022/1/1"
                label="案件開始日"
                defaultValue={props.matter.started_date}
                className="mr-2"
                onChange={setStartedDate}
              />
              <DatePicker
                placeholder="2022/1/1"
                label="請求日"
                defaultValue={props.matter.billing_date}
                className="mr-2"
                onChange={setBillingDate}
              />
              <DatePicker
                placeholder="2022/1/1"
                label="振込期限"
                defaultValue={props.matter.payment_due_date}
                onChange={setPaymentDueDate}
              />
            </div>
            <div className="mb-4 w-full">
              <Textarea
                label="コメント"
                defaultValue={props.matter.comment}
                onChange={(e) => setComment(e.currentTarget.value)}
              />
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <Button onClick={() => handleUpdateMatter(props.uuid)}>
              案件更新
            </Button>
            <Button color="green" onClick={closeModal}>
              キャンセル
            </Button>
            <div className="w-32 p-2"></div>
            <div className="w-32 p-2"></div>
          </div>
        </section>
      </Modal>
    </>
  );
};
