import React from "react";

export default function useGetDates() {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  const getDaysArray = function (start, end) {
    const arr = [];
    for (
      const dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    console.log("date arr:", arr);
    return arr;
  };

  const daylist = getDaysArray(startDate, endDate);
  //   daylist.map((v) => v.toISOString().slice(0, 10)).join("");
  //   console.log("daylist:", daylist);
  return daylist;
}
