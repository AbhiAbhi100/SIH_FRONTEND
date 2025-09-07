"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

/**
 * useProvideAuth - central auth hook
 *
 * Exposes:
 *  - user: object | null
 *  - token: string | null
 *  - initialized: boolean (true after initial localStorage read)
 *  - login(token, userObj)
 *  - logout()
 *  - setToken(token)  // updates localStorage + state
 *  - setUser(userObj) // updates localStorage + state
 */
function useProvideAuth() {
  const [user, setUserState] = useState(null);
  const [token, setTokenState] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // helpers to safely read/write localStorage
  const safeGet = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  };

  const safeSet = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // ignore (e.g. storage quota, private mode)
    }
  };

  const safeRemove = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {}
  };

  // local setters that keep localStorage in sync
  const setToken = useCallback((newToken) => {
    if (newToken == null) {
      safeRemove("token");
      setTokenState(null);
    } else {
      safeSet("token", newToken);
      setTokenState(newToken);
    }
  }, []);

  const setUser = useCallback((newUser) => {
    if (newUser == null) {
      safeRemove("user");
      setUserState(null);
    } else {
      try {
        safeSet("user", JSON.stringify(newUser));
      } catch (e) {
        // fallback: store as string
        safeSet("user", String(newUser));
      }
      setUserState(newUser);
    }
  }, []);

  // login / logout helpers
  const login = useCallback(
    (tokenValue, userObj) => {
      setToken(tokenValue);
      setUser(userObj ?? null);
    },
    [setToken, setUser]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, [setToken, setUser]);

  // initialize from localStorage once on mount
  useEffect(() => {
    try {
      const t = safeGet("token");
      const u = safeGet("user");
      if (t) setTokenState(t);
      if (u) {
        try {
          setUserState(JSON.parse(u));
        } catch {
          setUserState(u);
        }
      }
    } catch (e) {
      // ignore errors
    } finally {
      setInitialized(true);
    }

    // listen to storage events so auth stays in sync across tabs
    const onStorage = (e) => {
      if (!e) return;
      if (e.key === "token") {
        setTokenState(e.newValue);
      } else if (e.key === "user") {
        try {
          setUserState(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setUserState(e.newValue);
        }
      } else if (e.key === null) {
        // clear() was called
        setTokenState(null);
        setUserState(null);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  return {
    user,
    token,
    initialized,
    login,
    logout,
    setToken,
    setUser,
  };
}
