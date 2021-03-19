import React, { createContext, useState, useEffect, useContext } from "react";
import * as Utils from '../../utils/utils';

export interface User {
    display_name: string,
    email: string,
    fist_name: string,
    last_name: string
}

export type UserData = undefined | User;

const UserContext = createContext<UserData>(undefined);

const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    console.log(`UserProvider useEffect(): `)
    Utils.getUser()
    .then(res => {
      console.log('setting user: ', res);
      setUser(res)});
  }, []);

  return (
      <UserContext.Provider value={user}>
          {children}
      </UserContext.Provider>
  );
};

UserProvider.context = UserContext;

export default UserProvider;