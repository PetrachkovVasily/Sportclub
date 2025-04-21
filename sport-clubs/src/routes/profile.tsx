import { createFileRoute, Outlet } from "@tanstack/react-router";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import Achievements from "../components/Achievements/Achievements";
import CompleteInfo from "../components/CompleteInfo/CompleteInfo";
import ContentContainer from "../components/ContentContainer/ContentContainer";
import Goals from "../components/Goals/Goals";
import Profile from "../components/Profile/Profile";
import SwitchMenu from "../components/SwitchMenu/SwitchMenu";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-[16px] w-[100%]">
        <ContentContainer>
          <Profile />
        </ContentContainer>
        <ContentContainer gap={24} pb={16}>
          <Goals />
        </ContentContainer>
      </div>
      <div className="w-[100%]">
        <div className="w-[40vw] max-w-[576px]">
          <SwitchMenu />
          <Outlet />
        </div>
      </div>
      <div className="max-w-[280px] w-[100%]">
        <ContentContainer gap={22} pb={16}>
          <Achievements />
        </ContentContainer>
      </div>
    </PageWrapper>
  );
}
