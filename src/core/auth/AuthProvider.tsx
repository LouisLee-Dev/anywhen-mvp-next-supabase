"use client";

import {
  useReducer,
  useCallback,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import supabase from "@/core/supabase/supabase-client";
import type { AuthChangeEvent, User } from "@supabase/supabase-js";
import { ProfileInput } from "@/features/auth/schema";
import { getProfile } from "@/features/auth/actions";
import { toast } from "sonner";

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

type State = {
  loading: boolean;
  user: User;
  profile: ProfileInput;
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
  children: ReactNode;
}

function reducer(
  state: State,
  { type, payload }: { type: string; payload: any }
) {
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
  });

  const setUser = (value: User) => dispatch({ type: "user", payload: value });
  const setProfile = (value: ProfileInput) =>
    dispatch({ type: "profile", payload: value });
  const setLoading = (value: boolean) =>
    dispatch({ type: "loading", payload: value });
  const setError = (value: string) =>
    dispatch({ type: "error", payload: value });
  const setView = (value: React.ReactNode) =>
    dispatch({ type: "view", payload: value });

  const actionSignOut = useCallback(async () => {
    const redirectUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL);
    await supabase.auth.signOut();
    router.replace(redirectUrl.toString());
    setUser(null);
    setProfile(null);
    toast.success("You have been signed out.");
  }, [pathName, router]);

  useEffect(() => {
    (async () => {
      if (state?.user?.id) {
        const profile = await getProfile(state.user.id);
        setProfile(profile);
      }
    })();
  }, [state?.user?.id]);

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
      }
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
