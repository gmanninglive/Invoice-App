import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

import { ObjectId } from "bson";

import { connectToDatabase } from "../../../db/mongodb";
import SideBar from "../../../components/sidebar/Sidebar";
import projection from "../../../utils/projection.json";
import NewInvoice from "../../../components/forms/NewInvoice";

const CustomerDetails = (props) => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { id } = router.query;
  const { customers, invoices } = props.properties[0];
  const { business_name } = props.properties[0].business;

  let newInvNo = invoices[0].inv_no + 1;
  console.log(props);


  if (!user) {
    return (
      <div style={{ color: "#555", textAlign: "center" }}>
        Please sign in to post
      </div>
    );
  }
  

  return (
    <div className="pb-20">
        <button
          className="absolute top-0 right-0 mx-auto rounded-xl border-2 py-2 px-4"
          type="button"
          onClick={() => router.back()}
        >
          Back
        </button>
        
        <h1>Add New Invoice</h1>
        <NewInvoice url={id} customers={customers} inv_no={newInvNo} />
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
        invoices: {
          $filter: {
            input: "$invoices",
            as: "invoice",
            cond: { $eq: ["$$invoice.inv_no", { $max: "$invoices.inv_no" }] },
          },
        },
      },
    },
  ])
  .toArray();
  const properties = JSON.parse(JSON.stringify(data));

  return {
    props: { properties },
  };
}
