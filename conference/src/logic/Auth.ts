import { AuthData } from "../types/Auth";

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

    return new Date(authData.token.expiry) > new Date();
  }

  export function getToken() {
    const authData = getData();

    return authData?.token.accessToken && isAuthed() ? authData.token.accessToken : null;
  }

  export function getId() {
    const authData = getData();

    return authData?.userId && isAuthed() ? authData.userId : null;
  }

  export function isAdmin() {
    const authData = getData();

    if (!authData) {
      return false;
    }

    for (const conference in authData.roles) {
      const roles = authData.roles[conference];

      if (roles.find(r => r === "Admin" && isAuthed())) {
        return true;
      }
    }

    return false;
  }

  export function isAuthor(conferenceId: number) {
    return !!getRoles(conferenceId).find(r => r === "Author") && isAuthed();
  }

  export function isReviewer(conferenceId: number) {
    return !!getRoles(conferenceId).find(r => r === "Reviewer") && isAuthed();
  }

  export function isChair(conferenceId: number) {
    return !!getRoles(conferenceId).find(r => r === "Chair") && isAuthed();
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
