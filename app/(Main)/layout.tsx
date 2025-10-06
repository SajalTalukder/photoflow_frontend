import { BASE_API_URL } from "@/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies(); // ✅ await this
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.log("⛔ No token. Redirecting to /login");
    redirect("/");
  }

  console.log("🔐 Token found in cookies:", token);

  try {
    const res = await fetch(`${BASE_API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("⛔ /me route failed:", res.status);
      redirect("/");
    }

    const data = await res.json();

    const user = data?.data?.user;
    console.log("✅ User fetched successfully:", user);

    if (!user) {
      redirect("/");
    }

    return <div>{children}</div>;
  } catch (err) {
    console.error("❌ Error while fetching user in layout:", err);
    redirect("/");
  }
}
