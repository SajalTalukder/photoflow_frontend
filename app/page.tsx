import Home from "@/components/Home/Home";

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

const HomePage = async () => {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("token")?.value;

  // if (!token) {
  //   redirect("/auth/login");
  // }

  return (
    <>
      <Home />
    </>
  );
};

export default HomePage;
