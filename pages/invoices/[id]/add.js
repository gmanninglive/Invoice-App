import { useRouter } from "next/router";
import { ObjectId } from "bson";

import { connectToDatabase } from "db/mongodb";
import NewInvoice from "components/forms/NewInvoice";
import Header from "components/header/Header";


const CustomerDetails = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { customers, invoices } = props.properties[0];
  
  let newInvNo = invoices[0] != undefined ? invoices[0].inv_no + 1 : 1;
  console.log(props);

  return (
    <>
      <Header title="Add New Invoice" back={true} />
      <NewInvoice url={id} customers={customers} inv_no={newInvNo} />
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
  properties.push({ type: "page" });

  return {
    props: { properties },
  };
}
