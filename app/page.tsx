// app/page.tsx (Server Component)
import Feed from "@/components/Home/Feed";
import LeftSideBar from "@/components/Home/LeftSideBar";
import RightSidebar from "@/components/Home/RightSidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BASE_API_URL } from "@/server";
import { User } from "@/types";
import axios from "axios";
import { MenuIcon } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getUser = async () => {
  try {
    // Extract cookies (from Next.js request context)
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value; // Extract token from cookies
    console.log(token);

    // Make Axios request with cookies manually added
    const res = await axios.get(`${BASE_API_URL}/users/me`, {
      headers: {
        Cookie: `token=${token}`, // Add the token to the Cookie header
      },
      withCredentials: true, // Ensure credentials are sent
    });

    return res.data.data.user;
  } catch (error) {
    return null;
  }
};

const HomePage = async () => {
  // Fetch the user on the server-side
  const user: User = await getUser();
  console.log(user);

  // Redirect if user is not found or unverified
  if (!user) {
    redirect("/auth/signup");
  }

  if (user && !user.isVerified) {
    redirect("/auth/verify");
  }

  // Return JSX for the hydrated page
  return (
    <div className="flex  ">
      <div className="w-[20%] hidden md:block border-r-2 h-screen fixed ">
        <LeftSideBar />
      </div>
      <div className="flex-1 md:ml-[20%] overflow-y-auto ">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <MenuIcon />
            </SheetTrigger>
            <SheetContent>
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
              <LeftSideBar />
            </SheetContent>
          </Sheet>
        </div>

        <Feed />
      </div>
      <div className="w-[30%] pt-8 px-6  lg:block hidden ">
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
