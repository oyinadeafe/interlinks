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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateAppearance } from "./actions";

export const metadata: Metadata = { title: "Appearance" };

export default async function AppearancePage() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, bio, avatar_url, theme")
    .eq("id", user.id)
    .single();

  const theme =
    (profile?.theme as { background?: string; foreground?: string } | null) ?? {};

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Appearance</h1>
        <p className="text-sm text-muted-foreground">
          Customise how your public page looks.
        </p>
      </div>

      <form action={updateAppearance} className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Photo, display name, and bio shown at the top of your page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-[160px_1fr]">
              <div className="space-y-4">
                <div className="flex h-36 w-36 items-center justify-center rounded-3xl border border-border/70 bg-muted/70 overflow-hidden">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Avatar preview
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Paste a public image URL here for now. Cloudflare R2 upload is coming soon.
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="avatar_url">Profile photo URL</Label>
                  <Input
                    id="avatar_url"
                    name="avatar_url"
                    type="url"
                    defaultValue={profile?.avatar_url ?? ""}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="display_name">Display name</Label>
                  <Input
                    id="display_name"
                    name="display_name"
                    defaultValue={profile?.display_name ?? ""}
                    placeholder="Your display name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Short bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    defaultValue={profile?.bio ?? ""}
                    placeholder="A sentence that describes you"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
            <CardDescription>
              Background colour or gradient.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-3xl border border-border/70 bg-muted/70 p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Preview</p>
              <div
                className="mt-4 rounded-3xl border border-border/70 px-4 py-8 text-center"
                style={{
                  background: theme.background || "#ffffff",
                  color: theme.foreground || "#000000",
                }}
              >
                <p className="text-sm font-semibold">Preview background</p>
                <p className="mt-2 text-xs">
                  Text and links on your public page will use this style.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="theme_background">Background</Label>
                <Input
                  id="theme_background"
                  name="theme_background"
                  defaultValue={theme.background ?? "#ffffff"}
                  placeholder="#ffffff or linear-gradient(...)"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="theme_foreground">Text colour</Label>
                <Input
                  id="theme_foreground"
                  name="theme_foreground"
                  type="color"
                  defaultValue={theme.foreground ?? "#000000"}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              You can enter a solid hex colour or a CSS gradient for the background.
            </p>
            <Button type="submit">Save appearance</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
