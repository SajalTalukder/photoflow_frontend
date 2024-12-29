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

type Props = {
  post: Post | null;
  user: User | null;
};

const DotButton = ({ post, user }: Props) => {
  const isOwnPost = post?.user?._id === user?._id;

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <DotsHorizontalIcon className="w-8 h-8 text-black" />
        </DialogTrigger>
        <DialogContent>
          <DialogTitle></DialogTitle>
          <div className="space-y-4 flex flex-col w-fit justify-center items-center mx-auto">
            <Button variant={"destructive"}>Unfollow</Button>
            <Button variant={"secondary"}>Save this Post</Button>
            <Link href={`/profile/${post?.user?._id}`}>
              <Button variant={"secondary"}>About This Account</Button>
            </Link>

            {isOwnPost && <Button variant={"destructive"}>Delete Post</Button>}
            <DialogClose>Cancel</DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DotButton;
