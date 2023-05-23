import axios from "axios";
import { AuthData } from "../types/Auth";

export namespace Auth {
    const AUTH_DATA = 'authData';

    export function login(authData: AuthData) {
        localStorage.setItem(AUTH_DATA, JSON.stringify(authData));
        axios.defaults.headers.common = { 'Authorization': `Bearer ${authData.token.accessToken}` }
    }

    export function logout() {
        localStorage.removeItem(AUTH_DATA);
        delete axios.defaults.headers.common["Authorization"];
    }

    export function isAuthed() {
        const authDataString = localStorage.getItem(AUTH_DATA);

        if (!authDataString) {
            return false;
        }

        const authData = JSON.parse(authDataString) as AuthData;

        return new Date(authData.token.expiry) > new Date();
    }

    export function getRoles() {
        const authDataString = localStorage.getItem(AUTH_DATA);

        if (!authDataString) {
            return [];
        }

        const authData = JSON.parse(authDataString) as AuthData;

        return authData.roles;
    }

    export function isGlobalAdmin() {
        return getRoles().includes("Global Admin");
    }
}