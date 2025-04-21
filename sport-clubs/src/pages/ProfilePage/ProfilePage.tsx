import React from "react";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import Profile from "../../components/Profile/Profile";
import Goals from "../../components/Goals/Goals";
import Achievements from "../../components/Achievements/Achievements";
import CompleteInfo from "../../components/CompleteInfo/CompleteInfo";

interface Props {}

function ProfilePage(props: Props) {

  return (
    <>
      <div className="flex flex-col gap-[16px] w-[100%]">
        <ContentContainer>
          <Profile />
        </ContentContainer>
        <ContentContainer gap={24} pb={16}>
          <Goals />
        </ContentContainer>
      </div>
      <div className="w-[100%]">
        <CompleteInfo />
      </div>
      <div className="max-w-[280px] w-[100%]">
        <ContentContainer gap={22} pb={16}>
          <Achievements />
        </ContentContainer>
      </div>
    </>
  );
}

export default ProfilePage;
