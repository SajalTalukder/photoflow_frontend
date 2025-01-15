"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import { Bookmark, HeartIcon, Loader, MessageCircle, Send } from "lucide-react";
import DotButton from "../Helper/DotButton";
import Comment from "../Helper/Comment";
import axios from "axios";
import { BASE_API_URL } from "@/server";
import { handleAuthRequest } from "../utils/apiRequest";
import { addComment, likeOrDislikePost, setPosts } from "@/store/postSlice";
import { toast } from "sonner";
import { setAuthUser } from "@/store/authSlice";

const Feed = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const posts = useSelector((state: RootState) => state.posts.posts);
  const [comment, setComment] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // console.log(user?.savedPosts);

  // Get all the post
  useEffect(() => {
    const getAllPost = async () => {
      const getPostReq = async () => axios.get(`${BASE_API_URL}/posts/all`);
      const result = await handleAuthRequest(getPostReq, setIsLoading);

      if (result) {
        dispatch(setPosts(result.data.data.posts));
      }
    };
    getAllPost();
  }, [dispatch]);

  const handleLikeDislike = async (id: string) => {
    const result = await axios.post(
      `${BASE_API_URL}/posts/like-dislike/${id}`,
      {},
      { withCredentials: true }
    );

    if (result.data.status == "success") {
      if (user?._id) {
        dispatch(likeOrDislikePost({ postId: id, userId: user?._id }));
        toast.message(result.data.message);
      }
    }
  };

  const handleSaveUnsave = async (id: string) => {
    const result = await axios.post(
      `${BASE_API_URL}/posts/save-unsave-post/${id}`,
      {},
      { withCredentials: true }
    );

    if (result.data.status == "success") {
      dispatch(setAuthUser(result.data.data.user));
      toast.success(result.data.message);
    }
  };

  const addCommentHandler = async (id: string) => {
    if (!comment) return;
    const addCommentReq = async () =>
      await axios.post(
        `${BASE_API_URL}/posts/comment/${id}`,
        { text: comment },
        { withCredentials: true }
      );

    const result = await handleAuthRequest(addCommentReq);

    if (result?.data?.status === "success") {
      dispatch(addComment({ postId: id, comment: result?.data.data.comment }));
      toast.success("Comment Posted");
      setComment("");
    }
  };

  // Handling the loading
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col">
        <Loader className="animate-spin" />
      </div>
    );
  }

  // If there is no post to show
  if (posts.length < 1) {
    return (
      <div className="text-3xl m-8 text-center capitalize font-bold">
        No post to show
      </div>
    );
  }

  return (
    <>
      <div className="mt-20 w-[70%] mx-auto">
        {/* Main Post */}
        {posts.map((post) => {
          return (
            <div key={post._id} className="mt-8">
              <div className="flex items-center justify-between">
                {/* Users info */}
                <div className="flex items-center space-x-2">
                  <Avatar className="w-9 h-9">
                    <AvatarImage
                      src={post?.user?.profilePicture}
                      className="h-full w-full"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h1>{post?.user?.username}</h1>
                </div>
                <DotButton post={post} user={user} />
              </div>
              {/* image */}
              <div className=" mt-2">
                <Image
                  src={`${post.image?.url}`}
                  alt="post"
                  width={400}
                  height={400}
                  className="w-full"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <HeartIcon
                    className={`cursor-pointer ${
                      user?._id && post.likes.includes(user._id)
                        ? "text-red-500"
                        : ""
                    }`}
                    onClick={() => {
                      handleLikeDislike(post?._id);
                    }}
                  />
                  <MessageCircle className="cursor-pointer" />
                  <Send className="cursor-pointer" />
                </div>
                <Bookmark
                  className={`cursor-pointer ${
                    (user?.savedPosts as string[])?.some(
                      (savedPostId: string) => savedPostId === post._id
                    )
                      ? "text-red-500"
                      : ""
                  }`}
                  onClick={() => handleSaveUnsave(post._id)}
                />
              </div>
              <h1 className="mt-2 text-sm font-semibold">
                {post.likes.length} likes
              </h1>
              <p className="mt-2 font-medium">{post.caption}</p>
              <Comment user={user} post={post} />
              <div className="mt-2 flex items-center ">
                <input
                  type="text"
                  placeholder="Add a Comment.."
                  className="flex-1 placeholder:text-gray-800 outline-none "
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <p
                  role="button"
                  onClick={() => {
                    addCommentHandler(post._id);
                  }}
                  className="text-sm font-semibold text-blue-700 cursor-pointer"
                >
                  Post
                </p>
              </div>
              <div className="pb-6 border-b-2"></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Feed;
