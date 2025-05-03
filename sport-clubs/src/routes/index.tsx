import { createFileRoute, redirect } from "@tanstack/react-router";
import pb from "../lib/pocketbase";
import { useState } from "react";
import useLogOut from "../hooks/useLogOut";
import useLogIn from "../hooks/useLogIn";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: ({ location }) => {
    if (!pb.authStore.isValid) {
      throw redirect({
        to: "/auth",
      });
    }
    if (location.href === "/") {
      throw redirect({
        to: "/clubsList",
      });
    }
  },
});

function RouteComponent() {
  return <div></div>;
}
