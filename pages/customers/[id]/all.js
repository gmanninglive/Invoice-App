import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { useState, useEffect } from "react";
import { ObjectId } from "bson";
import Link from "next/link";
import {FiSearch} from 'react-icons/fi'

import { connectToDatabase } from "../../../db/mongodb";
import SideBar from "../../../components/sidebar/Sidebar";

import { getBgColor } from "../../../utils/format";

import { sortCustomers } from "../../../utils/sort";

const CustomerDetails = (props) => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [{ customers }, setCustomers] = useState(props.properties[0]);
  const { id } = router.query;

  console.log(props.properties[0]);

  // State to sort customers by and change colour of selected sort term
  const [sortBy, setSortBy] = useState("first_name");
  const sortFirst =
    sortBy.slice(0, 5) === "first" ? "border-blue-600" : "border-gray-200";
  const sortSur =
    sortBy.slice(0, 3) === "sur" ? "border-blue-600" : "border-gray-200";

  // Sorting handlers
  function handleSortByFirst() {
    if (sortBy == "first_nameASC") setSortBy("first_nameDESC");
    else setSortBy("first_nameASC");
  }
  function handleSortBySur() {
    if (sortBy == "sur_nameASC") setSortBy("sur_nameDESC");
    else setSortBy("sur_nameASC");
  }

  // Call Sorting Function
  sortCustomers(sortBy, customers);

  // Async Search function
  async function handleSearch(e) {
    e.preventDefault();
    const body = {
      cust_name: e.target.search.value,
    };

    const res = await fetch(`/api/customers/${id}/all`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    let customers = [];

    if (data.length > 0) {
      customers.push(data[0].customers);
      setCustomers({ customers });
    } else setCustomers(props.properties[0]);
  }

  if (!user) {
    return (
      <div style={{ color: "#555", textAlign: "center" }}>
        Please sign in to post
      </div>
    );
  }

  return (
    <>
      <div className="w-full pb-20 px-2">
        <div className="flex items-center justify-between py-6">
          <h1>Customers</h1>

          <Link href={`/customers/${id}/add`}>
            <a
              className="ml-10 font-bold
            rounded-xl border-2 
            py-2 px-6 bg-green-500 
            hover:bg-green-300"
            >
              Add
            </a>
          </Link>
        </div>
        <div className="w-full p-1 bg-blue-900/20 rounded-xl shadow-md ">
          <form onSubmit={handleSearch} className="relative">
            <input
              name="search"
              type="text"
              placeholder="Search"
              className="bg-white rounded-xl focus:outline-none w-full"
            />
            <button type="submit" className="absolute right-2 top-2 bottom-2"><FiSearch size="24"/></button>
          </form>
        </div>
        <div className="my-2 bg-white rounded-xl shadow-md">
          {customers.map((customer, index) => {
            return (
              <ul
                className={`w-full inline-flex flex-wrap justify-between items-center
                py-6 px-6
                ${getBgColor(index, "bg-blue-100")} 
                ${customers[index + 1] == undefined ? "rounded-b-xl" : ""} `}
                key={customer.cust_id}
              >
                <li className="grid grid-cols-1">
                  <p className="font-bold ">{`${customer.first_name} ${customer.sur_name}`}</p>
                  <p>{customer.add_l1}</p>
                  <p>{customer.add_l2}</p>
                  <p>{customer.add_l3}</p> 
                  <p>{customer.postcode}</p>
                  <p>{customer.email}</p>
                  <p>{customer.landline}</p>
                  <p>{customer.mobile}</p>
                </li>

                <li className="flex-col justify-center">
                  <Link href={`/customers/${id}/${customer.cust_id}`}>
                    <a className="rounded-xl border-2 py-2 px-4 text-center m-0 bg-white">
                      Edit
                    </a>
                  </Link>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const { id } = context.query;

  const data = await db
    .collection("users")
    .aggregate([
      {
        $match: { _id: ObjectId(id) },
      },
      {
        $project: {
          business: 1,
          customers: 1,
        },
      },
    ])
    .toArray();

  const properties = JSON.parse(JSON.stringify(data));
  properties.push({"type": "page" })

  return {
    props: { properties },
  };
}
