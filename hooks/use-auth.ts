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
  const [loading, setLoading] = useState(true); // start as true

  useEffect(() => {
    const getMe = async () => {
      const getMeReq = async () =>
        axios.get(`${BASE_API_URL}/users/me`, { withCredentials: true });

      try {
        const result = await handleAuthRequest(getMeReq, setLoading);

        if (result?.data?.data?.user) {
          setUser(result.data.data.user);
        } else {
          setUser(null); // explicitly set null if not logged in
        }
      } catch (err) {
        console.log(err);

        setUser(null); // explicitly set null on error
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, []);
  console.log(user, loading);

  return { user, loading };
};
