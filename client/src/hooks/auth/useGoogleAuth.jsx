import { GoogleOAuthProvider } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { GoogleIcon } from "../../assets/icons";

export default function useGoogleAuth() {
  const { setUser, setIsFetching } = useAuth();
  const navigate = useNavigate();
  const clientId = `159622240777-gcch1vp4fe9ceohvgc24jt7eurhnrl2r.apps.googleusercontent.com`;
  const googleLogin = useGoogleLogin({
    onSuccess: async (googleData) => {
      console.log("Google login successful", googleData);
      const { data } = await axios.post("/auth/google", {
        credentials: googleData,
      });
      console.log("data:", data);
      setUser(data);
      setIsFetching(false);
      navigate("/");
      // store returned user somehows
    },
    onError: () => {
      console.error("Google login failed");
    },
  });

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <button
        className="w-full flex justify-center items-center gap-x-2 bg-gray-900 text-gray-100 btn py-0 my-0 font-semibold hover:shadow-md hover:bg-gray-800"
        onClick={() => googleLogin()}
      >
        <GoogleIcon width={"40px"} height={"40px"} className={""} />
        Sign in with Google
      </button>
    </GoogleOAuthProvider>
  );
}
