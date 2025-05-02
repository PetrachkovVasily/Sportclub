import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import ActionBtn from "../ActionBtn/ActionBtn";

interface Props {}

function CreateClubModal(props: Props) {
  const [formInfo, setFormInfo] = useState({
    name: "",
    country: "",
    city: "",
    category: "",
    status: "",
  });

  const handleChange = (field, value) => {
    const updated = { ...formInfo, [field]: value };
    setFormInfo(updated);
  };

  return (
    <div className="w-full flex flex-col items-center gap-[18px] px-[4px] pb-[4px] ">
      <h1 className="text-[18px] text-[#505050] ">New club</h1>
      <div className="w-full flex flex-col gap-[18px] ">
        <div className="flex gap-[4px] w-full flex-col">
          <h3 className="text-[14px] ml-[4px] text-[#505050] font-semibold ">
            Club name:
          </h3>
          <input
            type="text"
            placeholder="Name"
            value={formInfo.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border-[2px] bg-white border-[#505050]/12 px-2 py-1 rounded-[4px]"
          />
        </div>
        <div className="flex flex-col w-full gap-[8px] ">
          <div className="flex gap-[8px] w-full">
            <h3 className="text-[14px] ml-[4px] text-[#505050] font-semibold ">
              Status:
            </h3>
            <div className="border-[2px] w-full max-w-[160px] bg-white border-[#505050]/12 rounded-[4px] text-[14px] ">
              <Dropdown
                options={[
                  { option: "public", name: "public" },
                  { option: "private", name: "private" },
                ]}
                width="100%"
              />
            </div>
          </div>

          <div className="flex gap-[8px] w-full">
            <h3 className="text-[14px] ml-[4px] text-[#505050] font-semibold ">
              Category:
            </h3>
            <div className="border-[2px] w-full max-w-[160px] bg-white border-[#505050]/12 rounded-[4px] text-[14px] ">
              <Dropdown
                options={[
                  { option: "other", name: "other" },
                  { option: "running", name: "running" },
                  { option: "workout", name: "workout" },
                ]}
                width="100%"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-[8px] ">
          <div className="flex gap-[4px] w-full flex-col">
            <h3 className="text-[14px] ml-[4px] text-[#505050] font-semibold ">
              Country:
            </h3>
            <input
              type="text"
              placeholder="Country"
              value={formInfo.name}
              onChange={(e) => handleChange("country", e.target.value)}
              className="w-full border-[2px] bg-white border-[#505050]/12 px-2 py-1 rounded-[4px]"
            />
          </div>
          <div className="flex gap-[4px] w-full flex-col">
            <h3 className="text-[14px] ml-[4px] text-[#505050] font-semibold ">
              City:
            </h3>
            <input
              type="text"
              placeholder="City"
              value={formInfo.name}
              onChange={(e) => handleChange("", e.target.value)}
              className="w-full border-[2px] bg-white border-[#505050]/12 px-2 py-1 rounded-[4px]"
            />
          </div>
        </div>
      </div>
      <ActionBtn>Create</ActionBtn>
    </div>
  );
}

export default CreateClubModal;
