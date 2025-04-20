import { ThemeConfig } from "flowbite-react";
import Header from "./components/Header/Header";
import PageWrapper from "./components/PageWrapper/PageWrapper";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    <>
      <ThemeConfig dark={false} />
      <Header />
      <PageWrapper>
        <ProfilePage />
      </PageWrapper>
    </>
  );
}

export default App;
