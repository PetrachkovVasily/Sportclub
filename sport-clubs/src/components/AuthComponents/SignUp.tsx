import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  useFetchUserQuery,
  useLoginMutation,
  useRegisterMutation,
} from "../../services/UserService";
import pb from "../../lib/pocketbase";
import { setCredentials } from "../../store/reducers/AuthSlice";
import { useNavigate } from "@tanstack/react-router";

interface Props {}

function SignUp({}) {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.authReducer.token);
  const userId = useSelector((state: RootState) => state.authReducer.userId);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [login, setLogin] = useState("");

  const isLoggedIn = pb.authStore.isValid;
  console.log(isLoggedIn);

  const {
    data: user,
    isLoading: isUserLoading,
    error,
  } = useFetchUserQuery(userId!, {
    skip: !token || !userId,
  });

  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await register({
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
        username: login,
      }).unwrap();

      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);

      navigate({ to: "/clubsList" });

    } catch (err) {
      console.error("Ошибка регистрации:", err.data);
    }
  };

  return (
    <>
      <h1 className="text-[22px] text-[#505050] ">Sign Up</h1>
      <div className="w-full flex flex-col gap-[12px] ">
        <div className="flex flex-col w-full gap-[8px] ">
          <div className="flex gap-[4px] w-full flex-col">
            <h3 className="text-[14px] ml-[4px] text-[#505050] font-semibold ">
              Email:
            </h3>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-[2px] bg-white border-[#505050]/12 px-2 py-1 rounded-[4px]"
            />
          </div>
          <div className="flex gap-[4px] w-full flex-col">
            <h3 className="text-[14px] ml-[4px] text-[#505050] font-semibold ">
              Login:
            </h3>
            <input
              type="text"
              placeholder="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full border-[2px] bg-white border-[#505050]/12 px-2 py-1 rounded-[4px]"
            />
          </div>
          <div className="flex gap-[4px] w-full flex-col">
            <h3 className="text-[14px] ml-[4px] text-[#505050] font-semibold ">
              Password:
            </h3>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-[2px] bg-white border-[#505050]/12 px-2 py-1 rounded-[4px]"
            />
          </div>
          <div className="flex gap-[4px] w-full flex-col">
            <h3 className="text-[14px] ml-[4px] text-[#505050] font-semibold ">
              Password confirm:
            </h3>
            <input
              type="password"
              placeholder="Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full border-[2px] bg-white border-[#505050]/12 px-2 py-1 rounded-[4px]"
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleRegister}
        className="rounded-[8px] w-full h-[30px] text-[16px] font-bold bg-[#F2B749] text-white "
      >
        Sign Up
      </button>
    </>
  );
}

export default SignUp;
