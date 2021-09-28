import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ObjectId } from "bson";
import Link from "next/link";
import {FiSearch} from 'react-icons/fi'

import { connectToDatabase } from "db/mongodb";
import { getBgColor } from "utils/format";

import Header from "components/header/Header";
import LinkButton from "components/common/LinkButton";

const CustomerDetails = (props) => {

  const router = useRouter();
  const [{ customers }, setCustomers] = useState(props.properties[0]);
  const { id } = router.query;

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

  return (
    <>
      
        <Header title={"Customers"} url={`/customers/${id}/add`} linkName="Add" />
        
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
                ${getBgColor(index, "bg-blue-900/20")} 
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
                  <LinkButton url={`/customers/${id}/${customer.cust_id}`} text="Edit" />
                </li>
              </ul>
            );
          })}
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
