import {
  Button,
  Modal,
  NativeSelect,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import React, { useCallback, useState } from "react";
import { client } from "src/libs/supabase";

type Props = {
  uuid: string;
  getMatterList: VoidFunction;
  isOpened: boolean;
  setIsOpened: React.Dispatch<boolean>;
};

const teamList = ["本部", "事業創出", "広報", "SDGs", "事務局"];
const classificationList = ["会員費", "受託案件", "認定ファシリ"];

export const AddMatterModal = (props: Props) => {
  const [title, setTitle] = useState<string>("");
  const [team, setTeam] = useState<string>("");
  const [classification, setClassification] = useState<string>("");
  const [trelloUrl, setTrelloUrl] = useState<string>("");
  const [customer, setCustomer] = useState<string | undefined>("");
  const [billingAmount, setBillingAmount] = useState<number | null>(0);
  const [startedDate, setStartedDate] = useState<Date | null>(new Date());
  const [billingDate, setBillingDate] = useState<Date | null>(new Date());
  const [paymentDueDate, setPaymentDueDate] = useState<Date | null>(new Date());
  const [comment, setComment] = useState<string | null>("");

  const closeModal = useCallback(() => {
    props.setIsOpened(false);
  }, []);

  const handleAddMatter = useCallback(
    async (uuid: string) => {
      console.log(`handleAddMatter execute uuid = ${uuid}`);
      if (title == "") {
        alert("Input Title.");
        return;
      }
      const { data, error } = await client.from("matter").insert([
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
        },
      ]);
      if (error) {
        alert("案件の追加に失敗しました。");
      } else {
        if (data) {
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
        opened={props.isOpened}
        onClose={closeModal}
        size="70%"
        title="新規案件の追加"
        overflow="inside"
      >
        <section className="m-4">
          <h2 className="text-xl mb-4">基本情報</h2>
          <div className="mb-8">
            <div className="flex mb-4 justify-between">
              <TextInput
                label="案件名"
                required
                className="mr-2"
                style={{ flex: 1 }}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
              <NativeSelect
                label="チーム"
                required
                className="mr-2"
                data={teamList}
                onChange={(e) => setTeam(e.currentTarget.value)}
              />
              <NativeSelect
                label="分類"
                required
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
                value={trelloUrl}
                onChange={(e) => setTrelloUrl(e.currentTarget.value)}
              />
            </div>
            <div className="flex mb-4 justify-between w-full">
              <TextInput
                label="取引先"
                placeholder="株式会社○○○○"
                className="mr-2 w-1/3"
                onChange={(e) => setCustomer(e.currentTarget.value)}
              />
              <NumberInput
                label="請求額"
                className="mr-2"
                defaultValue={1000}
                onChange={(value) =>
                  typeof value == "number"
                    ? setBillingAmount(value)
                    : setBillingAmount(0)
                }
              />
              <DatePicker
                label="案件開始日"
                placeholder="2022/1/1"
                className="mr-2"
                onChange={setStartedDate}
              />
              <DatePicker
                label="請求日"
                placeholder="2022/1/1"
                className="mr-2"
                onChange={setBillingDate}
              />
              <DatePicker
                label="振込期限"
                placeholder="2022/1/1"
                onChange={setPaymentDueDate}
              />
            </div>
            <div className="mb-4 w-full">
              <Textarea
                label="コメント"
                onChange={(e) => setComment(e.currentTarget.value)}
              />
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <Button onClick={() => handleAddMatter(props.uuid)}>
              案件追加
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
