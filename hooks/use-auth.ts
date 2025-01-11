"use client";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/store/authSlice";
import { BASE_API_URL } from "@/server";
import { toast } from "sonner";
import { handleAuthRequest } from "@/components/utils/apiRequest";

export const useFollowUnfollow = () => {
  const dispatch = useDispatch();

  const handleFollowUnFollow = async (userId: string) => {
    const followUnfollowReq = async () =>
      await axios.post(
        `${BASE_API_URL}/users/follow-unfollow/${userId}`,
        {},
        { withCredentials: true }
      );

    const result = await handleAuthRequest(followUnfollowReq);

    if (result?.data.status === "success") {
      dispatch(setAuthUser(result.data.data.user));

      toast.success(result.data.message);
    }
  };

  return { handleFollowUnFollow };
};
