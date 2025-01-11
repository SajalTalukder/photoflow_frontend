"use client";
import LeftSideBar from "@/components/Home/LeftSideBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { handleAuthRequest } from "@/components/utils/apiRequest";
import { cn } from "@/lib/utils";
import { BASE_API_URL } from "@/server";
import { RootState } from "@/store/store";
import { User } from "@/types";
import axios from "axios";
import { Bookmark, Grid, Loader, MenuIcon } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import Save from "./Save";

import { useFollowUnfollow } from "../../hooks/use-auth";

type Props = {
  id: string;
};

const Profile = ({ id }: Props) => {
  const { handleFollowUnFollow } = useFollowUnfollow();
  const user = useSelector((state: RootState) => state?.auth.user);
  const [postOrSave, setPostOrSave] = useState<string>("POST");

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // console.log(userPost);

  const [userPofile, setUserProfile] = useState<User>();

  const isOwnProfile = user?._id === id;
  const isFollowing = user?.following.includes(id);

  useEffect(() => {
    if (!user) {
      return router.push("/auth/login");
    }

    const getUser = async () => {
      const getUserReq = async () =>
        await axios.get(`${BASE_API_URL}/users/profile/${id}`);
      const result = await handleAuthRequest(getUserReq, setIsLoading);

      if (result) {
        setUserProfile(result?.data?.data?.user);
      }
    };
    getUser();
  }, [id, router, user]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex  mb-20">
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
        <div className=" w-[90%] sm:w-[80%] mx-auto">
          {/* Top Profile */}
          <div className="mt-16 flex md:flex-row flex-col md:items-center pb-16 border-b-2 md:space-x-20">
            <Avatar className="w-[10rem] h-[10rem] mb-8 md:mb-0">
              <AvatarImage src={userPofile?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-8">
                <h1 className="text-2xl font-bold">{userPofile?.username}</h1>
                {isOwnProfile && (
                  <Link href="/edit-profile">
                    <Button variant={"secondary"}>Edit Profile</Button>
                  </Link>
                )}
                {!isOwnProfile && (
                  <Button
                    onClick={() => {
                      handleFollowUnFollow(id);
                    }}
                    variant={isFollowing ? "destructive" : "secondary"}
                  >
                    {isFollowing ? "UnFollow" : "Follow"}
                  </Button>
                )}
              </div>
              <div className="flex items-center space-x-8 mt-6 mb-6">
                <div>
                  <span className="font-bold">{userPofile?.posts.length}</span>
                  <span> Posts</span>
                </div>
                <div>
                  <span className="font-bold">
                    {userPofile?.followers.length}
                  </span>
                  <span> Followers</span>
                </div>
                <div>
                  <span className="font-bold">
                    {userPofile?.following.length}
                  </span>
                  <span> Following</span>
                </div>
              </div>
              <div>
                <p className="w-[80%] font-medium">{user?.bio}</p>
              </div>
            </div>
          </div>
          {/* Bottom Post and saved */}
          <div className="mt-10">
            <div className="flex items-center justify-center space-x-14">
              <div
                className={cn(
                  "flex items-center space-x-2 cursor-pointer",
                  postOrSave === "POST" && "text-blue-500 "
                )}
                onClick={() => setPostOrSave("POST")}
              >
                <Grid />
                <span className="font-semibold "> Post</span>
              </div>
              <div
                className={cn(
                  "flex items-center space-x-2 cursor-pointer",
                  postOrSave === "SAVE" && "text-blue-500 "
                )}
                onClick={() => setPostOrSave("SAVE")}
              >
                <Bookmark />
                <span className="font-semibold ">Saved</span>
              </div>
            </div>
            {postOrSave === "POST" && <Post userPofile={userPofile} />}
            {postOrSave === "SAVE" && <Save userPofile={userPofile} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
