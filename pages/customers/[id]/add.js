import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

import { ObjectId } from "bson";

import { connectToDatabase } from "../../../lib/mongodb";
import SideBar from "../../../components/sidebar/Sidebar";

import projection from "../../../utils/projection.json";
import NewCustomer from "../../../components/forms/NewCustomer";

const CustomerDetails = (props) => {
  const { user, isLoading } = useUser();

  const router = useRouter();
  const { id } = router.query;

  const { business_name } = props.properties[0].business;

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
        <h1>Add Customer</h1>
        <NewCustomer url={id} />
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