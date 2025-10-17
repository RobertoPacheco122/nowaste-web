"use client";

import { loggedUserContext } from "@/providers/logged-user-provider";
import { useContextSelector } from "use-context-selector";

export const useLoggedUser = () => {
  const loggedUser = useContextSelector(
    loggedUserContext,
    (context) => context.loggedUser
  );
  const setLoggedUser = useContextSelector(
    loggedUserContext,
    (context) => context.setLoggedUser
  );

  return { loggedUser, setLoggedUser };
};
