/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
export default function Footer() {
  return (
    <>
      <div
        className="absolute bottom-0 
        w-full lg:w-9/12 2xl:w-7/12
             text-gray-100
             py-6 px-4
            flex justify-between items-end"
      >
        <ul>
          <li>
            <a
              href="https://github.com/gmanninglive/Invoice-App"
              className="hover:text-pink-400"
            >
              Github
            </a>
          </li>
          <li>
            <Link href="/faq">
              <a className="hover:text-pink-400">FAQ</a>
            </Link>
          </li>
          <li>
            <a href="/api/auth/login" className="hover:text-pink-400">
              Log in
            </a>
          </li>
        </ul>
        <ul className="flex flex-col items-end">
          <li>Vie 2021.</li>
          <li>Made with ❤️ by George Manning.</li>
        </ul>
      </div>
    </>
  );
}
