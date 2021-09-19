import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { ObjectId } from "bson";

import Link from "next/link";

import { connectToDatabase } from "../../../db/mongodb";
import SideBar from "../../../components/sidebar/Sidebar";
import projection from "../../../utils/projection.json";
import { formatDate, formatPrice } from "../../../utils/format";


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

  function getBgColor(index){
    if(index % 2 === 0) return "bg-white"
  }
  
  return (
    <div className="w-screen flex justify-center">
      <SideBar user={user} id={id} business_name={business_name} />
      <div className="w-full sm:w-7/12 my-8 grid">
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
        <div className="mt-6">
        {invoices ? (
          invoices.map((invoice, index) => {
            return (
              <div className={`${getBgColor(index)}  flex justify-between border-blue-900 py-6 px-4`} key={invoice.inv_id}>
                <div className="inline-flex gap-x-4">
                  <p>{invoice.inv_no}</p>
                  <p>{formatDate(invoice.inv_date)}</p>
                  <p>{formatDate(invoice.due_date)}</p>
                  <p>{`${invoice.customer.first_name} ${invoice.customer.sur_name}`}</p>
                  <p>{invoice.line_items[0]? invoice.line_items[0].line_name : ""}</p>
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
