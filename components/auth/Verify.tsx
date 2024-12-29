/* eslint-disable react/no-unescaped-entities */

"use client";
import LoadingButton from "@/components/Helper/LoadingButton";
import { handleAuthRequest } from "@/components/utils/apiRequest";
import { BASE_API_URL } from "@/server";
import { setAuthUser } from "@/store/authSlice";
import { RootState } from "@/store/store";

import axios from "axios";
import { Loader, MailCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Verify = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.replace("/auth/signup");
    } else if (user && user.isVerified) {
      router.replace("/");
    } else {
      setIsPageLoading(false); // Stop loading once user status is determined
    }
  }, [user, router]);

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;

    // Check if the input is a number and has a length of 1
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value; // Update the value if it's valid
      setOtp(newOtp);
      // Move to the next input field if the value is filled
      if (value.length === 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ): void => {
    if (
      event.key === "Backspace" &&
      !inputRefs.current[index]?.value &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    const verifyRequest = async () =>
      await axios.post(
        `${BASE_API_URL}/users/verify`,
        { otp: otpValue },
        { withCredentials: true }
      );

    const result = await handleAuthRequest(verifyRequest, setIsLoading);

    if (result) {
      dispatch(setAuthUser(result.data.data.user));
      toast.success(result.data.message);
      router.push("/");
    }
  };

  const handleResendOtp = async () => {
    const resendRequest = async () =>
      await axios.post(`${BASE_API_URL}/users/resend-otp`, null, {
        withCredentials: true,
      });
    const result = await handleAuthRequest(resendRequest, setIsLoading);
    if (result) {
      toast.success(result.data.message);
    }
  };

  if (isPageLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader className="w-20 h-20 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col  items-center justify-center">
      <MailCheck className=" w-20 h-20 sm:w-32 sm:h-32 text-red-600 mb-12" />
      <h1 className=" text-2xl sm:text-3xl font-bold mb-3">OTP Verification</h1>
      <p className="mb-6 text-sm sm:text-base text-gray-600 font-medium">
        You have sent a code to {user?.email}
      </p>
      <div className="flex space-x-4">
        {[1, 2, 3, 4, 5, 6].map((index) => {
          return (
            <input
              type="number"
              key={index}
              maxLength={1}
              value={otp[index] || ""}
              onChange={(e) => handleChange(index, e)}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="sm:w-20 sm:h-20  w-10 h-10 rounded-lg bg-gray-200 text-lg sm:text-3xl font-bold outline-gray-500 text-center no-spinner"
            />
          );
        })}
      </div>
      <div className="flex items-center mt-4 space-x-2">
        <h1 className=" text-sm sm:text-lg font-medium text-gray-700">
          Didn't Get the Otp Code?
        </h1>
        <button
          onClick={handleResendOtp}
          className="text-sm sm:text-lg  font-medium text-blue-900 underline"
        >
          Resend Code
        </button>
      </div>

      <LoadingButton
        onClick={handleSubmit}
        size={"lg"}
        isLoading={isLoading}
        className="mt-6 w-52"
      >
        Verify
      </LoadingButton>
    </div>
  );
};

export default Verify;
