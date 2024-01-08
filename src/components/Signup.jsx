import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/authentiation";
import { login as authSliceLogin } from "../slices/authentication/authSlice";
import { Button, Input } from "./index";

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");

    try {
      const userData = await authService.createAccount(data);

      if (userData) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(authSliceLogin({userData}));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex  flex-col max-w-md w-2/5 mt-2 rounded-lg sm:p-10 max-sm:p-5 max-sm:w-2/3     dark:bg-gray-900 dark:text-gray-100 bg-gray-50 text-gray-800  ">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold text-violet-600">Sign up</h1>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <p className="text-sm dark:text-gray-400">Sign up to create account</p>
      </div>

      <form onSubmit={handleSubmit(create)} className="space-y-12">
        <div className="space-y-4">
          <div className="w-full">
            <label for="email" className="block mb-2 text-sm">
              Name
            </label>
            <Input
              className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              placeholder="Enter your name"
              {...register("name", {
                required: true,
              })}
            />
          </div>

          <div className="w-full">
            <label for="email" className="block mb-2 text-sm">
              Email address
            </label>

            <Input
              className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
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
              className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 bg-violet-600 text-gray-900  dark:text-gray-900"
            >
              Create Account
            </Button>
          </div>

          <p className="px-6 text-sm text-center dark:text-gray-400">
            Already have an account?&nbsp;
            <Link to="/login" className="hover:underline dark:text-violet-400 text-violet-600">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
