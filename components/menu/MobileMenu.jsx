import Link from "next/link";
import Image from "next/image";

import { FaRegFileAlt} from "react-icons/fa";
import { FiHome, FiSettings} from "react-icons/fi";
import {RiContactsBook2Line} from 'react-icons/ri'



// Calender
// Forms

export default function MobileMenu({ user, id, business_name }) {

  return (
            <ul className="w-full fixed bottom-0 inline-flex flex-ros-1 justify-evenly items-center p-6 border-t-2 text-blue-900 bg-white">
                <li>
              <Link href={`/dashboard/${id}`}>
                <a><FiHome size={24} /></a>
              </Link>
              </li>
              <li>
              <Link href={`/customers/${id}/all`}>
                <a><RiContactsBook2Line size={24} /></a>
              </Link>
              </li>
                <li>
              <Link href={`/invoices/${id}/all`}>
                <a><FaRegFileAlt size={24} /></a>
              </Link>
              </li>
              <li>
              <Link href={`/companydetails/${id}`}>
                <a><FiSettings size={24}/></a>
              </Link>
              </li>
              </ul>
      
  );
}


 {/* eslint-disable-next-line @next/next/no-html-link-for-pages*/}
{/* <a
            href="/api/auth/logout"
            className="absolute bottom-6 mx-auto rounded-xl border-2 py-2 px-4"
          >
            Log out
          </a> */}
