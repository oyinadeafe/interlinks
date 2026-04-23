import type { Metadata } from "next";
import { requireUser } from "@/lib/supabase/require-user";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateSettings } from "./actions";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name")
    .eq("id", user.id)
    .single();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Account details and preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Update your username and display name.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Read-only email row */}
          <div className="mb-4 flex flex-col gap-1">
            <Label>Email</Label>
            <Input value={user.email ?? ""} disabled readOnly />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed here.
            </p>
          </div>

          {/* Editable form — calls updateSettings server action */}
          <form action={updateSettings.bind(null, {})} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="display_name">Display name</Label>
              <Input
                id="display_name"
                name="display_name"
                defaultValue={profile?.display_name ?? ""}
                placeholder="Your name"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="username">Username</Label>
              <div className="flex items-center gap-1">
                <span className="rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground">
                  interlinks.ng/
                </span>
                <Input
                  id="username"
                  name="username"
                  defaultValue={profile?.username ?? ""}
                  placeholder="yourhandle"
                  pattern="[a-z0-9_]{3,30}"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                3–30 characters. Lowercase letters, numbers, underscores only.
              </p>
            </div>

            <Button type="submit" className="self-start">
              Save changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}