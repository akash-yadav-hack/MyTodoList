import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navbar */}
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight">
            MyTodoList
          </Link>
          <div className="flex items-center gap-3">
            {session ? (
              <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Organize your day,{" "}
            <span className="text-primary">without the clutter.</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            A fast, focused to-do list built to help you capture tasks, stay on
            track, and get things done—backed by your own secure account.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {session ? (
              <Button size="lg" asChild>
                <Link href="/dashboard">Open My Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link href="/signup">Get Started Free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left">
          <Card>
            <CardHeader>
              <CardTitle>Fast &amp; Simple</CardTitle>
              <CardDescription>
                Add, complete, and organize tasks in seconds with a clean,
                distraction-free interface.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Secure by Default</CardTitle>
              <CardDescription>
                Your tasks are private to your account, protected with modern
                session-based authentication.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Reliable Storage</CardTitle>
              <CardDescription>
                Backed by PostgreSQL so your to-do list is always saved and ready
                whenever you return.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        Built with Next.js, PostgreSQL, Drizzle ORM, and Better Auth.
      </footer>
    </div>
  );
}
