"use client";
/* eslint-disable react/no-unescaped-entities */
import LoadingButton from "@/components/Helper/LoadingButton";
import PasswordInput from "@/components/auth/PasswordInput";
import { handleAuthRequest } from "@/components/utils/apiRequest";
import { BASE_API_URL } from "@/server";
import { setAuthUser } from "@/store/authSlice";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

// Data types of our form data
interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  // router for navigation and redirect
  const router = useRouter();
  //   Dispatch for redux
  const dispatch = useDispatch();
  // Define a state veriable for collect form data
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  //   Loading state veriable
  const [isLoading, setIsLoading] = useState(false);

  //   handle the input change and get them and save them in state
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //   backend request to signup
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // request function
    const loginRequest = async () =>
      await axios.post(`${BASE_API_URL}/users/login`, formData, {
        withCredentials: true,
      });
    //   get the response as result from handleAuthRequest Function
    const result = await handleAuthRequest(loginRequest, setIsLoading);
    // Check if result exist
    if (result) {
      // save data to redux
      dispatch(setAuthUser(result.data.data.user));
      //   toast message
      toast.success(result.data.message);
      //   redirect user to home page
      router.push("/feed");
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        <div className="lg:col-span-4 h-screen hidden lg:block">
          <Image
            src="/images/signup-banner.jpg"
            alt="signup"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="flex flex-col items-center justify-center h-screen col-span-3">
          <h1 className="font-bold text-2xl text-left uppercase mb-8">
            Login with <span className="text-rose-600"> PhotoFlow</span>
          </h1>
          <form
            onSubmit={handleSubmit}
            className="block w-[90%] sm:w-[80%] md:w-[60%] lg:w-[90%] xl:w-[80%]"
          >
            <div className="mb-4">
              <label htmlFor="email" className="font-semibold mb-2 block">
                Email Address
              </label>
              <input
                type="text"
                name="email"
                placeholder="Email address"
                className="px-4 py-3 bg-gray-200 rounded-lg w-full block outline-none"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <PasswordInput
                label="Password"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
              <Link
                href="/auth/forget-password"
                className="mt-2 text-red-600 block font-semibold text-base cursor-pointer text-right"
              >
                Forget Password?
              </Link>
            </div>

            <LoadingButton
              size="lg"
              className="w-full mt-3"
              isLoading={isLoading}
              type="submit"
            >
              Login Now
            </LoadingButton>
          </form>
          <h1 className="mt-4 text-lg  text-gray-800">
            Don't have any account ?{" "}
            <Link href="/auth/signup">
              <span className="text-blue-800 underline cursor-pointer font-medium">
                Signup here
              </span>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
