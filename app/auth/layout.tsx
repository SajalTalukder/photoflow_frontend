import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | EventPro",
  description: "Login to access your dashboard",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
