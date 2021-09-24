import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { ObjectId } from "bson";

import Link from "next/link";

import { connectToDatabase } from "../../../db/mongodb";
import SideBar from "../../../components/sidebar/Sidebar";
import projection from "../../../utils/projection.json";
import { formatDate, formatPrice, getBgColor, daysDue } from "../../../utils/format";
import DropdownMenu from "components/common/Menu";
import InvoiceTabs from "components/common/InvoiceTabs";

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
  let overdue = [];
  for (let i = 0; i < invoices.length; i++) {
    if (daysDue(invoices[i].due_date).slice(0, 7) == "Overdue")
      overdue.push(invoices[i]);
  }

  return (
    <>
      <div className="pb-20 xl:pb-0 w-full">
        <div className="flex items-center justify-between bg-white py-4 px-2">
          <h1>Invoices</h1>
          <Link href={`/invoices/${id}/add`}>
            <a
              className="font-bold
            rounded-xl border-2 
            py-2 px-4 bg-gray-300 text-blue-700 
            hover:bg-green-300 shadow-md"
            >
              Add
            </a>
          </Link>
        </div>
        <InvoiceTabs invoices={invoices} id={id} overdue={overdue} />
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
    .find({ _id: ObjectId(id) })
    .project(projection)
    .toArray();

  const properties = JSON.parse(JSON.stringify(data));
  properties.push({"type": "page" });

  return {
    props: { properties },
  };
}
