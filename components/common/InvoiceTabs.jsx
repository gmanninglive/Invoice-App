import { useState } from "react";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import DropdownMenu from "./Menu";
import { getBgColor, daysDue, formatDate, formatPrice } from "../../utils/format";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function InvoiceTabs({ invoices, id, overdue}) {
  let [categories] = useState({
    All: invoices,
    Overdue: overdue,
  });
 
  return (
    <div className="w-full sm:px-0 bg-transparent ">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl shadow-md ">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                  // "focus:outline-none focus:ring-2  ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                  selected
                    ? "bg-white shadow-md"
                    : "text-blue-900 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2 bg-transparent shadow-md rounded-xl ">
          {Object.values(categories).map((contents, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                " rounded-xl bg-white",
                // "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
              )}
            >
              <ul>
                {contents.length > 0 ? (
                  contents.map((invoice, index) => {
                    return (
                      <li
                        className={`${getBgColor(
                          index,
                          "bg-blue-200 bg-opacity-50"
                        )} ${contents[index + 1] == undefined ? "rounded-b-xl" : ""} relative w-full inline-flex flex-wrap justify-between  py-6 items-center`}
                        key={invoice.inv_id}
                      >
                        <ul className=" w-full inline-flex flex-wrap justify-around">
                          <li className="w-1/2 grid grid-cols-2 gap-x-6 items-center">
                            <h3>Invoice No: </h3>
                            {`INV00${invoice.inv_no}`}

                            <h3>Customer</h3>
                            <p>{`${invoice.customer.first_name} ${invoice.customer.sur_name}`}</p>
                            <h3>Invoice Date</h3>
                            <p>{formatDate(invoice.inv_date)}</p>
                            <h3>Total</h3>
                            <p>{"£" + formatPrice(invoice.total_due)}</p>
                            <p></p>
                            <p
                              className={
                                daysDue(invoice.due_date).slice(0, 7) ==
                                "Overdue"
                                  ? "text-red-600 font-bold"
                                  : ""
                              }
                            >
                              {daysDue(invoice.due_date)}
                            </p>
                          </li>
                          <li className="grid items-center gap-y-6">
                            <Link
                              href={`/invoices/${id}/${invoice.inv_id}/false/preview`}
                            >
                              <a className="z-0 inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                View
                              </a>
                            </Link>

                            <DropdownMenu
                              edit={`/invoices/${id}/${invoice.inv_id}`}
                              save={`/invoices/${id}/${
                                invoice.inv_id
                              }/${true}/preview`}
                              user_id={id}
                              inv_id={invoice.inv_id}
                            />
                          </li>
                        </ul>
                      </li>
                    );
                  })
                ) : (
                  <div>No invoices to display</div>
                )}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
