"use client";
import { BASE_API_URL } from "@/server";
import { setAuthUser } from "@/store/authSlice";
import axios from "axios";
import {
  Heart,
  HomeIcon,
  LogOutIcon,
  MessageCircle,
  Search,
  SquarePlus,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { RootState } from "@/store/store";
import CreatePostModal from "./CreatePostModal";

const LeftSideBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const SidebarLinks = [
    {
      icon: <HomeIcon />,
      label: "Home",
    },
    {
      icon: <Search />,
      label: "Search",
    },
    {
      icon: <MessageCircle />,
      label: "Message",
    },
    {
      icon: <Heart />,
      label: "Notification",
    },
    {
      icon: <SquarePlus />,
      label: "Create",
    },
    {
      icon: (
        <Avatar className="w-9 h-9">
          <AvatarImage src={user?.profilePicture} className="h-full w-full" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      label: "Profile",
    },
    {
      icon: <LogOutIcon />,
      label: "Logout",
    },
  ];

  const handleLogout = async () => {
    await axios.post(
      `${BASE_API_URL}/users/logout`,
      {},
      { withCredentials: true }
    );
    dispatch(setAuthUser(null));
    toast.success("Logout successfull");
    router.push("/auth/login");
  };

  const handleSideBar = (label: string) => {
    if (label === "Home") router.push("/");
    if (label === "Logout") handleLogout();
    if (label === "Profile") router.push(`/profile/${user?._id}`);
    if (label === "Create") setIsDialogOpen(true);
  };

  return (
    <div className=" h-full">
      <CreatePostModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <div className="lg:p-6 p-3 cursor-pointer">
        {/* LOGO */}
        <div
          onClick={() => {
            router.push("/");
          }}
        >
          <Image
            src="/images/logo.png"
            alt="logo"
            width={150}
            height={150}
            className="mt-[-2rem]"
          />
        </div>
        <div className="mt-6">
          {SidebarLinks.map((link) => {
            return (
              <div
                key={link.label}
                className="flex items-center mb-2 p-3 rounded-lg group  cursor-pointer transition-all duration-200 hover:bg-gray-100 space-x-2"
                onClick={() => {
                  handleSideBar(link.label);
                }}
              >
                <div className="group-hover:scale-110 transition-all duration-200">
                  {link.icon}
                </div>

                <p className="lg:text-lg text-base ">{link.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
