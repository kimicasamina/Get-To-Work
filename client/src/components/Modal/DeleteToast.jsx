import React from "react";
// redux
import { useDispatch } from "react-redux";
import { setIsModal } from "../../redux/reducers/ui";
import { deleteProject } from "../../redux/actions/projects";
// rrd
import { useParams } from "react-router-dom";

export default function DeleteToast() {
  const dispatch = useDispatch();
  const params = useParams();

  const handleOnClick = (e) => {
    e.stopPropagation();
    if (e.target.name === "yes") {
      console.log("yes");
      dispatch(deleteProject(params.id));
      dispatch(setIsModal(false));
    } else if (e.target.name === "no") {
      console.log("no");
      dispatch(setIsModal(false));
    }
  };

  return (
    <div
      className="w-[400px] h-[auto] bg-gray-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md p-8 shadow-lg z-20"
      onClick={(e) => handleOnClick(e)}
    >
      <h3 className="text-2xl text-gray-100 text-center ">
        Are you sure you want to delete this project?
      </h3>
      <div className="flex justify-center gap-x-6 px-4 pt-6">
        <button
          name="yes"
          className="p-2 rounded-md btn bg-primary hover:bg-primaryDark text-gray-200 w-full"
          onClick={(e) => handleOnClick(e)}
        >
          Yes
        </button>
        <button
          name="no"
          className="p-2 rounded-md btn bg-primary hover:bg-primaryDark text-gray-200 w-full"
          onClick={(e) => handleOnClick(e)}
        >
          No
        </button>
      </div>
    </div>
  );
}
