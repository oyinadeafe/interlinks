import type { Metadata } from "next";
import { requireUser } from "@/lib/supabase/require-user";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FREE_PLAN_LINK_LIMIT } from "@/lib/constants";
import { AddLinkDialog } from "./add-link-dialog";
import { toggleLink, deleteLink } from "./actions";
import { EditLinkDialog } from "./edit-link-dialog";
import { Eye, EyeOff, Edit3, Trash2 } from "lucide-react";

export const metadata: Metadata = { title: "Links" };

export default async function LinksPage() {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();

  const { data: links } = await supabase
    .from("links")
    .select("id, title, url, is_enabled, position, click_count")
    .eq("profile_id", user.id)
    .order("position", { ascending: true });

  const linkCount = links?.length ?? 0;
  const isFree = profile?.plan === "free";
  const atLimit = isFree && linkCount >= FREE_PLAN_LINK_LIMIT;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Your links</h1>
          <p className="text-sm text-muted-foreground">
            {isFree
              ? `${linkCount} / ${FREE_PLAN_LINK_LIMIT} links on the free plan`
              : `${linkCount} links`}
          </p>
        </div>
        <AddLinkDialog disabled={atLimit} />
      </div>

      {/* TODO: swap for the interactive drag-and-drop list once reorder is wired. */}
      {linkCount === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <p className="font-medium">No links yet</p>
            <p className="text-sm text-muted-foreground">
              Add your first link so your audience has somewhere to land.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-2">
          {links!.map((link) => (
            <Card key={link.id}>
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{link.title}</span>
                  <span className="text-xs text-muted-foreground">{link.url}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-border/70 bg-muted/70 px-2 py-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                    {link.is_enabled ? "Enabled" : "Disabled"}
                  </span>
                  <span className="text-xs text-muted-foreground">{link.click_count} clicks</span>
                  <EditLinkDialog id={link.id} title={link.title} url={link.url} />
                  <form action={toggleLink.bind(null, link.id, !link.is_enabled)}>
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={link.is_enabled ? "Disable link" : "Enable link"}
                    >
                      {link.is_enabled ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </form>
                  <form action={deleteLink.bind(null, link.id)}>
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon-sm"
                      className="text-destructive"
                      aria-label="Delete link"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
