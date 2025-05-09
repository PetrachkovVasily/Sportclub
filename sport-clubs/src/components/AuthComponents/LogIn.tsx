import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  useFetchUserQuery,
  useLoginMutation,
} from "../../services/UserService";
import pb from "../../lib/pocketbase";
import { logout, setCredentials } from "../../store/reducers/AuthSlice";

interface Props {}

function LogIn({}) {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.authReducer.token);
  const userId = useSelector((state: RootState) => state.authReducer.userId);

  const [email, setEmail] = useState("vasyapt@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  const isLoggedIn = pb.authStore.isValid;
  console.log(isLoggedIn);

  const {
    data: user,
    isLoading: isUserLoading,
    error,
  } = useFetchUserQuery(userId!, {
    skip: !token || !userId,
  });

  const handleLogin = async () => {
    try {
      ///prev login
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
      ///prev login

      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ token: res.token, userId: res.record.id }));

      // localStorage.setItem("token", res.token);
      // localStorage.setItem("userId", res.record.id);

      console.log(12345);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <h1 className="text-[22px] text-[#505050] ">Log In</h1>
      <div className="w-full flex flex-col gap-[12px] ">
        <div className="flex flex-col w-full gap-[8px] ">
          <div className="flex gap-[4px] w-full flex-col">
            <h3 className="text-[14px] ml-[4px] text-[#505050] font-semibold ">
              Login:
            </h3>
            <input
              type="text"
              placeholder="Login"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-[2px] bg-white border-[#505050]/12 px-2 py-1 rounded-[4px]"
            />
          </div>
          <div className="flex gap-[4px] w-full flex-col">
            <h3 className="text-[14px] ml-[4px] text-[#505050] font-semibold ">
              Password:
            </h3>
            <input
              type="rassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-[2px] bg-white border-[#505050]/12 px-2 py-1 rounded-[4px]"
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleLogin}
        className="rounded-[8px] w-full h-[30px] text-[16px] font-bold bg-[#F2B749] text-white "
      >
        {"Log in"}
      </button>
      <button
        onClick={handleLogout}
        className="rounded-[8px] w-full h-[30px] text-[16px] font-bold bg-[#F2B749] text-white "
      >
        {"Log out"}
      </button>
    </>
  );
}

export default LogIn;
