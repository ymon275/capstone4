import React, { useContext, useEffect, useState } from "react";
const AuthContext = React.createContext(AuthProvider);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);

  function signup(email: string, password: string) {}

  function logout() {}

  function resetPassword(email: string) {}

  function updateEmail(email: string) {}

  function updatePassword(password: string) {}

  const updateUser = async () => {
    const data = await fetch("http://localhost:5050/user", {
      headers: {
        "x-access-token": localStorage.getItem("access-token"),
      } as HeadersInit,
    }).then((result) => result.json());
    setCurrentUser(data);
  };

  useEffect(() => {
    if (localStorage.getItem("access-token")) {
      updateUser();
    }
  }, [localStorage]);

  const value = {
    currentUser,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };
  // ! Conditional render loading
  return (
    <AuthContext.Provider
      value={value as unknown as ({ children }: any) => JSX.Element}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
