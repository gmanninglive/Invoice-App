import Link from "next/link";
import Image from "next/image";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { BiMenuAltLeft } from "react-icons/bi";
import { useSidebarContext } from "../../hooks/SidebarProvider";

// Calender
// Forms

export default function SideBar({ user, id, business_name }) {
  const { menuIsOpen, changeMenu } = useSidebarContext();
  let openClose = menuIsOpen ? "block" : "hidden";

  return (
    <div>
      <button
        onClick={changeMenu}
        className="absolute left-2 top-4 text-blue-900"
      >
        <FaArrowCircleRight size={32} />
      </button>
      <div
        className={`${openClose} 
        w-full md:w-1/6 h-screen 
        bg-blue-900 fixed left-0 
        top-0 bottom-0 z-100 text-white`}
      >
        <div className="flex-col justify-center items-center p-6">
          <div>
            <div className="flex justify-between mt-6">
              {business_name && <h3>{business_name}</h3>}
              <Image
                src={user.picture}
                alt="user profile picture"
                width="50px"
                height="50px"
                className="rounded-md"
              />
            </div>
            <div className="grid grid-cols-1 gap-y-6 mt-6">
              <Link href={`/dashboard/${id}`}>
                <a>Dashboard</a>
              </Link>

              <Link href={`/companydetails/${id}`}>
                <a>Business Details</a>
              </Link>

              <Link href={`/customers/${id}/all`}>
                <a>Customers</a>
              </Link>

              <Link href={`/invoices/${id}/all`}>
                <a>Invoices</a>
              </Link>
            </div>
          </div>
          <button
            className="text-white absolute top-2 right-2 sm:top-4 sm:-right-8 sm:text-blue-900"
            onClick={changeMenu}
          >
            <FaArrowCircleLeft size={32} />
          </button>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages*/}
          <a
            href="/api/auth/logout"
            className="absolute bottom-6 mx-auto rounded-xl border-2 py-2 px-4"
          >
            Log out
          </a>
        </div>
      </div>
    </div>
  );
}
