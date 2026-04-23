"use server"
import { revalidatePath } from "next/cache"
import { requireUser } from "@/lib/supabase/require-user"
import { createClient } from "@/lib/supabase/server"

export async function updateSettings(_prev: { error?: string }, formData: FormData) {
  const user = await requireUser()
  const supabase = await createClient()
  const display_name = formData.get("display_name") as string
  const { error } = await supabase
    .from("profiles")
    .update({ display_name })
    .eq("id", user.id)
  if (error) return { error: error.message }
  revalidatePath("/dashboard/settings")
  return {}
}