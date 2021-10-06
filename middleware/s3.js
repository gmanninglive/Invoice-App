import { S3 }  from 'aws-sdk'
import { ObjectId } from 'bson';

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

export async function generateUploadURL(){
    const imageName = new ObjectId();

    const params = ({
        Bucket: bucket_name,
        Key: imageName.toString(),
        Expires: 60
    })
    const uploadURL = await bucket.getSignedUrlPromise('putObject', params)
    return uploadURL;
}