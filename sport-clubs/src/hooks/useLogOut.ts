import { useState } from "react";
import pb from "../lib/pocketbase";

export default function useLogOut() {
  const [dummy, setDummy] = useState(0);

  function logOut() {
    pb.authStore.clear();
    setDummy(Math.random());
  }

  return logOut;
}
