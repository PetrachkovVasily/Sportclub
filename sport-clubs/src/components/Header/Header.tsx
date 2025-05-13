import { Link } from "@tanstack/react-router";
import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
} from "flowbite-react";
import React, { useState } from "react";
import ActionBtn from "../ActionBtn/ActionBtn";
import Modal from "../Modal/Modal";
import CreateClubModal from "../CreateClubModal/CreateClubModal";
import logo from "../../assets/potato.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useFetchUserQuery } from "../../services/UserService";

interface Props {}

function Header() {
  const [openCreateClub, setOpenCreateClub] = useState(false);

  const closeModal = () => {
    setOpenCreateClub(false);
  };

  const user = JSON.parse(localStorage.getItem("pocketbase_auth"))?.record;
  // console.log(user);

  return (
    <Navbar fluid className="fixed w-[100%] z-50 shadow-md">
      <div className="flex">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibol">
          Coach potato
        </span>
      </div>
      {user && (
        <>
          <NavbarToggle />
          <NavbarCollapse>
            <Link
              className="p-[4px] flex items-center md:justify-center justify-start"
              to="/profile/$id/stats"
              params={{ id: user.id }}
            >
              Profile
            </Link>
            <Link
              className="p-[4px] flex items-center md:justify-center justify-start"
              to={"/trainings"}
            >
              Trainings
            </Link>
            <Link
              className="p-[4px] flex items-center md:justify-center justify-start"
              to={"/calendar"}
            >
              Schedule
            </Link>
            <Link
              className="p-[4px] flex items-center md:justify-center justify-start"
              to={"/clubsList"}
            >
              Clubs
            </Link>
            <div className="mt-[8px] md:mt-0">
              <ActionBtn
                onClick={() => {
                  setOpenCreateClub(true);
                }}
              >
                Create club
              </ActionBtn>
            </div>
          </NavbarCollapse>
          {openCreateClub && (
            <Modal closeModal={closeModal}>
              <CreateClubModal closeModal={closeModal} userId={user.id} />
            </Modal>
          )}
        </>
      )}
    </Navbar>
  );
}

export default Header;
