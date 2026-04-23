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

export const metadata: Metadata = { title: "Analytics" };

export default async function AnalyticsPage() {
  const user = await requireUser();
  const supabase = await createClient();

  const since7d = new Date(Date.now() - 7 * 86_400_000).toISOString();
  const since30d = new Date(Date.now() - 30 * 86_400_000).toISOString();

  const [{ count: views }, { count: clicks }, { count: clicks30d }] =
    await Promise.all([
      supabase
        .from("link_click_events")
        .select("id", { count: "exact", head: true })
        .eq("profile_id", user.id)
        .eq("event_type", "page_view")
        .gte("created_at", since7d),
      supabase
        .from("link_click_events")
        .select("id", { count: "exact", head: true })
        .eq("profile_id", user.id)
        .eq("event_type", "link_click")
        .gte("created_at", since7d),
      supabase
        .from("link_click_events")
        .select("id", { count: "exact", head: true })
        .eq("profile_id", user.id)
        .eq("event_type", "link_click")
        .gte("created_at", since30d),
    ]);

  const stats = [
    { label: "Page views (7d)", value: views ?? 0 },
    { label: "Link clicks (7d)", value: clicks ?? 0 },
    { label: "Link clicks (30d)", value: clicks30d ?? 0 },
    { label: "Avg clicks/day", value: Math.round((clicks30d ?? 0) / 30) },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          How your page is performing across platforms and devices.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Per-link breakdown</CardTitle>
          <CardDescription>
            Clicks by link over the last 30 days.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Connect your Supabase project to see live data here. Events are
            tracked via the <code>link_click_events</code> table.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}