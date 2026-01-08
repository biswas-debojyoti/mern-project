import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

const tokenFromStorage = localStorage.getItem("token");

let userFromToken = null;

if (tokenFromStorage) {
  try {
    userFromToken = jwtDecode(tokenFromStorage);
  } catch (err) {
    userFromToken = null;
  }
}

export const useAuthStore = create((set) => ({
  token: tokenFromStorage,
  user: userFromToken, // { id, role, iat, exp }
  isAuthenticated: !!tokenFromStorage,

  login: (token) => {
    const decoded = jwtDecode(token);

    localStorage.setItem("token", token);

    set({
      token,
      user: decoded,
      isAuthenticated: true
    });
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      token: null,
      user: null,
      isAuthenticated: false
    });
  }
}));
