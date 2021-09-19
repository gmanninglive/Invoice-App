import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";
import { ObjectId } from "bson";
import Link from "next/link";

import { connectToDatabase } from "../../../db/mongodb";
import SideBar from "../../../components/sidebar/Sidebar";

import { getBgColor } from "../../../utils/format";

import { sortCustomers } from "../../../utils/sort";

const CustomerDetails = (props) => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { id } = router.query;
  const { customers } = props.properties[0];
  const { business_name } = props.properties[0].business;

  // State to sort customers by and change colour of selected sort term
  const [sortBy, setSortBy] = useState("first_name");
  const sortFirst =
    sortBy === "first_name" ? "border-blue-600" : "border-gray-200";
  const sortSur = sortBy === "sur_name" ? "border-blue-600" : "border-gray-200";

  // Call Sorting Function
  sortCustomers(sortBy, customers);

  if (!user) {
    return (
      <div style={{ color: "#555", textAlign: "center" }}>
        Please sign in to post
      </div>
    );
  }

  return (
    <div className="w-screen flex justify-center">
      <SideBar user={user} id={id} business_name={business_name} />
      <div className="w-full sm:w-7/12 my-8 grid relative">
        <div className="flex items-center justify-between">
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
        <div className="grid customer_list mt-6 text-center ">
          <button
            className={`border-b-4 ${sortFirst} `}
            type="button"
            onClick={() => setSortBy("first_name")}
          >
            Firstname
          </button>
          <button
            className={`border-b-4 ${sortSur}`}
            type="button"
            onClick={() => setSortBy("sur_name")}
          >
            Surname
          </button>
          <p className="">Address</p>
          <p>Postcode</p>
          <p>Email</p>
          <p>Phone</p>
        </div>
        {customers.map((customer, index) => {
          return (
            <div className={`${getBgColor(index, "bg-white")} py-6 grid customer_list text-center items-center `} key={customer.cust_id}>
             
                <p>{customer.first_name}</p>
                <p>{customer.sur_name}</p>
                <p>{customer.add_l1}</p>
                <p>{customer.postcode}</p>
                <p className="mr-2">{customer.email}</p>
                <p>{customer.landline || customer.mobile}</p>
                <p></p>
                
              

              <Link href={`/customers/${id}/${customer.cust_id}`}>
                <a className="w-20 rounded-xl border-2 py-2 px-4 text-center ">
                  Edit
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
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

  return {
    props: { properties },
  };
}
