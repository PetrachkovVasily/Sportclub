import { Link } from "@tanstack/react-router";
import {
  Navbar,
  NavbarBrand,
  Button,
  NavbarToggle,
  NavbarCollapse,
  NavbarLink,
} from "flowbite-react";
import React from "react";

interface Props {}

function Header(props: Props) {
  const {} = props;

  return (
    <Navbar fluid className="fixed w-[100%] z-50 shadow-md">
      <NavbarBrand href="https://flowbite-react.com">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibol">
          Sportclubs
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button className="bg-[#F2B749] hover:bg-[#F2C744]">Create club</Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <Link to={"/profile/123/stats"}>Profile</Link>
        <Link to={"/trainings"}>Trainings</Link>
        <Link to={"/calendar"}>Schedule</Link>
        <Link to={"/clubsList"}>Clubs</Link>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Header;
