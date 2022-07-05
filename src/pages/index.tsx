import { Card } from "@mantine/core";
import { Auth } from "@supabase/ui";
import React, { useCallback, useEffect, useState } from "react";
import { AddMatterModal } from "src/components/AddMatterModal";
import { Matter, MatterList } from "src/components/MatterList";
import { getMatterData } from "src/libs/supabase";

const Home = () => {
  const { user } = Auth.useUser();

  const [matterList, setMatterList] = useState<Matter[]>([]);
  const [opened, setOpened] = useState<boolean>(false);
  const [isOpenedMatterCard, setIsOpenedMatterCard] = useState<boolean>(false);

  const getMatterList = useCallback(async () => {
    const data = await getMatterData();
    setMatterList(data);
  }, [setMatterList]);

  useEffect(() => {
    getMatterList();
  }, [getMatterList]);

  return (
    <div>
      {user && (
        <div>
          <Card
            key={"add"}
            shadow="sm"
            p="lg"
            className="border mb-5"
            onClick={() => setOpened(true)}
          >
            新規案件追加
          </Card>
          <MatterList
            matterList={matterList}
            uuid={user.id}
            setOpened={setIsOpenedMatterCard}
            getMatterList={getMatterList}
          />
          <AddMatterModal
            uuid={user.id}
            opened={opened}
            setOpened={setOpened}
            getMatterList={getMatterList}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
