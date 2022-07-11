import { Card } from "@mantine/core";
import { Auth } from "@supabase/ui";
import React, { useCallback, useEffect, useState } from "react";
import { AddMatterModal } from "src/components/AddMatterModal";
import { Matter, MatterList } from "src/components/MatterList";
import { getMatterData } from "src/libs/supabase";

const Home = () => {
  const { user } = Auth.useUser();

  const [matterList, setMatterList] = useState<Matter[]>([]);
  const [isOpened, setIsOpened] = useState<boolean>(false);

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
            className="border mb-5 hover:cursor-pointer"
            onClick={() => setIsOpened(true)}
          >
            新規案件追加
          </Card>
          <MatterList
            matterList={matterList}
            uuid={user.id}
            getMatterList={getMatterList}
          />
          <AddMatterModal
            uuid={user.id}
            isOpened={isOpened}
            setIsOpened={setIsOpened}
            getMatterList={getMatterList}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
