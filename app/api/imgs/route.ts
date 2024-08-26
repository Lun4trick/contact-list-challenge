import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3 from "@/app/utils/s3Bucket";

export async function GET() {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: 'Default.png',
    });

    const url = await getSignedUrl(s3, command);

    const response = new Response(url, {
      headers: {
        'Content-Type': 'text/plain',
      }
    });

    return response
  } catch (error) {
    console.error('Error fetching image from S3:', error);
    return new Response('Error fetching image from S3');
  }
}