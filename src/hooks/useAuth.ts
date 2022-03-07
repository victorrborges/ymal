import { createContext, useContext } from "react";
import { AuthenticationContent } from "../types/types";

export const MyAuthentication = createContext<AuthenticationContent>({
  authenticated: false,
  userId: undefined,
  setUserId: () => {},
});

export const useAuthentication = () =>
  useContext(MyAuthentication);
