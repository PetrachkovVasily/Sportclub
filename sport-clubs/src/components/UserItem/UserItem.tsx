import React, { useEffect, useRef, useState } from "react";
import profileImg from "../../assets/profileImg.png";
import menuImg from "../../assets/menu-vertical-svgrepo-com 1.svg";
import {
  useAddAdminMutation,
  useDeleteAdminMutation,
  useFetchUserQuery,
  useGetSingleClubQuery,
  useUpdateClubUsersMutation,
} from "../../services/UserService";

interface Props {}

function UserItem({ requesting = false, id, admins, club, isNotAdmin }) {
  const user = useFetchUserQuery(id)?.data;

  const { record: myUser } = JSON.parse(
    localStorage.getItem("pocketbase_auth")
  );

  const [isUser, setIsUser] = useState(
    user ? !!admins.find((item) => item.admin_id == user.id) : true
  );

  useEffect(() => {
    if (user) {
      setIsUser(!!admins.find((item) => item.admin_id == user.id));
    }
  }, [user]);

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

  //Kick out

  const [updateClubUsers] = useUpdateClubUsersMutation();

  const handleUpdate = (isRemove = true) => {
    try {
      updateClubUsers({
        clubId: club.id,
        newUserId: id,
        currentUsers: club.user_id,
        isRemove: isRemove,
      });
    } catch (error) {
      console.log(error);
    }
  };
  ///////////

  const [deleteAdmins] = useDeleteAdminMutation();
  const [addAdmins] = useAddAdminMutation();

  // if (user) {
  //   // console.log(admins);
  //   // console.log(user);
  //   // console.log(
  //   //   !admins.find((item) => {
  //   //     // console.log(item.admin_id, user.id);
  //   //     return item.admin_id == user.id;
  //   //   })
  //   // );
  // }

  return (
    <div
      className="flex gap-[12px] w-[100%] p-[6px] px-[4px] items-center justify-between "
      style={{
        backgroundColor: !isUser ? "white" : "#f2f2f2",
      }}
    >
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
              <span className="text-[12px] text-[#505050] text-ellipsis  w-full max-w-[440px] text-justify">
                {!isUser ? "" : "admin"}
              </span>
            </div>

            <div className="flex items-center gap-[8px] font-semibold text-[#505050] text-[12px]">
              {!requesting ? (
                <div
                  ref={dropdownRef}
                  style={{
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  {isNotAdmin || (
                    <>
                      {user.id == myUser.id ? (
                        <></>
                      ) : (
                        <button
                          onClick={toggleDropdown}
                          className="px-[4px] h-full"
                        >
                          <img src={menuImg} alt="" />
                        </button>
                      )}
                    </>
                  )}
                  {isOpen && (
                    <div
                      className=" flex flex-col gap-[8px] rounded-[4px] shadow-lg border-[2px] border-[#404040]/18 bg-white  absolute p-[6px] z-250"
                      style={{
                        top: "100%",
                        left: 0,
                      }}
                    >
                      {admins.find((item) => item.admin_id == user.id) ? (
                        <></>
                      ) : (
                        <button
                          onClick={() => {
                            addAdmins({ admin_id: id, club_id: club.id });
                            // updateAdmins(id);
                            setIsOpen(false);
                            setIsUser(!isUser);
                            // if (setMember) {
                            //   setMember(false);
                            // }
                          }}
                          className="w-[96px] px-[8px] py-[2px] rounded-[4px] font-bold bg-white border-[2px] border-[#F2B749] hover:bg-[#F2B749] text-[12px]"
                        >
                          Make admin
                        </button>
                      )}
                      {user.id == myUser.id ? (
                        <></>
                      ) : (
                        <>
                          {!!admins.find(
                            (item) => item.admin_id == user.id
                          ) && (
                            <button
                              onClick={() => {
                                // addAdmins({ admin_id: id, club_id: club.id });
                                deleteAdmins(
                                  admins.find(
                                    (item) => item.admin_id == user.id
                                  ).id
                                );
                                setIsOpen(false);
                                setIsUser(!isUser);
                                // if (setMember) {
                                //   setMember(false);
                                // }
                              }}
                              className="w-[96px] mb-[4px] px-[8px] py-[2px] rounded-[4px] font-bold bg-white border-[2px] border-[#F2B749] hover:bg-[#F2B749] text-[12px]"
                            >
                              Demote
                            </button>
                          )}
                        </>
                      )}

                      <button
                        onClick={() => {
                          handleUpdate(true);

                          deleteAdmins(
                            admins.find((item) => item.admin_id == user.id).id
                          );
                          setIsUser(!isUser);
                          setIsOpen(false);
                        }}
                        className="w-[96px] px-[8px] py-[2px] rounded-[4px] font-bold bg-white border-[2px] border-red-700 hover:bg-red-700 text-[12px]"
                      >
                        Kick out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button className="w-[96px] px-[8px] py-[4px] rounded-[4px] font-bold bg-[#F2B749] text-white text-[14px]">
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserItem;
