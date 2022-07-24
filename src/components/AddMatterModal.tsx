import {
  ActionIcon,
  Box,
  Button,
  Code,
  Group,
  Modal,
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
import { addMatterData } from "src/libs/supabase";
import {
  basicObjType,
  classificationList,
  costItemList,
  costObjType,
  teamList,
} from "src/utils/typelist";
import { Trash } from "tabler-icons-react";

type Props = {
  uuid: string;
  getMatterList: VoidFunction;
  isOpened: boolean;
  setIsOpened: React.Dispatch<boolean>;
};

export const AddMatterModal = (props: Props) => {
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

  const closeModal = useCallback(() => {
    costForm.values.costList.length = 0;
    basicForm.values.title = "";
    basicForm.values.team = "";
    basicForm.values.classification = "";
    basicForm.values.customer = "";
    basicForm.values.trelloUrl = "";
    basicForm.values.billing_date = new Date();
    basicForm.values.started_date = new Date();
    basicForm.values.payment_due_date = new Date();
    basicForm.values.comment = "";
    basicForm.values.billing_amount = 0;
    props.setIsOpened(false);
  }, [costForm, basicForm]);

  const costFieldList = costForm.values.costList.map((cost, index) => (
    <Group
      key={index}
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
        data={costItemList}
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
      const data = addMatterData(
        uuid,
        basicForm.values,
        costForm.values.costList,
        fixed
      );
      if (!data) {
        alert("案件の追加に失敗しました。");
      } else {
        alert(`新規案件[${basicForm.values.title}]を追加しました。`);
        props.getMatterList();
        closeModal();
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
          <div className="mb-4 grid grid-cols-12">
            <TextInput
              label="案件名"
              required
              className="mr-2 mb-2 col-span-4"
              style={{ flex: 1 }}
              {...basicForm.getInputProps("title")}
            />
            <Select
              label="チーム"
              required
              className="mr-2 mb-2 col-span-2"
              data={teamList}
              {...basicForm.getInputProps("team")}
            />
            <Select
              label="分類"
              required
              className="mr-2 mb-2 col-span-3"
              data={classificationList}
              {...basicForm.getInputProps("classification")}
            />
            <TextInput
              label="trelloカードURL"
              placeholder="https://trello.com/XXXX"
              className="mb-2 col-span-3"
              required
              {...basicForm.getInputProps("trelloUrl")}
            />
            <TextInput
              label="取引先"
              placeholder="株式会社○○○○"
              className="mr-2 mb-2 col-span-4"
              {...basicForm.getInputProps("customer")}
            />
            <NumberInput
              label="請求額"
              className="mr-2 mb-2 col-span-2"
              defaultValue={0}
              {...basicForm.getInputProps("billing_amount")}
            />
            <DatePicker
              label="案件開始日"
              placeholder="2022/1/1"
              className="mr-2 mb-2 col-span-2"
              {...basicForm.getInputProps("started_date")}
            />
            <DatePicker
              label="請求日"
              placeholder="2022/1/1"
              className="mr-2 mb-2 col-span-2"
              {...basicForm.getInputProps("billing_date")}
            />
            <DatePicker
              label="振込期限"
              placeholder="2022/1/1"
              className="mb-2 col-span-2"
              {...basicForm.getInputProps("payment_due_date")}
            />
            <Textarea
              label="コメント"
              className="mb-2 col-span-12"
              {...basicForm.getInputProps("comment")}
            />
          </div>

          <div className="mb-4">
            <Box mx="auto">
              {costFieldList.length > 0 ? (
                <Text color="black" align="left">
                  コスト情報
                </Text>
              ) : (
                <Text color="dimmed" align="center">
                  コスト情報なし
                </Text>
              )}

              {costFieldList}

              {costFieldList.length < 10 ? (
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
              ) : (
                <div className="text-right text-blue-600">
                  入力できるコスト情報は10個までです。
                </div>
              )}
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
          </div>
        </section>
      </Modal>
    </>
  );
};
