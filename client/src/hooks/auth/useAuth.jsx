import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user) {
        try {
          const { data } = await axios
            .get("/users/getprofile")
            .then(({ data }) => {
              console.log("user data:", data);
              setUser(data.profile);
            });
          // setIsFetching(false);
        } catch (err) {
          console.log(err);
        } finally {
          setIsFetching(false);
        }
      }
    }

    fetchData();
  }, []);

  return (
    <authContext.Provider value={{ user, setUser, isFetching, setIsFetching }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};
