"use client";
import { useUser } from "@/hooks/use-auth";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Redirect if loading done and user not admin or not logged in
    if (!loading) {
      if (!user) {
        router.replace("/"); // client-side redirect
      }
    }
  }, [user, loading, router]);

  // While loading, show spinner
  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center flex-col">
        <Loader className="w-12 h-12 animate-spin mb-4" />
      </div>
    );
  }

  // **Important**: only render dashboard if user exists AND role is admin
  if (!user) {
    router.replace("/"); // ensure redirect
    return null; // prevents rendering while redirect happens
  }

  return <div>{children}</div>;
}
