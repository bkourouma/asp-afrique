"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: string;
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    if (requiredRole) {
      const user = session.user as any;
      if (!user?.roles?.includes(requiredRole)) {
        router.push("/login");
        return;
      }
    }
  }, [session, status, router, requiredRole]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (requiredRole) {
    const user = session.user as any;
    if (!user?.roles?.includes(requiredRole)) {
      return null;
    }
  }

  return <>{children}</>;
}