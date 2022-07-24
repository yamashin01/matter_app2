import {
  ActionIcon,
  Box,
  Button,
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
import React, { useCallback } from "react";
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

interface basicObjType {
  title: string;
  team: string;
  classification: string;
  trelloUrl: string;
  customer: string;
  billing_amount: number;
  started_date: Date;
  billing_date: Date;
  payment_due_date: Date;
  comment: "";
}

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
  const closeModal = useCallback(() => {
    props.setIsOpened(false);
  }, []);

  const basicForm = useForm<basicObjType>({
    initialValues: {
      title: "",
      team: "",
      classification: "",
      trelloUrl: "",
      customer: "",
      billing_amount: 0,
      started_date: new Date(),
      billing_date: new Date(),
      payment_due_date: new Date(),
      comment: "",
    },
    validate: {
      trelloUrl: (url) =>
        url.indexOf("https://trello") !== 0
          ? "trelloカードのURLを記載ください。"
          : null,
    },
  });

  const costForm = useForm({
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

  const costFieldList = costForm.values.costList.map((cost, index) => (
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
        onClick={() => costForm.removeListItem("costList", index)}
      >
        <Trash size={20} />
      </ActionIcon>
      <TextInput
        label="経費名"
        placeholder="経費を入力してください。"
        className="col-span-3"
        required
        sx={{ flex: 1 }}
        {...costForm.getListInputProps("costList", index, "name")}
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
        {...costForm.getListInputProps("costList", index, "item")}
      />
      <Group className="col-span-2">
        <Text>源泉あり</Text>
        <Switch
          {...costForm.getListInputProps("costList", index, "withholding")}
        />
      </Group>
      <DatePicker
        label="支払日/支払い期日"
        placeholder="日付を選択してください。"
        className="col-span-3"
        {...costForm.getListInputProps("costList", index, "payment_date")}
      />
      <TextInput
        label="支払い先"
        className="col-span-5"
        {...costForm.getListInputProps("costList", index, "supplier")}
      />
      <Select
        label="受領書"
        className="col-span-3"
        data={["請求書", "領収書"]}
        {...costForm.getListInputProps("costList", index, "certificate")}
      />
      <NumberInput
        label="金額（税別）"
        defaultValue={0}
        className="col-span-3"
        min={0}
        {...costForm.getListInputProps("costList", index, "amount_of_money")}
      />
      <Textarea
        label="備考"
        className="col-span-12"
        {...costForm.getListInputProps("costList", index, "remarks")}
      />
    </Group>
  ));

  const handleAddMatter = useCallback(
    async (uuid: string, fixed: boolean) => {
      if (basicForm.values.title == "") {
        alert("案件名を追加してください。");
        return;
      }
      const { data, error } = await client.from("matter").insert([
        {
          user_id: uuid,
          title: basicForm.values.title,
          team: basicForm.values.team,
          classification: basicForm.values.classification,
          trello_url: basicForm.values.trelloUrl,
          customer: basicForm.values.customer,
          billing_amount: basicForm.values.billing_amount,
          started_date: basicForm.values.started_date,
          billing_date: basicForm.values.billing_date,
          payment_due_date: basicForm.values.payment_due_date,
          comment: basicForm.values.comment,
          cost_data1:
            costForm.values.costList[0] !== null
              ? costForm.values.costList[0]
              : null,
          cost_data2:
            costForm.values.costList[1] !== null
              ? costForm.values.costList[1]
              : null,
          cost_data3:
            costForm.values.costList[2] !== null
              ? costForm.values.costList[2]
              : null,
          cost_data4:
            costForm.values.costList[3] !== null
              ? costForm.values.costList[3]
              : null,
          cost_data5:
            costForm.values.costList[4] !== null
              ? costForm.values.costList[4]
              : null,
          cost_data6:
            costForm.values.costList[5] !== null
              ? costForm.values.costList[5]
              : null,
          cost_data7:
            costForm.values.costList[6] !== null
              ? costForm.values.costList[6]
              : null,
          cost_data8:
            costForm.values.costList[7] !== null
              ? costForm.values.costList[7]
              : null,
          cost_data9:
            costForm.values.costList[8] !== null
              ? costForm.values.costList[8]
              : null,
          cost_data10:
            costForm.values.costList[9] !== null
              ? costForm.values.costList[9]
              : null,
          fixed_flg: fixed,
        },
      ]);
      if (error) {
        alert("案件の追加に失敗しました。");
      } else {
        if (data) {
          alert(`新規案件[${basicForm.values.title}]を追加しました。`);
          props.getMatterList();
          costForm.values.costList.length = 0;
          closeModal();
        }
      }
    },
    [basicForm, costForm, closeModal, props]
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
                {...basicForm.getInputProps("title")}
              />
              <NativeSelect
                label="チーム"
                required
                className="mr-2"
                data={teamList}
                {...basicForm.getInputProps("team")}
              />
              <NativeSelect
                label="分類"
                required
                className="mr-2"
                data={classificationList}
                {...basicForm.getInputProps("classification")}
              />
              <TextInput
                label="trelloカードURL"
                placeholder="https://trello.com/XXXX"
                required
                {...basicForm.getInputProps("trelloUrl")}
              />
            </div>
            <div className="flex mb-4 justify-between w-full">
              <TextInput
                label="取引先"
                placeholder="株式会社○○○○"
                className="mr-2 w-1/3"
                {...basicForm.getInputProps("customer")}
              />
              <NumberInput
                label="請求額"
                className="mr-2"
                defaultValue={0}
                {...basicForm.getInputProps("billing_amount")}
              />
              <DatePicker
                label="案件開始日"
                placeholder="2022/1/1"
                className="mr-2"
                {...basicForm.getInputProps("started_date")}
              />
              <DatePicker
                label="請求日"
                placeholder="2022/1/1"
                className="mr-2"
                {...basicForm.getInputProps("billing_date")}
              />
              <DatePicker
                label="振込期限"
                placeholder="2022/1/1"
                {...basicForm.getInputProps("payment_due_date")}
              />
            </div>
            <div className="mb-4 w-full">
              <Textarea
                label="コメント"
                {...basicForm.getInputProps("comment")}
              />
            </div>
          </div>

          <div className="mb-4">
            <Box mx="auto">
              {costFieldList.length > 0 ? (
                <Text color="black" align="left">
                  コスト情報
                </Text>
              ) : (
                <Text color="dimmed" align="center">
                  コストなし
                </Text>
              )}

              {costFieldList}

              <Group position="right" mt="md">
                <Button
                  color="gray"
                  compact
                  onClick={() =>
                    costForm.addListItem("costList", {
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
                basicForm values:
              </Text>
              <Code block>{JSON.stringify(basicForm.values, null, 2)}</Code>
              <Text size="sm" weight={500} mt="md">
                costForm values:
              </Text>
              <Code block>{JSON.stringify(costForm.values, null, 2)}</Code>
            </Box>
          </div>

          <div className="flex">
            <Button
              className="mr-4"
              onClick={() => handleAddMatter(props.uuid, false)}
            >
              確定せずに案件追加
            </Button>
            <Button
              className="mr-4"
              color="red"
              onClick={() => handleAddMatter(props.uuid, true)}
            >
              確定して案件追加
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
