/* eslint-disable @next/next/no-html-link-for-pages */

import { ObjectId } from "bson";

import { connectToDatabase } from "../../db/mongodb";
import SideBar from "../../components/sidebar/Sidebar";
import projection from "../../utils/projection.json";
import VerticalBar from "../../components/charts/Sales";
import LineChart from "../../components/charts/Outstanding";
import { Fragment } from "react";

const IndexId = (props) => {
  console.log(props);
  const { monthlySales } = props;

  function getBestMonth() {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let max = 0;
    let month;
    for (let i = 0; i < monthlySales.length; i++) {
      if (monthlySales[i].totalValue > max) {
        max = monthlySales[i].totalValue;
        month = monthlySales[i]._id;
      }
    }
    return months[month - 1];
  }

  return (
    <>
      <div className="inline-flex justify-start py-6">
        <h1>Dashboard</h1>
      </div>
      <div className="w-full my-6 grid bg-white rounded-xl">
        <div className="max-w-screen px-2 xl:w-1/2 xl:mx-auto">
          <VerticalBar sales={monthlySales} />
        </div>
        <div className="inline-flex justify-center items-center py-4 px-2">
          <h2>{`Your most profitable month is:
            ${monthlySales.length > 0
              ? getBestMonth()
              : "Start creating invoices to generate insights"}
            `}
          </h2>
        </div>
      </div>
    </>
  );
};

export default IndexId;

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const { id } = context.query;

  const montlySales = await db
    .collection("users")
    .aggregate([
      {
        $match: { _id: ObjectId(id) },
      },
      {
        $project: { invoices: 1 },
      },
      { $unwind: "$invoices" },
      {
        $group: {
          _id: { $month: { $toDate: "$invoices.inv_date" } },
          totalValue: {
            $sum: { $sum: "$invoices.total_due" },
          },
        },
      },
    ])
    .toArray();

  return {
    props: {
      monthlySales: JSON.parse(JSON.stringify(montlySales)),
    },
  };
}

{
  /* <SideBar
            user={user}
            id={user.sub.slice(6)}
            business_name={business_name}
          /> */
}
