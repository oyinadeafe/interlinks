export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
      <p className="mt-4">Interlinks collects minimal data to operate the service including your email address, profile information, and link click analytics. We do not sell your data to third parties.</p>
    </main>
  )
}