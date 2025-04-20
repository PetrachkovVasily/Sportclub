import { createFileRoute } from "@tanstack/react-router";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageWrapper>
      <ProfilePage />
    </PageWrapper>
  );
}
