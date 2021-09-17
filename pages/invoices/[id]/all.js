import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { useRef } from "react";
import { ObjectId } from "bson";

import Link from "next/link";

import { connectToDatabase } from "../../../lib/mongodb";
import SideBar from "../../../components/sidebar/Sidebar";
import projection from "../../../utils/projection.json";
import { formatPrice } from "../../../utils/format";
import GeneratePdf from "../../../components/GeneratePdf";

const CustomerDetails = (props) => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { id } = router.query;
  const { invoices, customers } = props.properties[0];
  const { business_name } = props.properties[0].business;
  
  if (!user) {
    return (
      <div style={{ color: "#555", textAlign: "center" }}>
        Please sign in to post
      </div>
    );
  }
  
  return (
    <div className="w-screen flex justify-end">
      <SideBar user={user} id={id} business_name={business_name} />
      <div className="w-3/4 my-6 pr-40 grid">
        <div className="flex items-center justify-between">
          <h1>Invoices</h1>
          <Link href={`/invoices/${id}/add`}>
            <a
              className="ml-10 font-bold
            rounded-xl border-2 
            py-2 px-4 bg-green-500 
            hover:bg-green-300"
            >
              Add
            </a>
          </Link>
        </div>
        {invoices ? (
          invoices.map((invoice) => {
            return (
              <div className="my-6 flex justify-between border-blue-900 border-2 rounded-md p-4" key={invoice.inv_id}>
                <div className="inline-flex">
                  <p>{invoice.cust_name}</p>
                  <p className="mx-4">{invoice.line_items[0]? invoice.line_items[0].line_name : ""}</p>
                <p>{invoice.line_items[0]? "£" + formatPrice(invoice.line_items[0].price): ""}</p>
                </div>
                <div>
                <Link href={`/invoices/${id}/${invoice.inv_id}/${true}/preview`}>
                  <a className="rounded-xl border-2 py-2 px-4 mx-2">Save</a>
                </Link>
                <Link href={`/invoices/${id}/${invoice.inv_id}/${false}/preview`}>
                  <a className="rounded-xl border-2 py-2 px-4 mx-2">View</a>
                </Link>
                <Link href={`/invoices/${id}/${invoice.inv_id}`}>
                  <a className="rounded-xl border-2 py-2 px-4">Edit</a>
                </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div>No invoices to display</div>
        )}
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
    .find({ _id: ObjectId(id) })
    .project(projection)
    .toArray();

  const properties = JSON.parse(JSON.stringify(data));

  return {
    props: { properties },
  };
}
