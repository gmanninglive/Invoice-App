/* eslint-disable @next/next/no-html-link-for-pages */
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index(){
  // Login auth0 User
  const { user, isLoading } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user && !isLoading) {
      router.replace(`/dashboard/${user.sub.slice(6)}`);
    }
  }, [user, isLoading])

  return (
    <div className="w-full h-screen grid place-items-center">
          <div>
            <h1>Easy Invoice</h1>

            <a href="/api/auth/login">Log In</a>
          </div>
        </div>
  )
};


