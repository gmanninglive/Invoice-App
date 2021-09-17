import { connectToDatabase } from "../../../lib/mongodb";

// const mongodb = require("mongodb");
import { ObjectId } from 'mongodb';


// TODO check if ObjectId required for new users
export default async function handler(req, res) {
  const {
    method,
  } = req;

  const { db } = await connectToDatabase();
  

  // switch the methods
  switch (method) {
    case "GET": {
        // const { id } = req.query;

        // const data = await db.collection("business_details").find({user_id: id}).toArray();
        
        // return res.status(200).send(data);
        
    }
    // TODO Find matching id insert business details
    case "POST": {
        
    }

    case "PUT": {
      let business_details = req.body;
      const { id } = req.query;
      const myquery = {_id: ObjectId(id)};
      const collection = db.collection("users");
      
     collection.updateOne(
        myquery,
        {$set: business_details}, { multi: false, runValidators: true, omitUndefined: true }, (err, res) => {
          if (err) console.log(err);
          console.log("1 document updated");
          console.log(res);
        }
      );
      return res;
      
    }

   
  }
}
