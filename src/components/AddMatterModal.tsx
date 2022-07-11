import {
  Button,
  Checkbox,
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

type Props = {
  uuid: string;
  getMatterList: VoidFunction;
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
  const [fixed, setFixed] = useState<boolean>(false);

  const closeModal = useCallback(() => {
    props.setIsOpened(false);
  }, []);

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

  const handleAddMatter = useCallback(
    async (uuid: string) => {
      if (title == "") {
        alert("案件名を追加してください。");
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
          cost_name1: costName1,
          cost_item1: costItem1,
          cost_date_of_payment1: costPaymentDate1,
          cost_supplier1: costSupplier1,
          cost_withholding1: costWithholding1,
          cost_certificate1: costCertificate1,
          cost_amount_of_money1: costAmountOfMoney1,
          cost_remarks1: costRemarks1,
          fixed_flg: fixed,
        },
      ]);
      if (error) {
        alert("案件の追加に失敗しました。");
      } else {
        if (data) {
          alert(`新規案件[${title}]を追加しました。`);
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
        title="新規案件の追加"
        overflow="inside"
      >
        <Checkbox
          className="flex justify-end"
          defaultChecked={false}
          label="確定する"
          onChange={(e) => setFixed(e.currentTarget.checked)}
        />
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
          <h2 className="text-xl mb-4">コスト情報</h2>
          <Table className="mb-4">
            <thead>{threads}</thead>
            <tbody>
              <tr>
                <td>
                  <TextInput
                    onChange={(e) => setCostName1(e.currentTarget.value)}
                  />
                </td>
                <td>
                  <NativeSelect
                    data={costclassList}
                    onChange={(e) => setCostItem1(e.currentTarget.value)}
                  />
                </td>
                <td>
                  <DatePicker
                    placeholder="2022/1/1"
                    onChange={setCostPaymentDate1}
                  />
                </td>
                <td>
                  <TextInput
                    onChange={(e) => setCostSupplier1(e.currentTarget.value)}
                  />
                </td>
                <td>
                  <NativeSelect
                    data={["あり", "なし"]}
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
                    onChange={(e) => setCostCertificate1(e.currentTarget.value)}
                  />
                </td>
                <td>
                  <NumberInput
                    defaultValue={0}
                    onChange={(val) => setCostAmountOfMoney1(val)}
                    min={0}
                  />
                </td>
                <td>
                  <Textarea
                    onChange={(e) => setCostRemarks1(e.currentTarget.value)}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="flex">
            <Button
              className="mr-4"
              onClick={() => handleAddMatter(props.uuid)}
            >
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
