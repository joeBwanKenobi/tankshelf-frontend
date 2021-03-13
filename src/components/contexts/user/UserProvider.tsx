import React, { createContext, useState, useEffect } from "react";
import * as Utils from '../../utils/utils';

interface User {
    display_name: string,
    email: string,
    fist_name: string,
    last_name: string
}

type ContextValue = undefined | User;

const UserContext = createContext<ContextValue>(undefined);

const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    Utils.getUser()
    .then(res => setUser(res));
  }, []);

  return (
      <UserContext.Provider value={user}>
          {children}
      </UserContext.Provider>
  );
};

UserProvider.context = UserContext;

export default UserProvider;