"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { userAtom } from "@/atoms/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronDown,
  LayoutDashboard,
  User as UserIcon,
  KeyRound,
  ShieldCheck,
  LogOut,
  Sparkles,
} from "lucide-react";
import axios from "axios";
import { successnotify, errornotify } from "@/lib/notifications";
import ChangePasswordDialog from "./ChangePasswordDialog";

interface ProfileDropdownProps {
  align?: "left" | "right";
  className?: string;
}

export default function ProfileDropdown({
  align = "right",
  className = "",
}: ProfileDropdownProps) {
  const [user, setUser] = useRecoilState(userAtom);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setIsOpen(false);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/logout`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.status === "success") {
        localStorage.removeItem("user");
        setUser(null);
        successnotify("Logged out successfully");
        router.push("/");
      }
    } catch (err) {
      console.error("Logout failed", err);
      errornotify("Failed to log out");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const role = user.role?.toLowerCase() || "student";
  const roleBadgeColor =
    role === "admin"
      ? "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800"
      : role === "verifier"
      ? "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800"
      : "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700";

  return (
    <>
      <div className={`relative ${className}`} ref={dropdownRef}>
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-3 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 cursor-pointer"
          aria-expanded={isOpen}
          aria-label="User profile menu"
        >
          <div className="text-right hidden sm:block max-w-[240px] md:max-w-[320px]">
            <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-tight truncate">
              {user.name}
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 capitalize truncate mt-0.5 font-medium">
              {user.role || "Student"}
            </p>
          </div>

          <Avatar className="h-8 w-8 sm:h-9 sm:w-9 border border-zinc-200 dark:border-zinc-700 shrink-0">
            <AvatarImage src="" />
            <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold text-xs sm:text-sm">
              {getInitials(user.name || "U")}
            </AvatarFallback>
          </Avatar>

          <ChevronDown
            className={`h-4 w-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={`absolute top-full mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl z-50 overflow-hidden ${
                align === "right" ? "right-0" : "left-0"
              }`}
            >
              {/* User Header Summary */}
              <div className="p-4 bg-zinc-50/60 dark:bg-zinc-900/40 border-b border-zinc-100 dark:border-zinc-800/80">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 border border-zinc-200 dark:border-zinc-700 shrink-0">
                    <AvatarFallback className="bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold text-sm">
                      {getInitials(user.name || "U")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden flex-1 min-w-0">
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      {user.email}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                      <span
                        className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${roleBadgeColor}`}
                      >
                        {user.role || "student"}
                      </span>
                      {user.reg_no && (
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                          {user.reg_no}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Actions */}
              <div className="p-1.5 space-y-0.5">
                {/* View Profile */}
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/dashboard/profile");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <UserIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                  <span>View Profile</span>
                </button>

                {/* Dashboard */}
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/dashboard");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                  <span>Dashboard</span>
                </button>

                {/* Reset / Change Password */}
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setPasswordDialogOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <KeyRound className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                  <span>Change Password</span>
                </button>

                {/* Admin Panel (if Admin) */}
                {role === "admin" && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/dashboard/admin");
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      <span>Admin Control Center</span>
                    </div>
                    <Sparkles className="h-3 w-3 text-indigo-500 animate-pulse" />
                  </button>
                )}
              </div>

              {/* Divider & Logout */}
              <div className="p-1.5 border-t border-zinc-100 dark:border-zinc-800/80">
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                >
                  <LogOut className="h-4 w-4 text-red-500" />
                  <span>{isLoggingOut ? "Logging out..." : "Log Out"}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Change Password Dialog Modal */}
      <ChangePasswordDialog
        open={passwordDialogOpen}
        onOpenChange={setPasswordDialogOpen}
      />
    </>
  );
}
