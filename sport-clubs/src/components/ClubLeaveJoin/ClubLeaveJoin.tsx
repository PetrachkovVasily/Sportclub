import { Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import menuImg from "../../assets/menu-vertical-svgrepo-com 1.svg";
import { useUpdateClubRequestsMutation } from "../../services/UserService";

interface Props {}

function ClubLeaveJoin({
  isMember = false,
  club,
  handleUpdate,
  setMember = null,
}) {
  console.log(club);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { record: user } = JSON.parse(localStorage.getItem("pocketbase_auth"));

  const [updateRec] = useUpdateClubRequestsMutation();

  return (
    <div className="flex items-center gap-[8px] ">
      {isMember ? (
        <>
          <Link to={"/chat/$id"} params={{ id: club.id }}>
            <button className="w-[96px] px-[8px] py-[4px] rounded-[4px] font-bold bg-[#F2B749] text-white text-[14px]">
              Chat
            </button>
          </Link>

          <div
            ref={dropdownRef}
            style={{ position: "relative", display: "inline-block" }}
          >
            <button
              onClick={toggleDropdown}
              className="px-[4px] w-[29px] h-[29px]"
            >
              <img className="w-[29px] h-[29px]" src={menuImg} alt="" />
            </button>
            {isOpen && (
              <div
                className=" flex flex-col gap-[8px] rounded-[4px] shadow-lg border-[2px] border-[#404040]/18 bg-white  absolute p-[6px] z-25"
                style={{
                  top: "100%",
                  left: 0,
                }}
              >
                <button
                  onClick={() => {
                    handleUpdate(club, true);
                    setIsOpen(false);
                    if (setMember) {
                      setMember(false);
                    }
                  }}
                  className="w-[96px] px-[8px] py-[2px] rounded-[4px] font-bold bg-white border-[2px] border-red-700 hover:bg-red-700 text-[12px]"
                >
                  Laeve
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {club.status == "public" ? (
            <button
              onClick={() => {
                handleUpdate(club);

                setIsOpen(false);
                if (setMember) {
                  setMember(true);
                }
              }}
              className="w-[96px] px-[8px] py-[4px] rounded-[4px] font-bold bg-[#F2B749] text-white text-[14px]"
            >
              Join
            </button>
          ) : (
            <button
              onClick={() => {
                updateRec({
                  clubId: club.id,
                  newUserId: user.id,
                  currentUsers: club.request_id,
                  isAdd: true,
                });
                if (club.request_id.find((item) => item == user.id)) {
                  updateRec({
                    clubId: club.id,
                    newUserId: user.id,
                    currentUsers: club.request_id,
                    isAdd: true,
                  });
                }
              }}
              className="w-[104px] px-[8px] py-[4px] rounded-[4px] font-bold bg-[#F2B749] text-white text-[14px]"
            >
              {club.request_id.find((item) => item == user.id)
                ? "Request sent"
                : "Send request"}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default ClubLeaveJoin;
