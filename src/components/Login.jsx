import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/authentiation";
import { login as authSliceLogin } from "../slices/authentication/authSlice";
import { useForm } from "react-hook-form";
import { Button, Input } from "./index";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  // using useForm method that is from react-hook-form
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    setError("");

    try {   
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        // console.log(userData);
        if (userData) dispatch(authSliceLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex  flex-col max-w-md w-2/5 mt-2 rounded-lg sm:p-10 max-sm:p-5 max-sm:w-2/3    dark:bg-gray-900 dark:text-gray-100 bg-gray-50 text-gray-800  ">

      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold text-violet-600">Sign in</h1>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <p className="text-sm dark:text-gray-400 text-gray-400 ">
          Sign in to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit(login)} className="space-y-12">

        <div className="space-y-4">
          
          <div className="w-full">
            
            <label for="email" className="block mb-2 text-sm">
              Email address
            </label>

            <Input
              className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
          </div>

          <div>
            <label for="password" className="text-sm">
              Password
            </label>
            <Input
              className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <Button
              type="submit"
              className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 bg-violet-600  dark:text-gray-900"
            >
              Sign in
            </Button>
          </div>

          <p className="px-6 text-sm text-center dark:text-gray-400 text-gray-400">
            Don&apos;t have any account?&nbsp;
            <Link to="/signup" className="hover:underline dark:text-violet-600 text-violet-600 ">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
