import { connectToDatabase } from "../../../../db/mongodb";

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
      let invoice_details = req.body;
      const { id, inv_id } = req.query;
      const myquery = {_id: ObjectId(id)};
      const collection = db.collection("users");
      
     collection.updateOne(
        myquery,
        {$set: {"invoices.$[invoice]" :  invoice_details}},
        {   
            "arrayFilters": [
              {
                "invoice.inv_id": inv_id,
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
      let invoice_details = req.body;
      const { id, inv_id } = req.query;
      const myquery = {_id: ObjectId(id)};
      const collection = db.collection("users");
      
     collection.updateOne(
        myquery,
        {$pull: {"invoices": {inv_id: inv_id}}},{multi: true},
  
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