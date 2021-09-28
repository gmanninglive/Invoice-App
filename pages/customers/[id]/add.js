import { useRouter } from "next/router";
import { ObjectId } from "bson";

import { connectToDatabase } from "db/mongodb";

import projection from "utils/projection.json";
import NewCustomer from "components/forms/NewCustomer";
import Header from "components/header/Header";

const CustomerDetails = (props) => {

  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Header title="Add Customer" back={true} />
      <NewCustomer url={id} />
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
