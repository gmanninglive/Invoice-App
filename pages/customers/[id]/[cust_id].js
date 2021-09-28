import { useRouter } from "next/router";
import { ObjectId } from "bson";

import { connectToDatabase } from "db/mongodb";

import EditCustomer from "components/forms/EditCustomer";
import Header from "components/header/Header";

const CustomerDetails = (props) => {
  const { customers } = props.properties[0];
  const router = useRouter();
  const { id, cust_id } = router.query;

  return (
    <>
      <Header title="Edit Customer" back={true} />
      <EditCustomer customers={customers} url={`${id}/${cust_id}`} />
    </>
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
  properties.push({ type: "page" });

  return {
    props: { properties },
  };
}
