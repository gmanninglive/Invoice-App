import { useRouter } from "next/router";
import { ObjectId } from "bson";

import { connectToDatabase } from "db/mongodb";
import Header from "components/header/Header";
import projection from "utils/projection.json";
import { daysDue } from "utils/format";
import InvoiceTabs from "components/invoices/InvoiceTabs";

const CustomerDetails = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { invoices } = props.properties[0];

  let overdue = [];
  for (let i = 0; i < invoices.length; i++) {
    if (daysDue(invoices[i].due_date).slice(0, 7) == "Overdue")
      overdue.push(invoices[i]);
  }

  return (
    <>
      <Header title="Invoices" url={`/invoices/${id}/add`} linkName="Add" />

      <InvoiceTabs invoices={invoices} id={id} overdue={overdue} />
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
  properties.push({ type: "page" });

  return {
    props: { properties },
  };
}
