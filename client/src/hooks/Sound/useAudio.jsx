import React, { createContext, useContext, useEffect, useState } from "react";
import { sounds } from "../../constants";
export const AudioContext = createContext();
export default function AudioProvider({ children }) {
  const [audioList, setAudioList] = useState([]);

  useEffect(() => {
    const list = [];
    sounds.forEach((sound) => {
      const newSound = {
        id: sound.id,
        isPlaying: false,
        imgUrl: sound.imgURL,
        audioUrl: sound.audioURL,
        audio: new Audio(sound.audioURL),
        play: function () {
          console.log(this.audio);
          this.isPlaying = true;
          this.audio.loop = true;
          this.audio.play();
        },
        pause: function () {
          console.log(this.audio);
          this.isPlaying = false;
          this.audio.loop = true;
          this.audio.pause();
        },
      };
      list.push(newSound);
    });

    setAudioList(list);
  }, []);

  return (
    <AudioContext.Provider value={{ audioList }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
