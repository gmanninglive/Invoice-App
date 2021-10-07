import { S3 }  from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';

const bucket_name = process.env.NEXT_PUBLIC_BUCKET_NAME;
const region = process.env.NEXT_PUBLIC_BUCKET_REGION;
const access_key = process.env.NEXT_PUBLIC_BUCKET_ACCESS_KEY;
const secret_key = process.env.NEXT_PUBLIC_BUCKET_SECRET_KEY;

const bucket = new S3({
    region,
    access_key,
    secret_key,
    signatureVersion: 'v4'
})

export default async function handler(req, res) {
if(req.method === "POST"){

  // File Extension
  const ext = req.body.ext
  console.log(ext)
  // Get Upload url promise
  await new Promise(async function (resolve, reject) {
         const url = await generateUploadURL(ext);
         console.log(url)
         res.send({url});
         resolve();
         
        })
    }
}


export async function generateUploadURL(ext){
    const imageName = uuidv4();;

    const params = ({
        Bucket: bucket_name,
        Key: `${imageName.toString()}${ext}`,
        Expires: 60
    })
    const uploadURL = await bucket.getSignedUrlPromise('putObject', params)
    return uploadURL;
}