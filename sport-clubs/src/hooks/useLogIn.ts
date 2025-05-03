import { useState } from "react";
import pb from "../lib/pocketbase";

export default function useLogIn() {
  const [isLoading, setIsLoading] = useState(false);

  async function logIn({ email, password }) {
    setIsLoading(true);
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  return { logIn, isLoading };
}
