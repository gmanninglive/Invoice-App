import { connectToDatabase } from "../../../../lib/mongodb";

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
        
    }
    break;
    
    case "POST": {
        
    }
    break;

    case "PUT": {
      let customer_details = req.body;
      const { id, cust_id } = req.query;
      const myquery = {_id: ObjectId(id)};
      const collection = db.collection("users");
      
     collection.updateOne(
        myquery,
        {$set: {"customers.$[customer]" :  customer_details}},
        {   
            "arrayFilters": [
              {
                "customer.cust_id": cust_id,
              }
            ]
        },
          (err, data) => {
          if (err) console.log(err);
          console.log("1 document updated");
          return res.send(data);
        }
        
      );
      
    }
    break;

    case "DELETE" : {
      let customer_details = req.body;
      const { id, cust_id } = req.query;
      const myquery = {_id: ObjectId(id)};
      const collection = db.collection("users");
      
     collection.updateOne(
        myquery,
        {$pull: {"customers": {cust_id: cust_id}}},{multi: true},
  
          (err, data) => {
          if (err) console.log(err);
          console.log("1 document updated");
          return res.send("ok");
        }
        
      );

    }
    break;

    

  }
}