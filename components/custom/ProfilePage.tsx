"use client";

import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/atoms/user";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  GraduationCap,
  Calendar,
  KeyRound,
  Bookmark,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ChangePasswordDialog from "./ChangePasswordDialog";

export default function ProfilePage() {
  const user = useRecoilValue(userAtom);
  const router = useRouter();
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const role = user.role?.toLowerCase() || "student";
  const roleBadgeColor =
    role === "admin"
      ? "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800"
      : role === "verifier"
      ? "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800"
      : "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700";

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Top Header & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>
      </div>

      {/* Profile Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-zinc-200 dark:border-zinc-700 shadow-md">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-black text-2xl">
                {getInitials(user.name || "U")}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {user.name}
                </h1>
                <span
                  className={`text-xs font-semibold uppercase px-2.5 py-0.5 rounded-full border ${roleBadgeColor}`}
                >
                  {user.role || "Student"}
                </span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                MCA • National Institute of Technology, Jamshedpur
              </p>
            </div>
          </div>

          <Button
            onClick={() => setPasswordDialogOpen(true)}
            className="self-start sm:self-center inline-flex items-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm"
          >
            <KeyRound className="h-4 w-4" />
            <span>Change Password</span>
          </Button>
        </div>

        {/* User Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-zinc-800/80 space-y-1">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
              <Mail className="h-3.5 w-3.5" />
              <span>Email</span>
            </div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              {user.email}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-zinc-800/80 space-y-1">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Registration No.</span>
            </div>
            <p className="text-sm font-semibold font-mono uppercase text-zinc-900 dark:text-zinc-100">
              {user.reg_no || "N/A"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-zinc-800/80 space-y-1">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
              <Calendar className="h-3.5 w-3.5" />
              <span>Batch Year</span>
            </div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Batch of {user.batch || "MCA"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-zinc-800/80 space-y-1">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              <span>Account Status</span>
            </div>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              Active
            </p>
          </div>
        </div>
      </motion.div>

      {/* Saved / Bookmarked Items Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Saved & Bookmarked Experiences
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Pin company experiences to quickly revisit questions before your interview rounds.
            </p>
          </div>
        </div>

        {/* Empty State Card */}
        <div className="bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700/80 rounded-2xl p-10 text-center space-y-4 shadow-sm">
          <div className="mx-auto p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 w-fit">
            <Bookmark className="h-8 w-8" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              No Bookmarked Experiences Yet
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              When you bookmark company experiences from the interview archive, they will be organized right here for fast, offline-ready preparation.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/allInterviews")}
            className="inline-flex items-center gap-2 text-xs font-semibold"
          >
            <span>Explore Interview Archive</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </motion.div>

      {/* Change Password Dialog Modal */}
      <ChangePasswordDialog
        open={passwordDialogOpen}
        onOpenChange={setPasswordDialogOpen}
      />
    </div>
  );
}
