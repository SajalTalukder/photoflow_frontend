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
import { BASE_API_URL } from "@/server";

import axios from "axios";

import { MenuIcon } from "lucide-react";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAuthRequest } from "../utils/apiRequest";
import { setAuthUser } from "@/store/authSlice";

import { RootState } from "@/store/store";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const getAuthUser = async () => {
      const getAuthUserReq = async () =>
        await axios.get(`${BASE_API_URL}/users/me`, {
          withCredentials: true,
        });
      const result = await handleAuthRequest(getAuthUserReq);

      if (result) {
        dispatch(setAuthUser(result.data.data.user));
      }
    };
    getAuthUser();
  }, [dispatch]);

  if (!user) return redirect("/auth/login");
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

export default Home;
