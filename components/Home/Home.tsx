"use client";

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
// import { BASE_API_URL } from "@/server";

// import axios from "axios";

import { Loader, MenuIcon } from "lucide-react";

// import { redirect } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { handleAuthRequest } from "../utils/apiRequest";
// import { setAuthUser } from "@/store/authSlice";

// import { RootState } from "@/store/store";

const Home = () => {
  // const dispatch = useDispatch();
  // const user = useSelector((state: RootState) => state.auth.user);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const getAuthUser = async () => {
  //     const getAuthUserReq = async () =>
  //       await axios.get(`${BASE_API_URL}/users/me`, {
  //         withCredentials: true,
  //       });
  //     const result = await handleAuthRequest(getAuthUserReq, setIsLoading);

  //     if (result) {
  //       dispatch(setAuthUser(result.data.data.user));
  //     }
  //   };
  //   getAuthUser();
  // }, [dispatch]);

  // useEffect(() => {
  //   console.log("USER inside USEEFFECT", user);
  //   if (!user) return redirect("/auth/login");
  // }, [user]);

  // console.log("USER OUTSIDE USEEFFECT", user);

  // if (isLoading) {
  //   return (
  //     <div className="w-full h-screen flex items-center justify-center flex-col">
  //       <Loader className="animate-spin" />
  //     </div>
  //   );
  // }

  return (
    <div className="flex  ">
      <div className="w-[20%] hidden md:block border-r-2 h-screen fixed ">
        <LeftSideBar />
      </div>
      <div className="flex-1 md:ml-[20%] overflow-y-auto ">
        <div className="md:hidden">
          <Sheet>
            <div className="flex items-center justify-between">
              <SheetTrigger>
                <MenuIcon />
              </SheetTrigger>
            </div>

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

export default Home;
