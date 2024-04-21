import createServerClient from "@/core/supabase/supabase-server";

export async function getCurrentUser() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
