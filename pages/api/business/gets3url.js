import aws  from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  aws.config.update({
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_KEY,
    region: process.env.BUCKET_REGION,
    signatureVersion: 'v4',
  });
  const ext = req.query.ext;
  const uuid = uuidv4();

  const s3 = new aws.S3();
  const post = await s3.createPresignedPost({
    Bucket: process.env.BUCKET_NAME,
    Fields: {
      key: `${uuid.toString()}${ext}`,
    },
    Expires: 60, // seconds
    Conditions: [
      ['content-length-range', 0, 1048576], // up to 1 MB
    ],
  });

  res.status(200).json(post);
}
////
// export default async function handler(req, res) {
// if(req.method === "POST"){

//   // File Extension
//   const ext = req.body.ext
//   console.log(ext)
//   // Get Upload url promise
//   await new Promise(async function (resolve, reject) {
//          const url = await generateUploadURL(ext);
//          console.log(url)
//          res.send({url});
//          resolve();
         
//         })
//     }



// export async function generateUploadURL(ext){
//     const imageName = uuidv4();;

//     const params = ({
//         Bucket: bucket_name,
//         Key: `${imageName.toString()}${ext}`,
//         Expires: 60
//     })
//    const promise = await bucket.getSignedUrl('putObject', params, )
//     return promise;

// }

// export async function getSessionToken(){
//     const sts = STS({})
// }