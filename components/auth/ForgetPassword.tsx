"use client";
import { KeySquareIcon } from "lucide-react";
import React, { useState } from "react";

import axios from "axios";
import { BASE_API_URL } from "@/server";
import { handleAuthRequest } from "../utils/apiRequest";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoadingButton from "../Helper/LoadingButton";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  //   backend request to signup
  const handleSubmit = async () => {
    // request function
    const forgetPassReq = async () =>
      await axios.post(
        `${BASE_API_URL}/users/forget-password`,
        { email },
        {
          withCredentials: true,
        }
      );
    //   get the response as result from handleAuthRequest Function
    const result = await handleAuthRequest(forgetPassReq, setIsLoading);
    // Check if result exist
    if (result) {
      toast.success(result.data.message);
      //   redirect user to home page
      router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col w-full h-screen">
      <KeySquareIcon className=" w-20 h-20 sm:w-32 sm:h-32 text-red-600 mb-12" />
      <h1 className=" text-2xl sm:text-3xl font-bold mb-3">
        Forget your password?
      </h1>
      <p className="mb-6 text-sm sm:text-base text-center text-gray-600 font-medium">
        Enter your email and we will help you to reset your password
      </p>
      <input
        type="text"
        placeholder="Enter email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        className="px-6 py-3.5 rounded-lg outline-none bg-gray-200 block w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] mx-auto"
      />
      <LoadingButton
        className="w-40 mt-4"
        size={"lg"}
        onClick={handleSubmit}
        isLoading={isLoading}
      >
        Continue
      </LoadingButton>
    </div>
  );
};

export default ForgetPassword;
