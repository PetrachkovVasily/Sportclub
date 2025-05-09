import { ThemeConfig } from "flowbite-react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { userSlice } from "./store/reducers/UserSlice";
import { postAPI } from "./services/PostService";
import { setCredentials } from "./store/reducers/AuthSlice";
import { useDispatch } from "react-redux";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  // const { increment } = userSlice.actions;
  // const dispatch = useAppDispatch();
  // const { error, isLoading } = useAppSelector((state) => state.userReducer);

  // console.log(error);

  // function clickHandler() {
  //   dispatch(increment("123"));
  // }
  // const data = postAPI.useFetchAllPostsQuery("");
  // console.log(data);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const dispatch = useAppDispatch();

  if (token && userId) {
    dispatch(setCredentials({ token, userId }));
  }

  return (
    <>
      <ThemeConfig dark={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
