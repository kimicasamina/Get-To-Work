import React, { useState, useEffect } from "react";
import { formatDate, formatTime } from "../../utils/helper";

export default function Clock() {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div className="flex flex-col ">
      <p className="text-2xl">{formatDate(date)}</p>
      <p className="text-2xl ">{formatTime(date)}</p>
    </div>
  );
}
