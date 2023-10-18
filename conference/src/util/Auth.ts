import axios from "axios";
import { AuthData } from "../types/Auth";

export namespace Auth {
  const AUTH_DATA = "authData";

  export function login(authData: AuthData) {
    localStorage.setItem(AUTH_DATA, JSON.stringify(authData));
  }

  export function logout() {
    localStorage.removeItem(AUTH_DATA);
    axios.post(import.meta.env.VITE_USER_API_URL + '/user/sign-out').catch(console.error);
  }

  export function isAuthed() {
    const authData = getData();

    if (!authData) {
      return false;
    }

    return new Date(authData.validTo).getTime() > new Date().getTime();
  }

  export function getId() {
    const authData = getData();

    return isAuthed() && authData
      ? authData.id
      : null;
  }

  export function isAdmin() {
    return isAuthed() && getData()?.admin;
  }

  export function hasAnyRole(conferenceId: number, roles: string[]) {
    if (roles.includes("Admin") && isAdmin()) {
      return true;
    }

    return isAuthed() && !!getRoles(conferenceId).find(role => roles.includes(role));
  }

  export function isAuthor(conferenceId: number) {
    return hasAnyRole(conferenceId, ["Author"]);
  }

  export function isReviewer(conferenceId: number) {
    return hasAnyRole(conferenceId, ["Reviewer"]);
  }

  export function isChair(conferenceId: number) {
    return hasAnyRole(conferenceId, ["Chair"]);
  }

  function getData() {
    const authDataString = localStorage.getItem(AUTH_DATA);

    if (!authDataString) {
      return null;
    }

    return JSON.parse(authDataString) as AuthData;
  }

  function getRoles(conferenceId: number) {
    const authData = getData();

    return authData?.roles[conferenceId] ?? [];
  }
}
