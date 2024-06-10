import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import DeleteToast from "../../components/Modal/DeleteToast";
import { setIsModal } from "../../redux/reducers/ui";
import { useDispatch, useSelector } from "react-redux";

export default function RootLayout() {
  const dispatch = useDispatch();
  const isModal = useSelector((state) => state.ui.isModal);

  return (
    <div className="flex flex-col h-screen w-full max-w-screen-xl mx-auto relative ">
      {isModal ? (
        <div
          className="flex absolute  h-full w-full bg-opacity-0 z-[5]"
          onClick={(e) => dispatch(setIsModal(false))}
        >
          <DeleteToast />
        </div>
      ) : null}
      <Header />
      <main className="bg-white flex-1 w-full self-end h-[calc(100%-80px)] ">
        <Outlet />
      </main>
    </div>
  );
}
