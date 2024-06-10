import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import useFetchTime from "../../hooks/charts/useFetchTime";
import {
  formatDate,
  formatDateShort,
  formatDuration,
} from "../../utils/helper";
import { getHour } from "../../utils/helper";
import tailwindConfig from "../../../tailwind.config";

Chart.defaults.elements.bar.borderWidth = 2;

export default function BarCharts({ data }) {
  const chartRef = useRef();
  var myChart;

  (async function () {
    myChart = new Chart(chartRef.current.getContext("2d"), {
      type: "bar",
      options: {
        responsive: true,
        animation: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Timetable",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";
                if (context.parsed.y !== null) {
                  label = ` Total time: ${formatDuration(context.parsed.y)}
                  `;
                }
                return label;
              },
            },
          },
          customCanvasBackgroundColor: {
            backgroundColor: tailwindConfig.theme.colors.success,
          },
        },
        parsing: {
          xAxisKey: "date",
          yAxisKey: "totalDuration",
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            display: true,

            ticks: {
              callback: function (value, index, ticks) {
                return getHour(value) + " hs";
              },
              maxTicksLimit: 8,
              stepSize: 3600000,
            },
          },
        },
      },
      data: {
        labels: data.map((row) => {
          return formatDateShort(row.date).split(" ");
        }),
        datasets: [
          {
            data: data.map((row) => row),
            stack: "Stack 0", // For multiple stacking

            backgroundColor: `${tailwindConfig.theme.colors.success}`,
          },
        ],
      },
    });
  })();

  return (
    <div
      style={{
        paddingBottom: "0px",
        height: "100%",
      }}
    >
      {/* <h1 className="">Time Overview</h1> */}
      <canvas id="timechart" ref={chartRef}>
        Hello
      </canvas>
    </div>
  );
}
