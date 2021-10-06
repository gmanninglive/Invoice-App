import { generateUploadURL } from "middleware/s3";

export default async function handler(req, res) {
if(req.method === "GET"){
  await new Promise(async function (resolve, reject) {
         const url = await generateUploadURL();
         res.send({url});
         resolve();
         
        })
    }
}