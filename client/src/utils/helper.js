export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const formatDate = (date) => {
  let formattedDate = new Date(date);
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    weekday: "short",
  };

  return formattedDate.toLocaleDateString("en-GB", options);
};

export const formatDateShort = (date) => {
  let formattedDate = new Date(date);
  const options = {
    // month: "short",
    day: "2-digit",
    weekday: "short",
    // year: "numeric",
  };

  return formattedDate.toLocaleDateString("en-GB", options);
};

export const formatTime = (date) => {
  let formattedTime = new Date(date);
  let options = {
    hour: "2-digit",
    minute: "2-digit",
  };

  return formattedTime.toLocaleTimeString("en-us", options);
};

export const formatCelsius = (degree) => {
  // const degree = new NumberFormat();
  const degrees = new Intl.NumberFormat("en-US", {
    style: "unit",
    unit: "celsius",
  });
  // console.log(degrees.format(degree));
  return degrees.format(degree);
};

export const getFormattedTime = (milliseconds) => {
  const total_seconds = parseInt(Math.floor(milliseconds / 1000));
  const total_minutes = parseInt(Math.floor(total_seconds / 60));
  const total_hours = parseInt(Math.floor(total_minutes / 60));
  const days = parseInt(Math.floor(total_hours / 24));

  let seconds = parseInt(total_seconds % 60);
  let minutes = parseInt(total_minutes % 60);
  let hours = parseInt(total_hours % 24);

  // setMaxTime(hours);

  return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

export const getHour = (milliseconds) => {
  const total_seconds = parseInt(Math.floor(milliseconds / 1000));
  const total_minutes = parseInt(Math.floor(total_seconds / 60));
  const total_hours = parseInt(Math.floor(total_minutes / 60));
  const days = parseInt(Math.floor(total_hours / 24));

  let seconds = parseInt(total_seconds % 60);
  let minutes = parseInt(total_minutes % 60);
  let hours = parseInt(total_hours % 24);

  return [hours];
};

export const formatDuration = (milliseconds) => {
  const total_seconds = parseInt(Math.floor(milliseconds / 1000));
  const total_minutes = parseInt(Math.floor(total_seconds / 60));
  const total_hours = parseInt(Math.floor(total_minutes / 60));
  const days = parseInt(Math.floor(total_hours / 24));

  let seconds = parseInt(total_seconds % 60);
  let minutes = parseInt(total_minutes % 60);
  let hours = parseInt(total_hours % 24);

  return `${hours}hs ${minutes}m ${seconds}s`;
};

export const getMinutes = (milliseconds) => {
  const total_seconds = parseInt(Math.floor(milliseconds / 1000));
  const total_minutes = parseInt(Math.floor(total_seconds / 60));
  const total_hours = parseInt(Math.floor(total_minutes / 60));
  const days = parseInt(Math.floor(total_hours / 24));

  let seconds = parseInt(total_seconds % 60);
  let minutes = parseInt(total_minutes % 60);
  let hours = parseInt(total_hours % 24);

  return [minutes];
};

export const getSeconds = (milliseconds) => {
  const total_seconds = parseInt(Math.floor(milliseconds / 1000));
  const total_minutes = parseInt(Math.floor(total_seconds / 60));
  const total_hours = parseInt(Math.floor(total_minutes / 60));
  const days = parseInt(Math.floor(total_hours / 24));

  let seconds = parseInt(total_seconds % 60);
  let minutes = parseInt(total_minutes % 60);
  let hours = parseInt(total_hours % 24);

  return [seconds];
};

export const formatDurationAndDate = (obj, projects) => {
  let newTime = [];
  for (let i = 0; i < obj?.length; i++) {
    let currentDate = formatDate(obj[i].createdAt);
    let currentProject = projects.filter(
      (project) => project._id === obj[i].project
    )[0];
    let newDate = {
      date: currentDate,
      duration: obj[i].duration,
      project: [
        {
          name: currentProject.name,
          _id: currentProject._id,
        },
      ],
    };

    console.log(currentDate);
    newTime.push(newDate);
    for (let j = i + 1; j < obj.length; j++) {
      if (formatDate(obj[j].createdAt) === currentDate) {
        newDate.duration += obj[j].duration;
        const newProject = projects.filter(
          (project) => project._id === obj[j].project
        )[0];
        if (currentProject !== obj[j].project) {
          newDate.project.push({
            name: newProject.name,
            _id: newProject._id,
          });
        }
      }
    }
  }
  console.log(newTime);
  return newTime;
};

export const iterateArr = (arr) => {
  arr.forEach((item) => {
    item.forEach((key) => {
      if (typeof item[key] === "object" && item[key] !== null) {
        // console.log(length, task);
        iterateArr(item[key]);
      }
    });
  });
};

export const getTaskLength = (arr) => {
  let length = 0;
  function iterateArr(arr) {
    console.log(arr);
    arr.forEach((task) => {
      length++;
      if (task.subtask?.length > 0) {
        // console.log(length, task);
        iterateArr(task.subtask);
      }
    });
  }
  iterateArr(arr);
  return length;
};

export const getCompletedTaskCount = (arr) => {
  let count = 0;
  function iterateArr(arr) {
    arr.forEach((task) => {
      if (task.isCheck) {
        count++;
      }
      if (task.subtask?.length > 0) {
        // console.log(length, task);
        iterateArr(task.subtask);
      }
    });
  }
  iterateArr(arr);
  return count;
};

const obj = [
  {
    id: 1,
    name: "login page",
    subtask: [
      {
        id: 435,
        name: "hello",
      },
    ],
  },
  {
    id: 2,
    name: "card page",
    subtask: [
      {
        id: 3,
        name: "card component ui",
        subtask: [
          {
            id: 4,
            name: "card button",
          },
          {
            id: 5,
            name: "code block",
          },
        ],
      },
    ],
  },
];

const newObj = {
  id: 6,
  name: "code syntax highlighter",
};
const subtask = {
  id: 8,
  name: "hello world....",
};
const id = 4;

const replaceObj = (obj) => {
  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      replaceObj(obj[key]); // recursive call for nested obj
    } else {
      if (obj[key] === 5) {
        console.log("matching id:", obj[key]);
        console.log("Key", key);
        //  { id: 436, name: "kim" };
      }
    }
  }
  return obj;
};
console.log(replaceObj(obj));

export const getDaysArray = (start, end) => {
  const arr = [];
  for (
    const dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};

export const getDayList = () => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  const daylist = getDaysArray(startDate, endDate);
  return daylist.map((v) => v.toISOString().slice(0, 10)).join("");
};
