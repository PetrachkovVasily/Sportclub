import { createFileRoute } from "@tanstack/react-router";
import useLogOut from "../hooks/useLogOut";
import useLogIn from "../hooks/useLogIn";
import pb from "../lib/pocketbase";
import { useState } from "react";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const logOut = useLogOut();
  const { logIn, isLoading } = useLogIn();

  const isLoggedIn = pb.authStore.isValid;
  console.log(isLoggedIn);

  const [authForm, setAuthForm] = useState({ email: "", password: "" });

  async function handleSubmit() {
    console.log(authForm);

    logIn({ email: authForm.email, password: authForm.password });
  }
  return (
    <div className="fixed inset-0 bg-[#F2F2F2] flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-[8px] w-[400px] max-h-[90vh] overflow-y-auto">
        <div className="w-full flex flex-col gap-[20px] items-center ">
          <h1 className="text-[22px] text-[#505050] ">New achievement</h1>
          <div className="w-full flex flex-col gap-[12px] ">
            <div className="flex flex-col w-full gap-[8px] ">
              <div className="flex gap-[4px] w-full flex-col">
                <h3 className="text-[14px] ml-[4px] text-[#505050] font-semibold ">
                  Login:
                </h3>
                <input
                  type="text"
                  placeholder="Login"
                  value={authForm.email}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, email: e.target.value })
                  }
                  className="w-full border-[2px] bg-white border-[#505050]/12 px-2 py-1 rounded-[4px]"
                />
              </div>
              <div className="flex gap-[4px] w-full flex-col">
                <h3 className="text-[14px] ml-[4px] text-[#505050] font-semibold ">
                  Password:
                </h3>
                <input
                  type="text"
                  placeholder="Password"
                  value={authForm.password}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, password: e.target.value })
                  }
                  className="w-full border-[2px] bg-white border-[#505050]/12 px-2 py-1 rounded-[4px]"
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="rounded-[8px] w-full h-[30px] text-[16px] font-bold bg-[#F2B749] text-white "
          >
            {"Log in"}
          </button>
          <button
            onClick={logOut}
            className="rounded-[8px] w-full h-[30px] text-[16px] font-bold bg-[#F2B749] text-white "
          >
            {"Log out"}
          </button>
          <div className="flex gap-[8px] text-[12px] text-[#505050]">
            <h3>Not a member?</h3>
            <h3 className="font-semibold text-[#F2B749] cursor-pointer underline">
              Sign up
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
