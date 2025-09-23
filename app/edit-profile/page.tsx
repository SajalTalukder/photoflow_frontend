import EditProfile from "@/components/Profile/EditProfile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const EditProfilePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/auth/login");
  }
  return (
    <>
      <EditProfile />
    </>
  );
};

export default EditProfilePage;
