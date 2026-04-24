"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/supabase/require-user";
import { createClient } from "@/lib/supabase/server";

export async function updateAppearance(formData: FormData): Promise<void> {
  const user = await requireUser();
  const supabase = await createClient();

  const display_name = String(formData.get("display_name") ?? "").trim() || null;
  const bio = String(formData.get("bio") ?? "").trim() || null;
  const avatar_url = String(formData.get("avatar_url") ?? "").trim() || null;
  const theme_background = String(formData.get("theme_background") ?? "").trim() || null;
  const theme_foreground = String(formData.get("theme_foreground") ?? "").trim() || null;

  const theme = {
    background: theme_background || "#ffffff",
    foreground: theme_foreground || "#000000",
  };

  const { error } = await supabase
    .from("profiles")
    .update({ display_name, bio, avatar_url, theme })
    .eq("id", user.id);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/appearance");
}
