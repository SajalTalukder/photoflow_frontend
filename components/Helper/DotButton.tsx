"use client";
import React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Post, User } from "@/types";
import Link from "next/link";
import axios from "axios";
import { BASE_API_URL } from "@/server";
import { deletePost } from "@/store/postSlice";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";

import { handleAuthRequest } from "../utils/apiRequest";
import { useFollowUnfollow } from "../../hooks/use-auth";

type Props = {
  post: Post | null;
  user: User | null;
};

const DotButton = ({ post, user }: Props) => {
  const { handleFollowUnFollow } = useFollowUnfollow();
  const isOwnPost = post?.user?._id === user?._id;
  const isFollowing = post?.user?._id
    ? user?.following.includes(post.user._id)
    : false;
  console.log("IS FOLLOWING", isFollowing);
  console.log("USER", user);

  const dispatch = useDispatch();

  const handleDeletePost = async () => {
    const deletePostReq = async () =>
      await axios.delete(`${BASE_API_URL}/posts/delete-post/${post?._id}`, {
        withCredentials: true,
      });

    const result = await handleAuthRequest(deletePostReq);

    if (result?.data.status === "success") {
      if (post?._id) {
        dispatch(deletePost(post._id));
        toast.success(result.data.message);
        redirect("/");
      }
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <DotsHorizontalIcon className="w-8 h-8 text-black" />
        </DialogTrigger>
        <DialogContent>
          <DialogTitle></DialogTitle>
          <div className="space-y-4 flex flex-col w-fit justify-center items-center mx-auto">
            {!isOwnPost && (
              <div>
                <Button
                  variant={isFollowing ? "destructive" : "secondary"}
                  onClick={() => {
                    if (post?.user?._id) handleFollowUnFollow(post.user._id);
                  }}
                >
                  {isFollowing ? "UnFollow" : "Follow"}
                </Button>
              </div>
            )}

            <Link href={`/profile/${post?.user?._id}`}>
              <Button variant={"secondary"}>About This Account</Button>
            </Link>

            {isOwnPost && (
              <Button variant={"destructive"} onClick={handleDeletePost}>
                Delete Post
              </Button>
            )}
            <DialogClose>Cancel</DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DotButton;
