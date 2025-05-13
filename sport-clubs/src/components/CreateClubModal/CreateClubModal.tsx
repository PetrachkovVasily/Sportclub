import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import ActionBtn from "../ActionBtn/ActionBtn";
import { clubCategories } from "../../constants/clubConst";
import {
  useAddClubMutation,
  useLazyGetThisUserClubsQuery,
  userAPI,
} from "../../services/UserService";
import pb from "../../lib/pocketbase";
import { useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";

interface Props {}

function CreateClubModal({ closeModal, userId }) {
  const [formInfo, setFormInfo] = useState({
    name: "",
    country: "",
    city: "",
    category: clubCategories[0],
    status: "public",
    user_id: userId,
  });

  // const dispatch = useDispatch();

  // const invalidateClubsCache = () => {
  //   dispatch(userAPI.util.invalidateTags(["Club"]));
  // };

  const [clubsTrigger, { data: clubsData }] = useLazyGetThisUserClubsQuery();

  const handleChange = (field, value) => {
    const updated = { ...formInfo, [field]: value };

    setFormInfo(updated);
  };

  const createClubWithAdmin = async (clubData, adminData) => {
    try {
      // Шаг 1: Создаём клуб
      const createdClub = await pb.collection("club").create(clubData);

      // Шаг 2: Создаём admin с ссылкой на созданный клуб
      const createdAdmin = await pb.collection("admin").create({
        ...adminData,
        club_id: createdClub.id, // Привязываем admin к клубу
      });
      navigate({ to: "/clubsList" });
      closeModal();
      // invalidateClubsCache();

      window.location.reload();
      return { createdClub, createdAdmin };
    } catch (error) {
      console.error("Ошибка при создании клуба и админа:", error);
      throw error;
    }
  };

  const handleAddClub = () => {
    createClubWithAdmin(formInfo, { admin_id: userId });
  };

  const navigate = useNavigate();

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
                onChange={(e) => {
                  handleChange("status", e);
                }}
                value={formInfo.status}
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
                options={clubCategories.map((item) => {
                  return { option: item, name: item };
                })}
                onChange={(e) => {
                  handleChange("category", e);
                }}
                value={formInfo.category}
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
              value={formInfo.country}
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
              value={formInfo.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className="w-full border-[2px] bg-white border-[#505050]/12 px-2 py-1 rounded-[4px]"
            />
          </div>
        </div>
      </div>
      <ActionBtn onClick={handleAddClub}>Create</ActionBtn>
    </div>
  );
}

export default CreateClubModal;
