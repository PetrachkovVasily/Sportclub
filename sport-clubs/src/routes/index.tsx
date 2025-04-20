import { createFileRoute } from "@tanstack/react-router";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import PageWrapper from "../components/PageWrapper/PageWrapper";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageWrapper>
      <ProfilePage />
    </PageWrapper>
  );
}
