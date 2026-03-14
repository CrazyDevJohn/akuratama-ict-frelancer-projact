"use client";
import { InputOTPForm } from "@/components/otp-form";
import { useAuthStore } from "@/store/useAuth";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  const { checkAuth, user } = useAuthStore();
  useEffect(() => {
    checkAuth();
    if (user) redirect("/");
  }, [checkAuth, user]);

  return <>{children}</>;
}

export default AuthLayout;
