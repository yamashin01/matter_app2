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
  opened: boolean;
  setOpened: React.Dispatch<boolean>;
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
    props.setOpened(false);
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
      {props.opened ? (
        <Modal
          opened={props.opened}
          onClose={closeModal}
          size="70%"
          title="新規案件の追加"
          overflow="inside"
        >
          <section className="m-4">
            <h2 className="text-xl mb-4">基本情報</h2>
            <div className="m-4">
              <div className="mb-4">
                <TextInput
                  label="案件名"
                  required
                  style={{ flex: 1 }}
                  onChange={(event) => setTitle(event.currentTarget.value)}
                />
              </div>
              <div className="mb-4 justify-between flex w-auto">
                <NativeSelect
                  label="チーム"
                  required
                  data={teamList}
                  onChange={(event) => setTeam(event.currentTarget.value)}
                />
                <NativeSelect
                  label="分類"
                  required
                  data={classificationList}
                  onChange={(event) => {
                    setClassification(event.currentTarget.value);
                  }}
                />
                <TextInput
                  label="trelloカードURL"
                  placeholder="https://trello.com/XXXX"
                  required
                  value={trelloUrl}
                  onChange={(event) => setTrelloUrl(event.currentTarget.value)}
                />
              </div>
              <div className="flex mb-4 justify-between w-full">
                <TextInput
                  label="取引先"
                  className="w-full"
                  placeholder="株式会社○○○○"
                  onChange={(event) => setCustomer(event.currentTarget.value)}
                />
                <NumberInput
                  label="請求額"
                  defaultValue={1000}
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
                  onChange={setStartedDate}
                />
                <DatePicker
                  placeholder="2022/1/1"
                  label="請求日"
                  onChange={setBillingDate}
                />
                <DatePicker
                  placeholder="2022/1/1"
                  label="振込期限"
                  onChange={setPaymentDueDate}
                />
              </div>
              <div className="mb-4 w-full">
                <Textarea
                  label="コメント"
                  onChange={(event) => setComment(event.currentTarget.value)}
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
      ) : (
        <div></div>
      )}
    </>
  );
};
