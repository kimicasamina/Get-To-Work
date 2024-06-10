import React from "react";
import { useAudio } from "../hooks/Sound/useAudio";

export default function Ambience() {
  const { audioList } = useAudio();
  return (
    <div className="bg-white h-full w-full px-8 py-8 ">
      <div className="grid grid-cols-3 place-items-center h-full max-w-screen-md mx-auto ">
        {audioList.map((audio) => {
          return (
            <button
              key={audio.id}
              className={`w-24 h-24 flex justify-center items-center bg-gray-100 border rounded-full shadow-sm hover:shadow-md hover:border-primary `}
              onClick={(e) => {
                if (audio.isPlaying) {
                  audio.pause();
                } else {
                  audio.play();
                }
              }}
            >
              <img src={audio.imgUrl} alt="" className="" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
