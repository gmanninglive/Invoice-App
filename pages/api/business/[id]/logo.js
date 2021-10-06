import formidable from "formidable-serverless";
import { connectToDatabase } from "db/mongodb";
import { ObjectId } from "bson";

import { generateUploadURL } from "middleware/s3";

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
      // const business_details = { business: fields };
      // collection.updateOne(
      //   myquery,
      //   { $set: business_details },
      //   { multi: false, runValidators: true, omitUndefined: true },
      //   (err, res) => {
      //     if (err) console.log(err);
      //     console.log("1 document updated");
      //     console.log(res);
      //   }
      // );

      //
      // console.log({ files });

      resolve({ fields, files });
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
