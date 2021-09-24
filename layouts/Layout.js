/* eslint-disable @next/next/no-html-link-for-pages */
import { useUser } from "@auth0/nextjs-auth0";

import MobileMenu from "../components/menu/MobileMenu";

export default function Layout({ children }, props) {
  const { user, isLoading } = useUser();
  
  
  if (!user){
    return (
      <div className="w-full h-screen grid place-items-center">
        <div>
          <h1>Easy Invoice</h1>

          <a href="/api/auth/login">Log In</a>
        </div>
      </div>
    );
  }
  else if (children.props.properties && children.props.properties[1].type == "invoice"){
      return (
        <div className="max-w-screen">
        {children}
        </div>
      );
  }
  else {
    return (
      <>
        <div className="w-screen min-h-screen flex justify-center bg-gradient-to-bl from-blue-100 via-blue-300 to-blue-500">
        <div className="absolute top-0 w-full bg-white p-10 shadow-md"></div>
          <div className="w-full h-full lg:w-9/12 2xl:w-7/12 flex flex-col relative pb-20 px-2  ">
            {children}
          </div>
          <MobileMenu user={user} id={user.sub.slice(6)} />
        </div>
      </>
    );
  }
}
