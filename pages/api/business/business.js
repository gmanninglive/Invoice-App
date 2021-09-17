// import { connectToDatabase } from "../../../lib/mongodb";
// import mongoose from "mongoose";
// import Business from "../../../models/Business";
// import { useUser } from "@auth0/nextjs-auth0";
// const mongodb = require("mongodb");
// import { ObjectId } from 'mongodb';

// // TODO check if ObjectId required for new users
// export default async function handler(req, res) {
//   const {
//     method,
//   } = req;

//   const { db } = await connectToDatabase();

//   // switch the methods
//   switch (method) {
//     case "GET": {
//         const id = req.headers.id;
//         const data = await db.collection("business_details").find({user_id: id}).toArray();

//         res.body= data;
//         return res.send();
        
//     }
//     // TODO Find matching id insert business details
//     case "POST": {
        
//     }

//     case "PUT": {
//       let business_details = req.body;
//       let myquery = { user_id: req.body.user_id};
//       const collection = db.collection("business_details");
      
//      collection.updateOne(
//         myquery,
//         {$mod: business_details}, (err, res) => {
//           if (err) throw err;
//           console.log("1 document updated");
//           console.log(res);
//         }
//       );
//       return res;
      
//     }

//     // case "DELETE": {
//     //   return deleteBusiness(req, res);
//     // }
//   }
// }
