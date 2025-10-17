"use client";

import React from "react";

import { createContext } from "use-context-selector";

import {
  getLoggedUserInformations,
  LoggedUser,
} from "@/utils/user/get-logged-user-informations";

interface LoggedUserContext {
  loggedUser: LoggedUser | null;
  setLoggedUser: React.Dispatch<React.SetStateAction<LoggedUser | null>>;
}

export const loggedUserContext = createContext<LoggedUserContext>({
  loggedUser: null,
  setLoggedUser: () => {},
});

export const LoggedUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loggedUser, setLoggedUser] = React.useState<LoggedUser | null>(null);

  React.useEffect(() => {
    const user = getLoggedUserInformations();

    if (user) setLoggedUser(user);
  }, []);

  return (
    <loggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </loggedUserContext.Provider>
  );
};
