import { ThemeConfig } from "flowbite-react";
import Header from "./components/Header/Header";
import PageWrapper from "./components/PageWrapper/PageWrapper";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <>
      <ThemeConfig dark={false} />
      <RouterProvider router={router}/>
      
    </>
  );
}

export default App;
