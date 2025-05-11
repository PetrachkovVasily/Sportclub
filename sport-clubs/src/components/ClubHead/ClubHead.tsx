import React, { useEffect, useState } from "react";
import backgroundImg from "../../assets/back.png";
import ActionBtn from "../ActionBtn/ActionBtn";
import ClubLeaveJoin from "../ClubLeaveJoin/ClubLeaveJoin";
import { useUpdateClubUsersMutation } from "../../services/UserService";

interface Props {}

function ClubHead({ club, isUser }) {
  const { record: user } = JSON.parse(localStorage.getItem("pocketbase_auth"));

  const [updateClubUsers] = useUpdateClubUsersMutation();
  const [member, setMember] = useState(findUser());

  const handleUpdate = (club, isRemove = false) => {
    try {
      updateClubUsers({
        clubId: club.id,
        newUserId: user.id,
        currentUsers: club.user_id,
        isRemove: isRemove,
      });
    } catch (error) {
      console.log(error);
    }
  };

  function findUser() {
    return user.id == club?.user_id?.find((item) => item == user.id);
  }

  useEffect(() => {
    setMember(findUser());
  }, [club, user.id == club?.user_id?.find((item) => item == user.id)]);

  return (
    <section className="flex flex-col rounded-[8px] bg-white w-[100%] max-w-[880px]">
      <img
        className="w-[100%] h-[200px] "
        src={backgroundImg}
        alt="backgroundImg"
      />
      <div className="flex justify-between px-[16px] py-[12px] pt-[14px]">
        <div>
          <h1 className="text-[24px] font-semibold ">{club?.name}</h1>
          <h3 className="text-[16px] text-[#505050] ">{club?.status}</h3>
        </div>

        {club && (
          <ClubLeaveJoin
            isMember={member}
            club={club}
            handleUpdate={handleUpdate}
            setMember={setMember}
          />
        )}
      </div>
    </section>
  );
}

export default ClubHead;
