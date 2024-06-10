// icons
import rain from "./assets/whitenoise/rain.png";
import coffeeShop from "./assets/whitenoise/coffee-shop.png";
import keyboard from "./assets/whitenoise/keyboard.png";
import fan from "./assets/whitenoise/fan.png";
import oceanWave from "./assets/whitenoise/ocean-wave.png";
import thunder from "./assets/whitenoise/thunder.png";
import train from "./assets/whitenoise/train.png";
import bus from "./assets/whitenoise/bus.png";
import fire from "./assets/whitenoise/fire.png";
import officeDesk from "./assets/whitenoise/office-desk.png";
import aircon from "./assets/whitenoise/air.png";
import city from "./assets/whitenoise/city.png";
import library from "./assets/whitenoise/library.png";
import bird from "./assets/whitenoise/bird.png";

// audio
import oceanWaveAudio from "./assets/audio/oceanwave.mp3";
import keyboardAudio from "./assets/audio/keyboard.mp3";
import officeAudio from "./assets/audio/office.mp3";
import coffeeShopAudio from "./assets/audio/coffeeshop.mp3";
import trainAudio from "./assets/audio/lrt.mp3";
import rainAudio from "./assets/audio/rain.mp3";
import thunderAudio from "./assets/audio/thunder.mp3";
import fireAudio from "./assets/audio/fire.mp3";
import airconAudio from "./assets/audio/aircon.mp3";
import cityAudio from "./assets/audio/city.mp3";
import libraryAudio from "./assets/audio/library.mp3";
import birdAudio from "./assets/audio/bird.mp3";

export const sounds = [
  {
    id: 1,
    active: false,
    name: "rain",
    imgURL: rain,
    audioURL: rainAudio,
    volume: 1,
  },
  {
    id: 2,
    active: false,
    name: "coffeeShop",
    imgURL: coffeeShop,
    audioURL: coffeeShopAudio,
    volume: 1,
  },
  {
    id: 3,
    active: false,
    name: "keyboard",
    imgURL: keyboard,
    audioURL: keyboardAudio,
    volume: 0.2,
  },
  {
    id: 4,
    active: false,
    name: "aircon",
    imgURL: aircon,
    audioURL: airconAudio,
    volume: 1,
  },
  {
    id: 5,
    active: false,
    name: "waves",
    imgURL: oceanWave,
    audioURL: oceanWaveAudio,
    volume: 1,
  },
  {
    id: 6,
    active: false,
    name: "thunder",
    imgURL: thunder,
    audioURL: thunderAudio,
    volume: 1,
  },
  {
    id: 7,
    active: false,
    name: "train",
    imgURL: train,
    audioURL: trainAudio,
    volume: 1,
  },
  {
    id: 8,
    active: false,
    name: "bird",
    imgURL: bird,
    audioURL: birdAudio,
    volume: 1,
  },
  {
    id: 9,
    active: false,
    name: "office",
    imgURL: officeDesk,
    audioURL: officeAudio,
    volume: 1,
  },
  {
    id: 10,
    active: false,
    name: "fire",
    imgURL: fire,
    audioURL: fireAudio,
    volume: 1,
  },
  {
    id: 11,
    active: false,
    name: "city",
    imgURL: city,
    audioURL: cityAudio,
    volume: 1,
  },
  {
    id: 12,
    active: false,
    name: "library",
    imgURL: library,
    audioURL: libraryAudio,
    volume: 1,
  },
];
