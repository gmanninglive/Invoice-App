import { connectToDatabase } from "db/mongodb";
import { ObjectId } from "bson";

export default async function handler (req, res ){
    const {db} = await connectToDatabase();
    const { id } = req.query;
    let {cust_name} = req.body;
    console.log("query:" ,cust_name)
    console.log(id)
  try{
    const data = await db.collection("users")
    .aggregate([
      {$unwind: "$customers"},
      {
        $match: 
          {
            _id: ObjectId(id),
            $or: [
            {"customers.first_name": cust_name},
            {"customers.sur_name" : cust_name }
                ]
          }
          
      },
      {
        $project: { customers: 1}
      }
      ]).toArray();
      res.json(data);
     }

    catch (e) {console.log(e)};

    
}

// {$search: {
//   "index": "customer",
//   "compound":{
//     "must": [{
//       "equals": {
//         "path": "_id",
//         "value" :ObjectId(id)
//       }
//     }],
//     "should":{
//           text:{
//         "path": "customers.first_name",
//         "query": cust_name,
//       }
//   }
// }
// },}