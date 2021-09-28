/* eslint-disable @next/next/no-html-link-for-pages */

import { ObjectId } from "bson";

import { connectToDatabase } from "db/mongodb";
import VerticalBar from "components/charts/Sales";
import Header from "components/header/Header";

const IndexId = (props) => {
  // console.log(props);
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
      <Header title="Dashboard" />
      <div className="w-full mt-2 grid bg-white rounded-xl">
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
    let properties = [];
    properties.push({})
    properties.push({"type": "page" })

  return {
    props: {
      monthlySales: JSON.parse(JSON.stringify(montlySales)),
      properties,
    },
  };
}
