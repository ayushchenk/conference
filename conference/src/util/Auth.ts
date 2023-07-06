import { AuthData, JwtToken } from "../types/Auth";
import jwt_decode from "jwt-decode";

export namespace Auth {
  const AUTH_DATA = "authData";

  export function login(authData: AuthData) {
    localStorage.setItem(AUTH_DATA, JSON.stringify(authData));
  }

  export function logout() {
    localStorage.removeItem(AUTH_DATA);
  }

  export function isAuthed() {
    const authData = getData();

    if (!authData) {
      return false;
    }

    //exp is seconds, getTime is milliseconds
    return authData.parsedToken.exp * 1000 > new Date().getTime();
  }

  export function getToken() {
    const authData = getData();

    if (!authData || !isAuthed()) {
      return null;
    }

    return authData.accessToken;
  }

  export function getId() {
    const authData = getData();

    return authData?.parsedToken.nameid && isAuthed()
      ? Number(authData?.parsedToken.nameid)
      : null;
  }

  export function isAdmin() {
    const authData = getData();

    if (!authData) {
      return false;
    }

    return isAuthed() && (authData.parsedToken.role === "Admin" || authData.parsedToken.role.includes("Admin"));
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

    const data = JSON.parse(authDataString) as AuthData;

    return {
      ...data,
      parsedToken: jwt_decode<JwtToken>(data.accessToken)
    };
  }

  function getRoles(conferenceId: number) {
    const authData = getData();

    return authData?.roles[conferenceId] ?? [];
  }
}
