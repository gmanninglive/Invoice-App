import { connectToDatabase } from "../../../db/mongodb";

// const mongodb = require("mongodb");
import { ObjectId } from "mongodb";

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
      let customer_details = req.body;
      const { id } = req.query;
      const myquery = { _id: ObjectId(id) };
      const collection = db.collection("users");

      collection.updateOne(
        myquery,
        { $push: { customers: { $each: [customer_details] } } },
          (err, data) => {
          if ((err, data)) console.log(err);
          
          console.log("1 document updated");
          return res.send(data);
        }
      );
    }
  }
}
