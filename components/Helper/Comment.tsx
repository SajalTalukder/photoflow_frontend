import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import DotButton from "./DotButton";
import { Post, User } from "@/types";
import { Button } from "../ui/button";

type Props = {
  user: User | null;
  post: Post | null;
};

const Comment = ({ user, post }: Props) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <p className="mt-2 text-sm font-semibold">
            View All {post?.comments.length} Comment
          </p>
        </DialogTrigger>
        <DialogContent className="max-w-5xl p-0 gap-0 flex flex-col">
          <DialogTitle></DialogTitle>
          <div className="flex flex-1">
            <div className="sm:w-1/2 hidden max-h-[80vh] sm:block">
              <Image
                src={`${post?.image?.url}`}
                alt="post_img"
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>
            <div className="w-full sm:w-1/2 flex flex-col justify-between">
              <div className="flex items-center mt-8 justify-between p-4">
                <div className="flex gap-3 items-center">
                  <Avatar>
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-semibold text-xs">{user?.username}</p>
                    {/* <span className='text-gray-600 text-sm'>Bio here...</span> */}
                  </div>
                </div>

                <DotButton user={user} post={post} />
              </div>
              <hr />
              <div className="flex-1 overflow-y-auto max-h-96 p-4">
                {post?.comments.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="flex mb-4 gap-3 items-center"
                    >
                      <Avatar>
                        <AvatarImage src={item?.user?.profilePicture} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-semibold text-xs">{item.text}</p>
                        {/* <span className='text-gray-600 text-sm'>Bio here...</span> */}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    // value={text}
                    // onChange={changeEventHandler}
                    placeholder="Add a comment..."
                    className="w-full outline-none border text-sm border-gray-300 p-2 rounded"
                  />
                  <Button
                    // disabled={!text.trim()}
                    // onClick={sendMessageHandler}
                    variant="outline"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Comment;
