import React, { useContext, createContext, useState } from "react";

import { sounds } from "../../constants";
import useSound from "use-sound";

const WhitenoiseContext = React.createContext([]);
export const WhitenoiseProvider = ({ children }) => {
  const [selected, setSelected] = useState([]);
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  const audioList = sounds.map((sound) => (
    <button className="" onClick={toggle} key={sound.id}>
      <Sound
        className=""
        img={sound.imgSrc}
        url={sound.audioSrc}
        volume={sound.volume}
        id={sound.id}
        toggle={toggle}
        playing={playing}
      />
    </button>
  ));

  return (
    <WhitenoiseContext.Provider value={[playing, toggle]}>
      {children}
    </WhitenoiseContext.Provider>
  );
};

export const useWhitenoiseContext = () => useContext(WhitenoiseContext);
