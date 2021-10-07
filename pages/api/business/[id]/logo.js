import formidable from "formidable-serverless";
import { connectToDatabase } from "db/mongodb";
import { ObjectId } from "bson";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { id } = req.query;
  const myquery = { _id: ObjectId(id) };
  const collection = db.collection("users");

  await new Promise(function (resolve, reject) {
    const form = new formidable.IncomingForm({
      maxFileSize: Infinity,
      keepExtensions: true,
    });
    // ------ Formidable Parsing -------- //
    form.parse(req, async function (err, fields, files) {
      if (err) return reject(err);
      const business_details = { "business.logo": fields.logo };
      collection.updateOne(myquery, { $set: business_details }).catch((err) => {
        if (err) console.log(err);
      });
    });
    res.status(200).send("1 document updated");
    resolve();
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
