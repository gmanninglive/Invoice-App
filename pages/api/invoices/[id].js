import { connectToDatabase } from "../../../lib/mongodb";

// const mongodb = require("mongodb");
import { ObjectId } from "mongodb";

// TODO check if ObjectId required for new users
export default async function handler(req, res) {
  const { method } = req;

  const { db } = await connectToDatabase();

  // switch the methods
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