/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import Image from "next/image";

import { FaRegFileAlt } from "react-icons/fa";
import { FiHome, FiSettings, FiLogOut } from "react-icons/fi";
import { RiContactsBook2Line } from "react-icons/ri";

// Calender
// Forms

export default function MobileMenu({ user, id, business_name }) {
  return (
    <div
      className="w-full fixed bottom-0 inline-flex justify-between items-center  
    xl:justify-start  xl:py-8 xl:flex-col xl:h-screen xl:justify-between xl:w-[fit-content] xl:left-0 
    p-4 border-t-2 text-blue-900 bg-white"
    >
      <ul className="w-full flex justify-evenly xl:flex-col xl:gap-y-6">
        <li>
          <Link href={`/dashboard/${id}`}>
            <a>
              <FiHome size={24} />
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/customers/${id}/all`}>
            <a>
              <RiContactsBook2Line size={24} />
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/invoices/${id}/all`}>
            <a>
              <FaRegFileAlt size={24} />
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/companydetails/${id}`}>
            <a>
              <FiSettings size={24} />
            </a>
          </Link>
        </li>
      </ul>
        <a href="/api/auth/logout">
          <FiLogOut size={24} />
        </a>
    </div>
  );
}

{
  /* eslint-disable-next-line @next/next/no-html-link-for-pages*/
}
