"use client";
import { userAtom } from "@/atoms/user";
import { dismiss, errornotify, successnotify } from "@/lib/notifications";
import { cn } from "@/lib/utils";
import { loginSchema } from "@/schema/loginSchema";
import { User } from "@/types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { z } from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type logInData = z.infer<typeof loginSchema>;

const onSubmit = async (
  data: logInData,
  router: ReturnType<typeof useRouter>,
  setUser: ReturnType<typeof useSetRecoilState<User>>
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/login`,
      {
        email: data.email,
        password: data.password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dismiss();
    const user = response.data.data.user;
    setUser(user);
    if (response.data.status === "success") {
      successnotify("Logged In Successfully");
      router.push("/dashboard");
    } else {
      errornotify(response.data.message);
    }
  } catch (error) {
    console.log(error);
    dismiss();
    errornotify("Failed to Login");
  }
};

export default function Login() {
  const setUser = useSetRecoilState(userAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<logInData>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="max-w-md w-full mx-auto rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl bg-white dark:bg-zinc-900">
      <h2 className="font-bold text-2xl text-zinc-900 text-center dark:text-zinc-100 tracking-tight">
        Login to your account
      </h2>
      <form
        className="my-8"
        onSubmit={handleSubmit((data) => onSubmit(data, router, setUser))}
      >
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">College Mail ID</Label>
          <Input
            id="email"
            placeholder="2022pgcsca001@nitjsr.ac.in"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="*********"
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400"
            style={{ top: "50%", transform: "translateY(-50%)" }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-2"
          type="submit"
        >
          Log In &rarr;
          <BottomGradient />
        </button>

        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2.5 text-center">
          <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            Pre-registered Accounts (Batches 2025 &amp; 2026)
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Your default password is your Roll Number in uppercase.
          </p>
          <div className="inline-block px-3.5 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/70 text-[11px] text-zinc-600 dark:text-zinc-300 font-mono text-left space-y-1">
            <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400">
              Example Format:
            </div>
            <div>
              <span className="text-zinc-400 font-sans">Example Email:</span>{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">2025pgcsca002@nitjsr.ac.in</span>
            </div>
            <div>
              <span className="text-zinc-400 font-sans">Example Password:</span>{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">2025PGCSCA002</span>
            </div>
          </div>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
            Once logged in, you can change your password anytime from your profile dropdown.
          </p>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
