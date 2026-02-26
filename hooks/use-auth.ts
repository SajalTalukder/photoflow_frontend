"use client";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/store/authSlice";
import { BASE_API_URL } from "@/server";
import { toast } from "sonner";
import { handleAuthRequest } from "@/components/utils/apiRequest";
import { useEffect, useState } from "react";
import { User } from "@/types";

export const useFollowUnfollow = () => {
  const dispatch = useDispatch();

  const handleFollowUnFollow = async (userId: string) => {
    const followUnfollowReq = async () =>
      await axios.post(
        `${BASE_API_URL}/users/follow-unfollow/${userId}`,
        {},
        { withCredentials: true },
      );

    const result = await handleAuthRequest(followUnfollowReq);

    if (result?.data.status === "success") {
      dispatch(setAuthUser(result.data.data.user));

      toast.success(result.data.message);
    }
  };

  return { handleFollowUnFollow };
};

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMe = async () => {
      try {
        const result = await axios.get(`${BASE_API_URL}/users/me`, {
          withCredentials: true,
        });

        setUser(result.data?.data?.user ?? null);
      } catch (error) {
        // 🔕 Completely silent
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, []);

  return { user, loading };
};
