"use client";

import {
  useReducer,
  useCallback,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import supabase from "@/core/supabase/supabase-client";
import type {
  AuthChangeEvent,
  RealtimeChannel,
  RealtimePresenceState,
  User,
} from "@supabase/supabase-js";

type UserStatus = {
  user: string;
  online_at: string;
};

type State = {
  loading: boolean;
  user: User;
  // profile: Profile;
  error: string;
  view: React.ReactNode;
};

type Actions = {
  setError: (x: string) => void;
  setView: (x: React.ReactNode) => void;
  actionSignOut: () => void;
};

export const AuthContext = createContext<[State, Actions]>([null, null]);
AuthContext.displayName = "AuthContext";

interface AuthProviderProps {
  defaultUser: User;
  // defaultProfile: Profile;
  children: ReactNode;
}

function reducer(
  state: State,
  { type, payload }: { type: string; payload: any },
) {
  return {
    ...state,
    [type]: payload,
  };
}

export const AuthProvider = ({
  defaultUser,
  //  defaultProfile,
  children,
}: AuthProviderProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    user: defaultUser,
    // profile: defaultProfile,
    error: "",
    view: "",
  });

  const setUser = (value: User) => dispatch({ type: "user", payload: value });
  // const setProfile = (value: Profile) =>
  //   dispatch({ type: "profile", payload: value });
  const setError = (value: string) =>
    dispatch({ type: "error", payload: value });
  const setView = (value: React.ReactNode) =>
    dispatch({ type: "view", payload: value });

  const actionSignOut = useCallback(async () => {
    const redirectUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL);
    redirectUrl.pathname = "/";
    redirectUrl.searchParams.set(`redirectTo`, pathName);
    await supabase.auth.signOut();
    router.replace(redirectUrl.toString());
    setUser(null);
    // setProfile(null);
  }, [pathName, router]);

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, currentSession) => {
        // console.log(currentSession);
        if (currentSession) {
          setUser(currentSession.user);
        } else {
          setUser(null);
        }
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const value = useMemo((): [State, Actions] => {
    return [
      state as State,
      {
        setError,
        setView,
        actionSignOut,
      },
    ];
  }, [state]); //eslint-disable-line

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
