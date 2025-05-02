import { createFileRoute } from "@tanstack/react-router";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import ActionBtn from "../components/ActionBtn/ActionBtn";
import Dropdown from "../components/Dropdown/Dropdown";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
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
                  placeholder="Name"
                  //   value={formInfo.name}
                  //   onChange={(e) => handleChange("country", e.target.value)}
                  className="w-full border-[2px] bg-white border-[#505050]/12 px-2 py-1 rounded-[4px]"
                />
              </div>
              <div className="flex gap-[4px] w-full flex-col">
                <h3 className="text-[14px] ml-[4px] text-[#505050] font-semibold ">
                  Description:
                </h3>
                <input
                  type="text"
                  placeholder="Description"
                  //   value={formInfo.name}
                  //   onChange={(e) => handleChange("", e.target.value)}
                  className="w-full border-[2px] bg-white border-[#505050]/12 px-2 py-1 rounded-[4px]"
                />
              </div>
            </div>
          </div>
          <button className="rounded-[8px] w-full h-[30px] text-[16px] font-bold bg-[#F2B749] text-white ">
            {"Log in"}
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
