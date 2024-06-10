const projectsReducer = (projects = [], action) => {
  switch (action.type) {
    case "GET_PROJECTS": {
      return [...action.payload];
    }
    case "ADD_PROJECT": {
      return [...projects, action.payload];
    }

    case "UPDATE_PROJECT": {
      const newProjects = projects.map((project) => {
        if (project._id === action.payload._id) {
          return { ...action.payload };
        }
        return project;
      });

      return [...newProjects];
    }

    case "DELETE_PROJECT": {
      const newProject = projects.filter(
        (project) => project._id !== action.payload._id
      );
      return [...newProject];
    }

    case "ADD_TASK": {
      const stateCopy = JSON.parse(JSON.stringify(projects));
      let existingProject = stateCopy.filter(
        (project) => project._id === action.payload.project
      )[0];
      existingProject.tasks.push(action.payload);
      const newProjects = stateCopy.map((project) => {
        if (project._id === existingProject._id) {
          return existingProject;
        }
        return project;
      });
      console.log(newProjects);
      return [...newProjects];
    }

    default:
      return projects;
  }
};

export default projectsReducer;
