import Profile from "@/components/Profile/Profile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const ProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/auth/login");
  }
  const id = (await params).id;
  return <Profile id={id} />;
};

export default ProfilePage;
