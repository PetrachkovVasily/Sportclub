import React from "react";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import Profile from "../../components/Profile/Profile";
import Goals from "../../components/Goals/Goals";
import Achievements from "../../components/Achievements/Achievements";

interface Props {}

function ProfilePage(props: Props) {
  const {} = props;

  return (
    <>
      <div className="flex flex-col gap-[16px] w-[280px] min-w-[280px]">
        <ContentContainer>
          <Profile />
        </ContentContainer>
        <ContentContainer gap={24} pb={16}>
          <Goals />
        </ContentContainer>
      </div>
      <div className="w-[100%]">1</div>
      <div className="min-w-[280px]">
        <ContentContainer gap={22} pb={16}>
          <Achievements />
        </ContentContainer>
      </div>
    </>
  );
}

export default ProfilePage;
