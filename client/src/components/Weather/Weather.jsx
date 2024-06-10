import React, { useEffect, useState } from "react";
// utils
import { formatCelsius } from "../../utils/helper";
// axios
import axios from "axios";
// hooks
import { useWeather } from "../../hooks/weather/useWeather";

export default function Weather() {
  const { weather, location } = useWeather();

  return (
    <div className="font-inter leading-tight text-gray-900 w-auto  ">
      <h2 className="text-4xl">{weather?.cityName}</h2>
      <p className="text-gray-800 text-lg font-light">{weather?.desc}</p>
      <div className="flex flex-wrap items-center ">
        <span className="text-2xl ">{formatCelsius(weather?.temp)}</span>
        <img
          src={weather?.icon}
          alt=""
          className="h-16 pl-2 absolute left-32 bottom-4 "
        />
      </div>
    </div>
  );
}
