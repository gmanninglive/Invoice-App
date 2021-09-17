/* eslint-disable @next/next/no-html-link-for-pages */
import { useUser } from "@auth0/nextjs-auth0";
import { ObjectId } from "bson";

import { connectToDatabase } from "../../lib/mongodb";
import SideBar from "../../components/sidebar/Sidebar";
import projection from '../../utils/projection.json'


const IndexId = ( props ) => {
  // Login auth0 User
  const { user, isLoading } = useUser();
  const { business_name }  = props.properties[0].business;
  
  return (
    <div className="w-full h-screen relative">
      {user ? (
        <div className="w-screen flex justify-end">
          <SideBar user={user} id={user.sub.slice(6)} business_name={business_name} />
          <div className="w-3/4 my-6 grid">
          <h1>This is the easy invoice Dashboard</h1>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen grid place-items-center">
          <div>
            <h1>Easy Invoice</h1>

            <a href="/api/auth/login">Log In</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexId;

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