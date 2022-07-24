import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Code,
  Group,
  Modal,
  NativeSelect,
  NumberInput,
  Select,
  Switch,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { formList, useForm } from "@mantine/form";
import React, { useCallback, useState } from "react";
import { client } from "src/libs/supabase";
import { Trash } from "tabler-icons-react";

type Props = {
  uuid: string;
  getMatterList: VoidFunction;
  isOpened: boolean;
  setIsOpened: React.Dispatch<boolean>;
};

const teamList = ["本部", "事業創出", "広報", "SDGs", "事務局"];
const classificationList = [
  "会員費",
  "受託案件",
  "認定ファシリ",
  "ボードゲーム",
  "イベント",
  "その他",
];

interface costObjType {
  name: string;
  item: string;
  payment_date: Date;
  supplier: string;
  withholding: boolean;
  certificate: string;
  amount_of_money: number;
  remarks: string;
}

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
  const [fixed, setFixed] = useState<boolean>(false);

  const closeModal = useCallback(() => {
    props.setIsOpened(false);
  }, []);

  const form = useForm({
    initialValues: {
      costList: formList<costObjType>([
        {
          name: "",
          item: "",
          payment_date: new Date(),
          supplier: "",
          withholding: false,
          certificate: "",
          amount_of_money: 0,
          remarks: "",
        },
      ]),
    },
  });

  const fields = form.values.costList.map((cost, index) => (
    <Group
      key={cost.name}
      mt="xs"
      className="grid grid-cols-12 border bg-slate-100 m-2 p-4"
    >
      <Title className="col-span-11 text-base">コスト{index + 1}</Title>
      <ActionIcon
        color="red"
        className="col-span-1"
        variant="hover"
        onClick={() => form.removeListItem("costList", index)}
      >
        <Trash size={16} />
      </ActionIcon>
      <TextInput
        label="経費名"
        placeholder="経費を入力してください。"
        className="col-span-3"
        required
        sx={{ flex: 1 }}
        {...form.getListInputProps("costList", index, "name")}
      />
      <Select
        label="品目"
        placeholder="品目を選択してください。"
        className="col-span-3"
        required
        data={[
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
        ]}
        {...form.getListInputProps("costList", index, "item")}
      />
      <Group className="col-span-2">
        <Text>源泉あり</Text>
        <Switch {...form.getListInputProps("costList", index, "withholding")} />
      </Group>
      <DatePicker
        label="支払日/支払い期日"
        placeholder="日付を選択してください。"
        className="col-span-3"
        {...form.getListInputProps("costList", index, "payment_date")}
      />
      <TextInput
        label="支払い先"
        className="col-span-5"
        {...form.getListInputProps("costList", index, "supplier")}
      />
      <Select
        label="受領書"
        className="col-span-3"
        data={["請求書", "領収書"]}
        {...form.getListInputProps("costList", index, "certificate")}
      />
      <NumberInput
        label="金額（税別）"
        defaultValue={0}
        className="col-span-3"
        min={0}
        {...form.getListInputProps("costList", index, "amount_of_money")}
      />
      <Textarea
        label="備考"
        className="col-span-12"
        {...form.getListInputProps("costList", index, "remarks")}
      />
    </Group>
  ));

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
          cost_data1:
            form.values.costList[0] !== null ? form.values.costList[0] : null,
          cost_data2:
            form.values.costList[1] !== null ? form.values.costList[1] : null,
          cost_data3:
            form.values.costList[2] !== null ? form.values.costList[2] : null,
          cost_data4:
            form.values.costList[3] !== null ? form.values.costList[3] : null,
          cost_data5:
            form.values.costList[4] !== null ? form.values.costList[4] : null,
          cost_data6:
            form.values.costList[5] !== null ? form.values.costList[5] : null,
          cost_data7:
            form.values.costList[6] !== null ? form.values.costList[6] : null,
          cost_data8:
            form.values.costList[7] !== null ? form.values.costList[7] : null,
          cost_data9:
            form.values.costList[8] !== null ? form.values.costList[8] : null,
          cost_data10:
            form.values.costList[9] !== null ? form.values.costList[9] : null,
          fixed_flg: fixed,
        },
      ]);
      if (error) {
        alert("案件の追加に失敗しました。");
      } else {
        if (data) {
          alert(`新規案件[${title}]を追加しました。`);
          props.getMatterList();
          form.values.costList.length = 0;
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
      form,
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
          <Text color="black" align="left">
            基本情報
          </Text>
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

          <div className="mb-4">
            <Box mx="auto">
              {fields.length > 0 ? (
                <Text color="black" align="left">
                  コスト情報
                </Text>
              ) : (
                <Text color="dimmed" align="center">
                  コストなし
                </Text>
              )}

              {fields}

              <Group position="right" mt="md">
                <Button
                  color="gray"
                  compact
                  onClick={() =>
                    form.addListItem("costList", {
                      name: "",
                      item: "",
                      payment_date: new Date(),
                      supplier: "",
                      withholding: false,
                      certificate: "",
                      amount_of_money: 0,
                      remarks: "",
                    })
                  }
                >
                  コスト情報追加
                </Button>
              </Group>

              <Text size="sm" weight={500} mt="md">
                Form values:
              </Text>
              <Code block>{JSON.stringify(form.values, null, 2)}</Code>
            </Box>
          </div>

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
