import { generateUploadURL } from "middleware/s3";

export default async function handler(req, res) {
if(req.method === "POST"){

  // File Extension
  const ext = req.body.ext
  console.log(ext)
  // Get Upload url promise
  await new Promise(async function (resolve, reject) {
         const url = await generateUploadURL(ext);
         res.send({url});
         resolve();
         
        })
    }
}