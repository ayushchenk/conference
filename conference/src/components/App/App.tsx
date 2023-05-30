import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../Header";
import { ConferenceDetailsPage, ConferencesPage, ParticipantsPage } from "../../pages/Conferences";
import { Protected } from "../ProtectedRoute/Protected";
import { SignUpPage, LoginPage } from "../../pages/Auth";
import { Auth } from "../../logic/Auth";
import { CreateConferencePage } from "../../pages/Conferences/CreateConferencePage";
import { UsersPage } from "../../pages/Users";

axios.interceptors.request.use(function (config) {
  const token = Auth.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/users"
          element={
            <Protected>
              <UsersPage />
            </Protected>
          }
        />
        <Route
          path="/"
          element={
            <Protected>
              <ConferencesPage />
            </Protected>
          }
        />
        <Route
          path="/conferences/:conferenceId"
          element={
            <Protected>
              <ConferenceDetailsPage />
            </Protected>
          }
        />
        <Route
          path="/conferences/:conferenceId/participants"
          element={
            <Protected>
              <ParticipantsPage />
            </Protected>
          }
        />
        <Route
          path="/create-conference"
          element={
            <Protected>
              <CreateConferencePage />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
