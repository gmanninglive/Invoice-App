import { useState } from 'react'
import { Tab } from '@headlessui/react'
import Link from'next/link'
import DropdownMenu from './Menu'
import { getBgColor, daysDue, formatDate } from '../../utils/format'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function InvoiceTabs({ invoices, id }) {
  let [categories] = useState({
    All: invoices,
    Overdue: {}
  })
console.log(categories.All)
  return (
    <div className="w-full px-2 py-6 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((contents, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'bg-white rounded-xl',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
              )}
            >
            <ul className="rounded-xl">
            
        {contents.length>0 ? (
                contents.map((invoice, index) => {
            return (
              <li className={`${getBgColor(index, "bg-gray-200")} relative w-full inline-flex flex-wrap justify-between  py-6 items-center`} key={invoice.inv_id}>
                <ul className="w-full inline-flex flex-wrap justify-around">
                <li className="w-1/2 grid grid-cols-2 gap-x-6 items-center">
                  <h3>Invoice No: </h3>{`INV00${invoice.inv_no}`}
                  
                  <h3>Customer</h3><p>{`${invoice.customer.first_name} ${invoice.customer.sur_name}`}</p>
                  <h3>Invoice Date</h3><p>{formatDate(invoice.inv_date)}</p>
                  <h3>Total</h3><p>{"£" + invoice.total_due}</p>
                  <p></p><p className={daysDue(invoice.due_date).slice(0, 7)== "Overdue"? "text-red-600 font-bold" : ""}>{daysDue(invoice.due_date)}</p>
                  </li>
                <li className="grid items-center gap-y-6">
                <Link href={`/invoices/${id}/${invoice.inv_id}/false/preview`}>
                  <a className="z-0 inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">View</a>
                </Link>
                
                <DropdownMenu edit={`/invoices/${id}/${invoice.inv_id}`} save={`/invoices/${id}/${invoice.inv_id}/${true}/preview`} className="" />
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
  )
}
