import { connectToDatabase } from "../../../db/mongodb";

// const mongodb = require("mongodb");
import { ObjectId } from 'mongodb';


export default async function handler(req, res) {
  const {
    method,
  } = req;

  const { db } = await connectToDatabase();
  

  // switch the methods
  switch (method) {
    case "GET": {
      
    }

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
    
    };
    

   
  }
}
