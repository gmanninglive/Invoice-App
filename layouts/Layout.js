/* eslint-disable @next/next/no-html-link-for-pages */
import { useUser } from "@auth0/nextjs-auth0";
import Loader from "components/common/Loader";
import Footer from "components/footer/Footer";

import MobileMenu from "../components/menu/MobileMenu";

export default function Layout({ children }, props) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <Loader />;
  }
  if (!user) {
    return (
      <>
        <div className="w-screen min-h-screen flex justify-center bg-gradient-to-t from-indigo-800 to-gray-200 relative">
          <div className="w-full h-full lg:w-9/12 2xl:w-7/12 flex flex-col relative pb-48 ">
            {children}
          </div>
          <Footer />
        </div>
      </>
    );
  } 
  if (
    children.props.properties &&
    children.props.properties[1].type == "invoice"
  ) {
    return <div className="max-w-screen">{children}</div>;
  } 
  else {
    return (
      <>
        <div className="w-screen min-h-screen flex justify-center bg-gradient-to-t from-indigo-800 to-gray-200 ">
          <div className="absolute top-0 w-full bg-white p-10 shadow-md "></div>
          <div className="w-full h-full lg:w-9/12 2xl:w-7/12 flex flex-col relative pb-20 px-4 ">
            {children}
          </div>
          <MobileMenu user={user} id={user.sub.slice(6)} />
        </div>
      </>
    );
  }
}
