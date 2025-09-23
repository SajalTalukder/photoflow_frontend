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

import { MenuIcon } from "lucide-react";

const Home = () => {
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
