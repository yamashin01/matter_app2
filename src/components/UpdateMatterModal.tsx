import {
  Button,
  Modal,
  NativeSelect,
  NumberInput,
  Table,
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
const costclassList = [
  "備品購入",
  "システム料",
  "施設利用料",
  "メンバー報酬",
  "外注費",
  "シンラボ活動費",
  "広告宣伝費",
  "教育・研修費",
  "営業費",
  "その他",
];

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
  const [costName1, setCostName1] = useState<string | null>("");
  const [costItem1, setCostItem1] = useState<string | null>("");
  const [costPaymentDate1, setCostPaymentDate1] = useState<Date | null>(
    new Date()
  );
  const [costSupplier1, setCostSupplier1] = useState<string | null>("");
  const [costWithholding1, setCostWithholding1] = useState<boolean | null>(
    false
  );
  const [costCertificate1, setCostCertificate1] = useState<string | null>("");
  const [costAmountOfMoney1, setCostAmountOfMoney1] = useState<
    number | undefined
  >(0);
  const [costRemarks1, setCostRemarks1] = useState<string | null>("");

  const costItemList = [
    "経費項目",
    "品目",
    "支払日",
    "支払い先",
    "源泉",
    "受領書",
    "金額（税別）",
    "備考",
  ];
  const threads = (
    <tr>
      {costItemList.map((threadItem, index) => {
        return <th key={index}>{threadItem}</th>;
      })}
    </tr>
  );

  const closeModal = useCallback(() => {
    props.setIsOpened(false);
  }, []);

  const handleUpdateMatter = useCallback(
    async (uuid: string, isFixed: boolean, isDeleted: boolean) => {
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
            cost_name1: costName1,
            cost_item1: costItem1,
            cost_date_of_payment1: costPaymentDate1,
            cost_supplier1: costSupplier1,
            cost_withholding1: costWithholding1,
            cost_certificate1: costCertificate1,
            cost_amount_of_money1: costAmountOfMoney1,
            cost_remarks1: costRemarks1,
            fixed_flg: isFixed,
            deleted_flg: isDeleted,
          },
        ])
        .match({ id: props.matter.id });
      if (error) {
        alert("案件の更新に失敗しました。");
      } else {
        if (data) {
          if (isDeleted) {
            alert("案件を削除しました。");
          } else if (isFixed) {
            alert("案件を確定しました。");
          } else {
            alert("案件を更新しました。");
          }
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
      costName1,
      costItem1,
      costPaymentDate1,
      costSupplier1,
      costWithholding1,
      costCertificate1,
      costAmountOfMoney1,
      costRemarks1,
      closeModal,
      props,
    ]
  );

  return (
    <>
      <Modal
        opened={props.isOpened}
        onClose={closeModal}
        size="80%"
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
          <h2 className="text-xl mb-4">コスト情報</h2>
          <Table className="mb-4">
            <thead>{threads}</thead>
            <tbody>
              <tr>
                <td>
                  <TextInput
                    defaultValue={props.matter.cost_name1}
                    onChange={(e) => setCostName1(e.currentTarget.value)}
                  />
                </td>
                <td>
                  <NativeSelect
                    defaultValue={props.matter.cost_item1}
                    data={costclassList}
                    onChange={(e) => setCostItem1(e.currentTarget.value)}
                  />
                </td>
                <td>
                  <DatePicker
                    placeholder="2022/1/1"
                    defaultValue={props.matter.cost_date_of_payment1}
                    onChange={setCostPaymentDate1}
                  />
                </td>
                <td>
                  <TextInput
                    defaultValue={props.matter.cost_supplier1}
                    onChange={(e) => setCostSupplier1(e.currentTarget.value)}
                  />
                </td>
                <td>
                  <NativeSelect
                    data={["あり", "なし"]}
                    defaultValue={
                      props.matter.cost_withholding1 ? "あり" : "なし"
                    }
                    onChange={(e) =>
                      setCostWithholding1(
                        e.currentTarget.value == "あり" ? true : false
                      )
                    }
                  />
                </td>
                <td>
                  <NativeSelect
                    data={["請求書", "領収書"]}
                    defaultValue={props.matter.cost_certificate1}
                    onChange={(e) => setCostCertificate1(e.currentTarget.value)}
                  />
                </td>
                <td>
                  <NumberInput
                    defaultValue={props.matter.cost_amount_of_money1}
                    onChange={(val) => setCostAmountOfMoney1(val)}
                    min={0}
                  />
                </td>
                <td>
                  <Textarea
                    defaultValue={props.matter.cost_remarks1}
                    onChange={(e) => setCostRemarks1(e.currentTarget.value)}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="flex justify-between">
            <div className="flex justify-items-center">
              <Button
                className="mr-4"
                onClick={() => handleUpdateMatter(props.uuid, false, false)}
              >
                案件更新
              </Button>
              <Button
                className="mr-4"
                color="red"
                onClick={() => handleUpdateMatter(props.uuid, true, false)}
              >
                案件確定
              </Button>
              <Button className="mr-4" color="green" onClick={closeModal}>
                キャンセル
              </Button>
            </div>
            <Button
              color="gray"
              onClick={() => handleUpdateMatter(props.uuid, false, true)}
            >
              案件削除
            </Button>
          </div>
        </section>
      </Modal>
    </>
  );
};
