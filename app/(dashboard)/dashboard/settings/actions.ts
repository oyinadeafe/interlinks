"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/supabase/require-user";
import { createClient } from "@/lib/supabase/server";

export type SettingsState = { error?: string; success?: boolean };

export async function updateSettings(
  _prev: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const user = await requireUser();
  const supabase = await createClient();

  const display_name = (formData.get("display_name") as string)?.trim();
  const username = (formData.get("username") as string)?.trim().toLowerCase();

  if (!display_name) return { error: "Display name cannot be empty." };
  if (!username) return { error: "Username cannot be empty." };
  if (!/^[a-z0-9_]{3,30}$/.test(username)) {
    return {
      error:
        "Username must be 3–30 characters: lowercase letters, numbers, and underscores only.",
    };
  }

  // Check username is not already taken by someone else
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .neq("id", user.id)
    .maybeSingle();

  if (existing) return { error: "That username is already taken." };

  const { error } = await supabase
    .from("profiles")
    .update({ display_name, username })
    .eq("id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/settings");
  return { success: true };
}