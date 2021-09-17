import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

import { ObjectId } from "bson";

import { connectToDatabase } from "../../../lib/mongodb";
import SideBar from "../../../components/sidebar/Sidebar";

import EditInvoice from "../../../components/forms/EditInvoice";

const InvoiceDetails = (props) => {
  const { invoices, customers } = props.properties[0];
  const { business_name } = props.properties[0].business;
  
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { id, inv_id } = router.query;

  if (!user) {
    return (
      <div style={{ color: "#555", textAlign: "center" }}>
        Please sign in to post
      </div>
    );
  }

  return (
    <div className="w-screen flex justify-end">
      <SideBar
        user={user}
        id={id}
        business_name={business_name}
      />
      <button
        className="absolute top-6 right-6 mx-auto rounded-xl border-2 py-2 px-4"
        type="button"
        onClick={() => router.back()}
      >
        Back
      </button>
      <div className="w-3/4 my-12 pr-40 grid">
        <div className="flex items-center"></div>
        <h1>Edit Invoice</h1>
        <EditInvoice customers={customers} invoices={invoices} url={`${id}/${inv_id}`} />
      </div>
    </div>
  );
};

export default InvoiceDetails;

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const { id, inv_id } = context.query;
  console.log(context.query);
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
          invoices: {
            $filter: {
              input: "$invoices",
              as: "invoice",
              cond: { $eq: ["$$invoice.inv_id", inv_id] },
            },
          },
        },
      },
    ])
    .toArray();

  const properties = JSON.parse(JSON.stringify(data));
  console.log(properties);

  return {
    props: { properties },
  };
}
