import { connectToDatabase } from "../../../db/mongodb";

import { ObjectId } from "bson";

export default async function handler(req, res) {
  const { method } = req;

  const { db } = await connectToDatabase();

  // Switch the methods
  switch (method) {
    case "GET": {
      
    }
    case "POST": {
    }

    case "PUT": {
      let invoice_details = req.body;
      const { id } = req.query;
      const myquery = { _id: ObjectId(id) };
      const collection = db.collection("users");

      collection.updateOne(
        myquery,
        { $push: { invoices: { $each: [invoice_details] } } },
          (err, data) => {
          if ((err, data)) console.log(err);
          
          console.log("1 document updated");
          return res.send(data);
        }
      );
      break;
    }
  }
}