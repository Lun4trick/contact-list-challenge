import { NextResponse } from "next/server";
import { DeleteObjectCommand, GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  },
  region: process.env.AWS_REGION
});

export async function GET(req: Request, context: {params: {name: string}}) {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: context.params.name,
    });

    const url = await getSignedUrl(s3, command);

    return new NextResponse(url)
  } catch (error) {
    console.error('Error fetching image from S3:', error);
    return new Response('Error fetching image from S3');
  }
}

export async function DELETE(req: Request, context: {params: {name: string}}) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: context.params.name,
    });

    const url = await getSignedUrl(s3, command);

    await fetch(url, { method: 'DELETE' });

    return new NextResponse('Image deleted successfully');
  } catch (error) {
    console.error('Error deleting image from S3:', error);
    return new Response('Error deleting image from S3');
  }
}