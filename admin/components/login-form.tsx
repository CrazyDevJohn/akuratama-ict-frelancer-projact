"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useAuthStore } from "@/store/useAuth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import axios from "axios";
import { redirect, usePathname } from "next/navigation";
import useLoadingStore from "@/store/useLoadingStore";
import Link from "next/link";
import { InputOTPForm } from "./otp-form";

export function LoginForm({ className, ...props }: { className: string }) {
  const [isModelOpend, setIsModelOpend] = useState(false);
  // if (typeof window === "undefined") return;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { login, register } = useAuthStore();
  const { isLoading, setIsLoading } = useLoadingStore();

  const path = usePathname();
  const isSignUpRoute = path === "/signup";

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    setIsLoading(true);
    if (isSignUpRoute) {
      await register(email, password, name).finally(() => {
        setIsLoading(false);
        setIsModelOpend(true);
      });
    } else {
      await login(email, password).finally(() => {
        setIsLoading(false);
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>
            {isSignUpRoute ? "Create " : "Login to "} your account
          </CardTitle>
          <CardDescription>
            Enter your email below to {isSignUpRoute ? "create " : "login to "}
            your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {isSignUpRoute && (
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    onChange={(ev) => setName(ev.target.value)}
                  />
                </Field>
              )}

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(ev) => setEmail(ev.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(ev) => setPassword(ev.target.value)}
                />
                {!isSignUpRoute && (
                  <div className="flex items-center">
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                )}
              </Field>
              <Field>
                <Button type="submit">
                  {isSignUpRoute ? "Sign up" : "Login"}
                </Button>

                <FieldDescription className="text-center">
                  {isSignUpRoute
                    ? "Already have an account? "
                    : "Don't have an account? "}

                  <Link href={isSignUpRoute ? "/login" : "/signup"}>
                    {isSignUpRoute ? "Log In" : "Sign Up"}
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {isModelOpend && (
        <div className="w-full h-full bg-black/30 absolute top-0 left-0 right-0 bottom-0 z-20 flex justify-center items-center">
          <div
            onClick={() => setIsModelOpend(false)}
            className="w-full h-full absolute top-0 left-0 right-0 bottom-0"
          ></div>
          <div className="absolute z-20">
            <InputOTPForm />
          </div>
        </div>
      )}
    </div>
  );
}
