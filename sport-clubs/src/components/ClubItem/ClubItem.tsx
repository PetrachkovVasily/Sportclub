import React, { useEffect, useRef, useState } from "react";
import profileImg from "../../assets/profileImg.png";
import menuImg from "../../assets/menu-vertical-svgrepo-com 1.svg";
import { Link } from "@tanstack/react-router";
import { useUpdateClubUsersMutation } from "../../services/UserService";

interface Props {}

function ClubItem({ isMember = false, club, handleUpdate }) {
  const [member, setMember] = useState(isMember);

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

  return (
    <div className="flex gap-[12px] w-[100%] p-[8px] items-center justify-between ">
      <div className="flex gap-[12px] w-[100%] items-center">
        <Link to="/club/$id/rating" params={{ id: club.id }}>
          <img
            src={profileImg}
            alt="AchImg"
            className="w-[48px] h-[48px] rounded-[24px]"
          />
        </Link>
        <div className="w-[100%] flex flex-col max-w-[186px] text-ellipsis overflow-hidden">
          <div className="flex items-center gap-[8px]">
            <Link to="/club/$id/rating" params={{ id: club.id }}>
              <h2 className="font-semibold text-[18px] text-nowrap text-ellipsis overflow-hidden">
                {club.name}
              </h2>
            </Link>
            <h3 className="text-[14px]  text-[#505050] text-nowrap text-ellipsis overflow-hidden">
              {club.status}
            </h3>
          </div>
          {/* <h3 className="text-[12px]  text-[#505050] text-nowrap text-ellipsis overflow-hidden">
                  {"42 members"}
                </h3> */}
          <h3 className="text-[14px]  text-[#505050] text-nowrap text-ellipsis overflow-hidden">
            {club.category}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-[8px] ">
        {member ? (
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
            <button
              onClick={() => {
                handleUpdate(club);
              }}
              className="w-[96px] px-[8px] py-[4px] rounded-[4px] font-bold bg-[#F2B749] text-white text-[14px]"
            >
              Join
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ClubItem;
