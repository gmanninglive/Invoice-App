/* eslint-disable @next/next/no-html-link-for-pages */
import { useUser } from "@auth0/nextjs-auth0";

import MobileMenu from "../components/menu/MobileMenu";

export default function Layout({ children }) {
  const { user, isLoading } = useUser();

  if (!user)
    return (
      <div className="w-full h-screen grid place-items-center">
        <div>
          <h1>Easy Invoice</h1>

          <a href="/api/auth/login">Log In</a>
        </div>
      </div>
    );
  return (
    <>
      <div className="w-screen h-full flex justify-center ">
      <div className="absolute top-0 w-full bg-white p-10"></div>
        <div className="w-full lg:w-10/12 2xl:w-7/12 flex flex-wrap relative ">
          {children}
        </div>
        <MobileMenu user={user} id={user.sub.slice(6)} />
      </div>
    </>
  );
}
