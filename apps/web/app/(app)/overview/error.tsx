"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

export default function OverviewError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <AlertTriangle className="size-12 text-destructive" />
          <CardTitle className="text-xl">Something went wrong</CardTitle>
        </CardHeader>
        {error.message && (
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </CardContent>
        )}
        <CardFooter className="justify-center gap-2">
          <Button onClick={reset} variant="default">
            Try again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/overview">Go home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
