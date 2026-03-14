"use client";
import { LoginForm } from "@/components/login-form";
import { InputOTPForm } from "@/components/otp-form";
import { useState } from "react";

export default function Auth() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm className="bg" />
      </div>
    </div>
  );
}
