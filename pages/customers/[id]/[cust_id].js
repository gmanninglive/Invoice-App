import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

import { ObjectId } from "bson";

import { connectToDatabase } from "../../../db/mongodb";
import SideBar from "../../../components/sidebar/Sidebar";

import EditCustomer from "../../../components/forms/EditCustomer";

const CustomerDetails = (props) => {
  const { customers } = props.properties[0];
  const { business_name } = props.properties[0].business;
  
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { id, cust_id } = router.query;

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
        <div className="flex items-center"></div>
        <h1>Edit Customer</h1>
        <EditCustomer customers={customers} url={`${id}/${cust_id}`} />
      </div>
  );
};

export default CustomerDetails;

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const { id, cust_id } = context.query;
  const data = await db
    .collection("users")
    .aggregate([
      {
        $match: { _id: ObjectId(id) },
      },
      {
        $project: {
          business: 1,
          customers: {
            $filter: {
              input: "$customers",
              as: "customer",
              cond: { $eq: ["$$customer.cust_id", cust_id] },
            },
          },
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
