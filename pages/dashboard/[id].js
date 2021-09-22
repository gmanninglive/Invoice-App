/* eslint-disable @next/next/no-html-link-for-pages */

import { ObjectId } from "bson";

import { connectToDatabase } from "../../db/mongodb";
import SideBar from "../../components/sidebar/Sidebar";
import projection from "../../utils/projection.json";
import VerticalBar from "../../components/charts/Sales";
import LineChart from "../../components/charts/Outstanding";
import { Fragment } from "react";

const IndexId = (props) => {
  const { business_name } = props.properties[0].business;

  
  return (
    <>
          <h1>This is the easy invoice Dashboard</h1>
          <div className="w-full my-6 flex">
            <div className="w-1/2 mr-4">
              <VerticalBar />
            </div>
            <div className="w-1/2">
              <LineChart />
            </div>
            </div>
    </>
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

{/* <SideBar
            user={user}
            id={user.sub.slice(6)}
            business_name={business_name}
          /> */}