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
    const authDataString = localStorage.getItem(AUTH_DATA);

    if (!authDataString) {
      return false;
    }

    const authData = JSON.parse(authDataString) as AuthData;

    return new Date(authData.token.expiry) > new Date();
  }

  export function getToken() {
    const authDataString = localStorage.getItem(AUTH_DATA);

    if (!authDataString) {
      return null;
    }

    const authData = JSON.parse(authDataString) as AuthData;

    return authData.token.accessToken;
  }

  export function getRoles() {
    const authDataString = localStorage.getItem(AUTH_DATA);

    if (!authDataString) {
      return [];
    }

    const authData = JSON.parse(authDataString) as AuthData;

    return authData.roles;
  }

  export function isAdmin() {
    return getRoles().includes("Admin");
  }

  export function isAuthor() {
    return getRoles().includes("Author");
  }
}
