import { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// layout
import RootLayout from "./pages/Layout/RootLayout";
import ProfileLayout from "./pages/Layout/ProfileLayout";
import ProjectLayout from "./pages/Layout/ProjectLayout";

// pages and component
import AddProject from "./components/Project/AddProject";
import EditProject from "./components/Project/EditProject";
import Timer from "./pages/Timer";
import Tasks from "./components/Project/Task/Tasks";
import Ambience from "./pages/Ambience";
import ErrorPage from "./pages/ErrorPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

// google auth
import { GoogleOAuthProvider } from "@react-oauth/google";

// context and hooks
import AudioProvider from "./hooks/Sound/useAudio";
import WeatherProvider from "./hooks/weather/useWeather";
import { ProvideAuth } from "./hooks/auth/useAuth";
import { ProvideTimer } from "./hooks/timer/useTimer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<ProfileLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project" element={<ProjectLayout />}>
          <Route exact="true" path="/project/add" element={<AddProject />} />
          <Route path="/project/:id/edit" element={<EditProject />} />
          <Route path="/project/:id" element={<Tasks />} />
        </Route>
        <Route path="/timer" element={<Timer />} />
        <Route path="/ambience" element={<Ambience />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route errorElement={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return (
    <div className="">
      <ProvideAuth>
        <GoogleOAuthProvider clientId="159622240777-gcch1vp4fe9ceohvgc24jt7eurhnrl2r.apps.googleusercontent.com">
          <ProvideTimer>
            <WeatherProvider>
              <AudioProvider>
                <RouterProvider router={router} />
              </AudioProvider>
            </WeatherProvider>
          </ProvideTimer>
        </GoogleOAuthProvider>
      </ProvideAuth>
    </div>
  );
}

export default App;
