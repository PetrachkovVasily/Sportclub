import { createFileRoute, Outlet } from "@tanstack/react-router";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import Achievements from "../../components/Achievements/Achievements";
import InfoNote from "../../components/InfoNote/InfoNote";
import locationImg from "../../assets/location-point-svgrepo-com 1.svg";
import workImg from "../../assets/flight-takeoff-svgrepo-com 1.svg";
import membersImg from "../../assets/user-group-svgrepo-com 1.svg";
import ClubHead from "../../components/ClubHead/ClubHead";
import SwitchMenu from "../../components/SwitchMenu/SwitchMenu";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import {
  useGetClubAdminsQuery,
  useGetClubUsersQuery,
  useGetSingleClubQuery,
} from "../../services/UserService";
import Dropdown from "../../components/Dropdown/Dropdown";
import UserItem from "../../components/UserItem/UserItem";
import Line from "../../components/Line/Line";
import pb from "../../lib/pocketbase";
import UserReques from "../../components/UserItem/UserReques";

export const Route = createFileRoute("/club/$id")({
  component: RouteComponent,
});

async function getUsers(id) {
  return await pb.collection("club").getOne(id, {
    expand: "user_id",
  });
}

function RouteComponent() {
  const { id } = Route.useParams();

  const menuList = [
    { name: "Rating", link: "/club/$id/rating", id: id },
    { name: "Schedule", link: "/club/$id/schedule", id: id },
    { name: "Workouts", link: "/club/$id/workouts", id: id },
    { name: "Achievements", link: "/club/$id/achievements", id: id },
  ];

  const club = useGetSingleClubQuery(id)?.data;

  const admins = useGetClubAdminsQuery(id)?.data?.items;
  const clubUsers = useGetClubUsersQuery(id)?.data?.user_id;

  //requests
  const requestUsers = useGetClubUsersQuery(id)?.data?.request_id;

  // const community = getUsers(id);

  // console.log(community);

  const { record: user } = JSON.parse(localStorage.getItem("pocketbase_auth"));

  const [isUser, setIsUser] = useState(true);

  useEffect(() => {
    if (admins) {
      setIsUser(!admins.find((item) => item.admin_id == user.id));
    }
  }, [admins]);

  const [openUserList, setOpenUserList] = useState(false);
  const [optionValue, setOptionValue] = useState("members");

  const openModal = () => {
    setOpenUserList(true);
  };

  const closeModal = () => {
    setOpenUserList(false);
  };

  return (
    <PageWrapper>
      <article className="max-w-[880px] w-[100%] flex flex-col gap-[24px] ">
        <ClubHead club={club} isUser={isUser} />
        <div className="w-[100%] max-w-[880px]">
          <SwitchMenu
            menuList={menuList}
            blockOption={isUser ? "Workouts" : null}
          />
          <section className="flex flex-col rounded-b-[8px] bg-white w-[100%] max-w-[880px] gap-[24px] p-[16px] py-[24px]">
            <Outlet />
          </section>
        </div>
      </article>
      <article className="max-w-[280px] w-[19vw] flex flex-col gap-[24px] ">
        <section
          className={`flex flex-col items-start gap-[8px] p-[24px] rounded-[8px] bg-white w-[19vw] max-w-[280px]`}
        >
          <InfoNote
            info={club?.country + ", " + club?.city}
            src={locationImg}
          />
          <InfoNote info={club?.category} src={workImg} />
          <div className="w-fit cursor-pointer" onClick={openModal}>
            <InfoNote
              info={"members"}
              src={membersImg}
              num={club?.user_id.length}
            />
          </div>
          {openUserList && (
            <Modal closeModal={closeModal}>
              <div className="w-full flex flex-col gap-[12px] font-semibold text-[18px] text-[#505050] ">
                {!isUser ? (
                  <Dropdown
                    options={[
                      { option: "members", name: "members" },
                      { option: "requests", name: "requests" },
                    ]}
                    onChange={(e) => {
                      console.log(e);

                      setOptionValue(e);
                    }}
                    value={optionValue}
                  />
                ) : (
                  <h3>Members</h3>
                )}

                <div className="w-full gap-[2px] flex flex-col ">
                  {optionValue == "members" ? (
                    <>
                      {clubUsers?.map((item, i, arr) => {
                        return (
                          <div className="w-full" key={item}>
                            <UserItem
                              id={item}
                              admins={admins || []}
                              club={club}
                              isNotAdmin={isUser}
                            />
                            {i == arr.length - 1 || <Line />}
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {requestUsers?.map((item, i, arr) => {
                        return (
                          <div className="w-full" key={item}>
                            <UserReques id={item} club={club} recUsers={arr} />
                            {i == arr.length - 1 || <Line />}
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </Modal>
          )}
        </section>
        <ContentContainer gap={22} pb={16}>
          <Achievements
            isClub={true}
            userAchAmount={8}
            clubAchAmount={16}
            clubId={club?.id}
          />
        </ContentContainer>
      </article>
    </PageWrapper>
  );
}
