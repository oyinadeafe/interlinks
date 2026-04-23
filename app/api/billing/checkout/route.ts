import { NextRequest, NextResponse } from "next/server"
import { requireUser } from "@/lib/supabase/require-user"
import { createClient } from "@/lib/supabase/server"
import { initializeTransaction, PLANS } from "@/lib/paystack"
import { PUBLIC_URL } from "@/lib/constants"

export async function POST(req: NextRequest) {
  const user = await requireUser()
  const supabase = await createClient()
  const { plan } = await req.json()

  const selectedPlan = PLANS[plan as keyof typeof PLANS]
  if (!selectedPlan) return NextResponse.json({ error: "Invalid plan" }, { status: 400 })

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single()

  if (profile?.plan !== "free") {
    return NextResponse.json({ error: "Already subscribed" }, { status: 400 })
  }

  const tx = await initializeTransaction({
    email: user.email!,
    amount: selectedPlan.amount_kobo,
    plan: selectedPlan.code,
    callback_url: `${PUBLIC_URL}/dashboard/billing?ref={PAYSTACK_REFERENCE}`,
    metadata: { user_id: user.id, plan: selectedPlan.code },
  })

  return NextResponse.json({ url: tx.authorization_url })
}