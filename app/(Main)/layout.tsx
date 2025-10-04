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

  try {
    const res = await fetch(`${BASE_API_URL}/users/me`, {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("⛔ /me route failed:", res.status);
      redirect("/");
    }

    const data = await res.json();

    const user = data?.data?.user;

    if (!user) {
      redirect("/");
    }

    return <div>{children}</div>;
  } catch (err) {
    console.error("❌ Error while fetching user in layout:", err);
    redirect("/");
  }
}
