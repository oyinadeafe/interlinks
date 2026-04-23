export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold mb-6">Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
      <p className="mt-4">By using Interlinks you agree to use the service lawfully and not to abuse or spam other users. We reserve the right to suspend accounts that violate these terms.</p>
    </main>
  )
}