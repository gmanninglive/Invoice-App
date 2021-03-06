import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

import { ObjectId } from "bson";

import { connectToDatabase } from "db/mongodb";

import EditInvoice from "components/forms/EditInvoice";
import Head from "next/head";
import Header from "components/header/Header";

const InvoiceDetails = (props) => {
  const { invoices, customers } = props.properties[0];

  const router = useRouter();
  const { id, inv_id } = router.query;

  return (
    <>
      <Head>
        <title>Vie | The Invoicing App for Freelancers</title>
        <meta
          name="description"
          content="A free to use cloud based invoicing app for freelancers and small businesses"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Edit Invoice" back={true} />
      <EditInvoice
        customers={customers}
        invoices={invoices}
        url={`${id}/${inv_id}`}
      />
    </>
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
  properties.push({ type: "page" });

  return {
    props: { properties },
  };
}
