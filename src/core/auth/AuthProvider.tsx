"use client";

import { useReducer, useCallback, createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import supabase from "@/core/supabase/supabase-client";
import type { AuthChangeEvent, RealtimeChannel, RealtimePresenceState, User } from "@supabase/supabase-js";
import { Profile } from "@/schemas";
import { getCurrentProfile } from "@/lib/api/profile";
import updateLastSignIn from "./updateLastSignIn";

export const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  DELETED: "deleted",
  BANNED: "banned",
};

export const VIEWS = {
  SIGN_IN: "sign_in",
  SIGN_UP: "sign_up",
  FORGOTTEN_PASSWORD: "forgotten_password",
  MAGIC_LINK: "magic_link",
  UPDATE_PASSWORD: "update_password",
};

type UserStatus = {
  user: string;
  online_at: string;
};

type State = {
  loading: boolean;
  user: User;
  profile: Profile;
  error: string;
  view: React.ReactNode;
  activeUsers: UserStatus[];
};

type Actions = {
  setError: (x: string) => void;
  setView: (x: React.ReactNode) => void;
  actionSignOut: () => void;
};

export const AuthContext = createContext<[State, Actions]>([null, null]);
AuthContext.displayName = "AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

function reducer(state: State, { type, payload }: { type: string; payload: any }) {
  return {
    ...state,
    [type]: payload,
  };
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    user: null,
    profile: null,
    error: "",
    view: "",
    activeUsers: [],
  });

  const setUser = (value: User) => dispatch({ type: "user", payload: value });
  const setProfile = (value: Profile) => dispatch({ type: "profile", payload: value });
  const setLoading = (value: boolean) => dispatch({ type: "loading", payload: value });
  const setError = (value: string) => dispatch({ type: "error", payload: value });
  const setView = (value: React.ReactNode) => dispatch({ type: "view", payload: value });
  const setActiveUsers = (value: any[]) => dispatch({ type: "activeUsers", payload: value });

  const actionSignOut = useCallback(async () => {
    const redirectUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL);
    redirectUrl.pathname = "/auth/";
    redirectUrl.searchParams.set(`redirectTo`, pathName);

    await supabase.auth.signOut();
    router.replace(redirectUrl.toString());
    setUser(null);
    setProfile(null);
  }, [pathName, router]);

  const logActivity = useCallback(async () => {
    if (!state.user?.id) return;
    await fetch(`/api/users/log`, {
      method: "POST",
      body: JSON.stringify({ user_id: state.user.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [state.user]);

  const handleSync = useCallback((state: RealtimePresenceState) => {
    setActiveUsers(
      Object.values(state)
        .map((t) => (t.length > 0 ? t[0] : null))
        .filter((t) => Boolean(t))
    );
  }, []);

  // Log User Activity every minute
  useEffect(() => {
    if (!state.user?.id) return;
    const timer = setInterval(async () => {
      await logActivity();
    }, 60 * 1000);
    (async () => {
      await updateLastSignIn();
    })();
    const handleUnload = async () => {
      await logActivity();
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      clearInterval(timer);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [logActivity, state?.user]);

  useEffect(() => {
    (async () => {
      if (state?.user?.id) {
        const profile = await getCurrentProfile();
        setProfile(profile);
      }
    })();
  }, [state?.user?.id]);

  useEffect(() => {
    if (state.user) {
      const channel: RealtimeChannel = supabase.channel("active-user");
      channel
        .on("presence", { event: "sync" }, () => {
          const state: RealtimePresenceState = channel.presenceState();
          handleSync(state);
        })
        .subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            await channel.track({
              user: state.user.id,
              online_at: new Date().toISOString(),
            });
          }
        });

      return () => {
        channel.unsubscribe();
      };
    } else {
      setActiveUsers([]);
    }
  }, [state.user, handleSync]);

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, currentSession) => {
      // console.log(currentSession);
      if (currentSession) {
        setUser(currentSession.user);
      } else {
        setUser(null);
      }
      // if (event === EVENTS.SIGNED_IN) {
      //   const status = currentSession?.user.user_metadata.status;
      //   if (status === STATUS.ACTIVE || status === undefined) {
      //     setError("");
      //   } else {
      //     if (status === STATUS.INACTIVE) setError("This account is inactive.");
      //     if (status === STATUS.DELETED) setError("This account was deleted.");
      //     if (status === STATUS.BANNED) setError("This account was banned.");
      //     await supabase.auth.signOut();
      //     return false;
      //   }
      // }
      // setSession(currentSession);
      // setUser(currentSession?.user ?? null);
      // switch (event) {
      //   case EVENTS.PASSWORD_RECOVERY:
      //     setView(VIEWS.UPDATE_PASSWORD);
      //     break;
      //   case EVENTS.SIGNED_OUT:
      //   case EVENTS.USER_UPDATED:
      //     setView(VIEWS.SIGN_IN);
      //     break;
      //   default:
      // }
    });

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
