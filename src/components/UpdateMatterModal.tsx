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
  opened: boolean;
  setOpened: React.Dispatch<boolean>;
};

const teamList = ["本部", "事業創出", "広報", "SDGs", "事務局"];
const classificationList = ["会員費", "受託案件", "認定ファシリ"];

export const UpdateMatterModal = (props: PropsUpdateMatter) => {
  console.log(`${UpdateMatterModal} isOpened = ${props.opened}`);
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
    props.setOpened(false);
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
          <Checkbox
            defaultChecked={props.matter.fixed_flg}
            label="確定する"
            onChange={(e) => setFixed(e.currentTarget.checked)}
          />
        </div>
        <section className="m-4">
          <h2 className="text-xl mb-4">基本情報</h2>
          <div className="m-4">
            <div className="mb-4">
              <TextInput
                label="案件名"
                required
                defaultValue={props.matter.title}
                style={{ flex: 1 }}
                onChange={(event) => setTitle(event.currentTarget.value)}
              />
            </div>
            <div className="mb-4 justify-between flex w-auto">
              <NativeSelect
                label="チーム"
                required
                defaultValue={props.matter.team}
                data={teamList}
                onChange={(event) => setTeam(event.currentTarget.value)}
              />
              <NativeSelect
                label="分類"
                required
                defaultValue={props.matter.classification}
                data={classificationList}
                onChange={(event) => {
                  setClassification(event.currentTarget.value);
                }}
              />
              <TextInput
                label="trelloカードURL"
                placeholder="https://trello.com/XXXX"
                required
                defaultValue={props.matter.trello_url}
                onChange={(event) => setTrelloUrl(event.currentTarget.value)}
              />
            </div>
            <div className="flex mb-4 justify-between w-full">
              <TextInput
                label="取引先"
                className="w-full"
                placeholder="株式会社○○○○"
                defaultValue={props.matter.customer}
                onChange={(event) => setCustomer(event.currentTarget.value)}
              />
              <NumberInput
                label="請求額"
                defaultValue={props.matter.billing_amount}
                onChange={(value) =>
                  typeof value == "number"
                    ? setBillingAmount(value)
                    : setBillingAmount(0)
                }
              />
            </div>
            <div className="flex mb-4 justify-between w-auto">
              <DatePicker
                placeholder="2022/1/1"
                label="案件開始日"
                defaultValue={props.matter.started_date}
                onChange={setStartedDate}
              />
              <DatePicker
                placeholder="2022/1/1"
                label="請求日"
                defaultValue={props.matter.billing_date}
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
                onChange={(event) => setComment(event.currentTarget.value)}
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
