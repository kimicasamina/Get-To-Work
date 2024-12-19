# Get To Work

Website: https://gettowork.onrender.com/

## Overview

Gettowork is a full-stack web application built using Node.js, Express.js, React, TailwindCSS, and MongoDB. The application includes four core features: Project Management, Timer, Ambience, and Dashboard. The application is designed to help users manage projects, track tasks, set timers, create an ideal working environment, and monitor overall progress.

## Features

### 1. Project Management

The Project Management feature allows users to create, update, and track projects. It includes a sidebar displaying a list of projects, and each project comes with detailed information such as the project’s status, progress, and a calendar for managing deadlines.

#### Project List:

Displays a list of all projects, where each project entry includes:

- Project Status:
  Indicating whether the project is Ongoing, Completed, or Not Started.
- Progress Bar:
  A visual indicator showing the completion percentage of the project.
- Calendar: Allows users to set a Start Date and Due Date for each project. Users can select a date using a calendar interface, ensuring better planning and timeline management.

On the right-hand side of the page is the task feature, users can manage tasks associated with a selected project. This feature provides the following functionality:

#### Task List:

Users can add a bullet list of tasks under a project.

- Add Task: Users can add a task to the project.
- Subtasks: Tasks can be indented to create subtasks. This allows for hierarchical organization of tasks.
- Task Completion: A checkbox next to each task allows the user to mark it as completed.
- Toggle Collapse/Expand: A toggle button allows users to hide or show the task list for a more compact view of the project.
  This allows for highly structured project planning, with clear indicators of task completion, subtask management, and date scheduling.

### 2. Timer

The Timer feature is designed to help users manage their time effectively while working on projects. It provides the following functionality:

- Start/Stop Timer: Users can start and stop a timer for their current task or project.
- Track Time: The timer displays the total elapsed time for the ongoing project.

This feature is integrated with the Project Management and Dashboard features to provide real-time tracking of how much time is spent on each project.

### 3. Ambience

The Ambience feature allows users to customize their working environment by controlling various audio settings. This is ideal for users who need background noise or specific sounds to enhance their focus.

- Sound Controls: Users can toggle different sounds on or off (e.g., rain sounds, keyboard clacking, ocean waves).

The Ambience feature is designed to improve concentration and reduce distractions while working on tasks and projects.

### 4. Dashboard

The Dashboard provides a comprehensive overview of the user’s activity, project status, and progress. It includes:

- Project Overview: A visual summary of all the user’s ongoing projects, including their current status, progress, and deadlines.
- Timers Summary: A section that shows how much time has been spent on various projects on that day.

This feature serves as the home screen, where users can quickly get an overview of their work and any upcoming tasks or deadlines.

## Technologies Used

### Frontend

- React: A JavaScript library for building user interfaces, especially single-page applications. React is used to create the dynamic and responsive user interface for the project management system.
- TailwindCSS: A utility-first CSS framework used for building custom designs quickly and responsively.

### Backend

- Node.js: A JavaScript runtime used for building the backend of the application.
- Express.js: A web application framework for Node.js that simplifies the routing, middleware, and request/response handling.
  Database
- MongoDB: A NoSQL database used to store project information, tasks, user data, and other dynamic content. MongoDB provides flexibility in handling unstructured data such as task lists, progress tracking, and project settings.
