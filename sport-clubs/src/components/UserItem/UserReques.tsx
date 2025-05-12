import React from "react";
import profileImg from "../../assets/profileImg.png";
import {
  useFetchUserQuery,
  useUpdateClubRequestsMutation,
  useUpdateClubUsersMutation,
} from "../../services/UserService";

interface Props {}

function UserReques({ id, club, recUsers }) {
  const user = useFetchUserQuery(id)?.data;

  const [updateClubUsers] = useUpdateClubUsersMutation();
  const [updateRec] = useUpdateClubRequestsMutation();

  const handleUpdate = () => {
    try {
      updateClubUsers({
        clubId: club.id,
        newUserId: id,
        currentUsers: club.user_id,
        isRemove: false,
      });

      updateRec({
        clubId: club.id,
        newUserId: id,
        currentUsers: recUsers,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-[12px] w-[100%] p-[6px] px-[4px] items-center justify-between ">
      {user && (
        <div className="flex gap-[8px] w-[100%] items-center">
          <img
            src={profileImg}
            alt="AchImg"
            className="w-[40px] h-[40px] rounded-[24px]"
          />
          <div className="w-[100%] flex justify-between text-ellipsis">
            <div className="flex flex-col">
              <h2 className="font-bold text-[14px] text-nowrap text-[#F2B749] text-ellipsis ">
                {user.login}
              </h2>
            </div>

            <div className="flex items-center gap-[8px] font-semibold text-[#505050] text-[12px]">
              <button
                onClick={() => {
                  handleUpdate(true);

                  //   deleteAdmins(
                  //     admins.find((item) => item.admin_id == user.id).id
                  //   );
                  //   setIsUser(!isUser);
                }}
                className="w-[96px] px-[8px] py-[4px] rounded-[4px] font-bold bg-[#F2B749] text-white text-[14px]"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserReques;
