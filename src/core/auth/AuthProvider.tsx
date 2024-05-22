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
import { ProfileInput } from "@/features/auth/schema";
import { getCurrentProfile, getNotifications } from "./server";
import { toast } from "sonner";

export type Notification = {
  id: string;
  from: string;
  to: string;
  collection: string;
  type: string;
  title: string;
  message: string;
  data: any;
  link: string;
  viewed: boolean;
  created_at: Date;
  updated_at: Date;
};

type State = {
  loading: boolean;
  authenticated: boolean;
  user: User;
  profile: ProfileInput;
  error: string;
  view: React.ReactNode;
  notifications: Notification[];
};

type Actions = {
  setError: (x: string) => void;
  setProfile: (x: ProfileInput) => void;
  setView: (x: React.ReactNode) => void;
  setNotifications: (x: Notification[]) => void;
  actionSignOut: () => void;
};

export const AuthContext = createContext<[State, Actions]>([null, null]);
AuthContext.displayName = "AuthContext";

interface AuthProviderProps {
  defaultUser: User;
  defaultProfile: ProfileInput;
  children: ReactNode;
  notifications: Notification[];
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
  defaultProfile,
  children,
  notifications,
}: AuthProviderProps) => {
  const router = useRouter();
  const pathName = usePathname();

  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    authenticated: Boolean(defaultUser?.id),
    user: defaultUser,
    profile: defaultProfile,
    error: "",
    view: "",
    notifications,
  });

  const setUser = (value: User) => {
    dispatch({ type: "user", payload: value });
    dispatch({ type: "authenticated", payload: Boolean(value?.id) });
  };
  const setProfile = (value: ProfileInput) =>
    dispatch({ type: "profile", payload: value });
  const setError = (value: string) =>
    dispatch({ type: "error", payload: value });
  const setView = (value: React.ReactNode) =>
    dispatch({ type: "view", payload: value });
  const setNotifications = (value: Notification[]) =>
    dispatch({ type: "notifications", payload: value });

  const actionSignOut = useCallback(async () => {
    const redirectUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL);
    redirectUrl.pathname = "/";
    redirectUrl.searchParams.set(`redirectTo`, pathName);
    await supabase.auth.signOut();
    router.replace(redirectUrl.toString());
    setUser(null);
    setProfile(null);
    toast.success("You have been signed out");
  }, [pathName, router]);

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, currentSession) => {
        if (currentSession) {
          setUser(currentSession.user);
          const profile = await getCurrentProfile();
          const notifications = await getNotifications();

          setProfile(profile);
          setNotifications(notifications);
        } else {
          setUser(null);
          setProfile(null);
          setNotifications([]);
        }
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (state?.user?.id) {
      const channel = supabase
        .channel("notifications")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "notifications",
            filter: `to=eq.${state.user.id}`,
          },
          (payload: any) => {
            console.log(payload);
            if (payload.eventType === "INSERT") {
              setNotifications([payload.new, ...notifications]);
              toast.success(payload.new.message);
            } else if (payload.eventType === "UPDATE") {
              setNotifications(
                notifications.map((notification) =>
                  notification.id === payload.new.id
                    ? payload.new
                    : notification,
                ),
              );
            }
          },
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [state.user?.id, notifications]);

  const value = useMemo((): [State, Actions] => {
    return [
      state as State,
      {
        setError,
        setView,
        setProfile,
        setNotifications,
        actionSignOut,
      },
    ];
  }, [state]); //eslint-disable-line

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext<[State, Actions]>(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
