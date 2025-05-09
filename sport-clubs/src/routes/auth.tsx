import { createFileRoute } from "@tanstack/react-router";
import pb from "../lib/pocketbase";
import { useState } from "react";
import LogIn from "../components/AuthComponents/LogIn";
import SignUp from "../components/AuthComponents/SignUp";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isNew, setIsNew] = useState(true);

  const isLoggedIn = pb.authStore.isValid;
  console.log(isLoggedIn);

  // const [authForm, setAuthForm] = useState({ email: "", password: "" });

  // async function handleSubmit() {
  //   console.log(authForm);

  //   logIn({ email: authForm.email, password: authForm.password });
  // }

  ////////////////

  return (
    <div className="fixed inset-0 bg-[#F2F2F2] flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-[8px] w-[400px] max-h-[90vh] overflow-y-auto">
        <div className="w-full flex flex-col gap-[20px] items-center ">
          {isNew ? <LogIn /> : <SignUp />}

          <div className="flex gap-[8px] text-[12px] text-[#505050]">
            {isNew ? (
              <>
                <h3>Not a member?</h3>
                <h3
                  onClick={() => setIsNew(false)}
                  className="font-semibold text-[#F2B749] cursor-pointer underline"
                >
                  Sign up
                </h3>
              </>
            ) : (
              <>
                <h3>Have an account?</h3>
                <h3
                  onClick={() => setIsNew(true)}
                  className="font-semibold text-[#F2B749] cursor-pointer underline"
                >
                  Log in
                </h3>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
