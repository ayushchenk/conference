import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "../../logic/Auth";
import { LoginPage, SignUpPage } from "../../pages/Auth";
import {
  ConferenceDetailsPage,
  ConferencesPage,
  CreateConferencePage,
  CreateSubmissionPage,
  ParticipantsPage,
  SubmissionDetailsPage,
  SubmissionsPage,
  UpdateConferencePage,
  UpdateSubmissionPage,
} from "../../pages/Conferences";
import { UserDetailsPage, UsersPage } from "../../pages/Users";
import { Header } from "../Header";
import { AdminProtected } from "../ProtectedRoute/AdminProtected";
import { Protected } from "../ProtectedRoute/Protected";
import { ProfilePage } from "../../pages/Users/UserDetails/ProfilePage";
import { AuthorProtected } from "../ProtectedRoute/AuthorProtected";
import { ConferenceContext } from "../../contexts/ConferenceContext";
import { useState } from "react";

axios.interceptors.request.use(function (config) {
  const token = Auth.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const App = () => {
  const [conferenceId, setConferenceId] = useState(0);
  const context = { conferenceId, setConferenceId };

  return (
    <ConferenceContext.Provider value={context}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
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
            path="/conferences/:conferenceId/edit"
            element={
              <AdminProtected>
                <UpdateConferencePage />
              </AdminProtected>
            }
          />
          <Route
            path="/conferences/:conferenceId/participants"
            element={
              <AdminProtected>
                <ParticipantsPage />
              </AdminProtected>
            }
          />
          <Route
            path="/conferences/new"
            element={
              <AdminProtected>
                <CreateConferencePage />
              </AdminProtected>
            }
          />
          <Route
            path="/conferences/:conferenceId/submissions"
            element={
              <Protected>
                <SubmissionsPage />
              </Protected>
            }
          />
          <Route
            path="/conferences/:conferenceId/submissions/:submissionId"
            element={
              <Protected>
                <SubmissionDetailsPage />
              </Protected>
            }
          />
          <Route
            path="/conferences/:conferenceId/submissions/new"
            element={
              <AuthorProtected>
                <CreateSubmissionPage />
              </AuthorProtected>
            }
          />
          <Route
            path="/conferences/:conferenceId/submissions/:submissionId/edit"
            element={
              <AuthorProtected>
                <UpdateSubmissionPage />
              </AuthorProtected>
            }
          />
          <Route
            path="/users"
            element={
              <AdminProtected>
                <UsersPage />
              </AdminProtected>
            }
          />
          <Route
            path="/users/:userId"
            element={
              <AdminProtected>
                <UserDetailsPage />
              </AdminProtected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <ProfilePage />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </ConferenceContext.Provider>
  );
};
