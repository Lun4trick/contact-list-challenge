import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3 from "@/app/utils/s3Bucket";

export async function GET() {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: 'Default.png',
    });

    const url = (await getSignedUrl(s3, command, { expiresIn: 3}));
    console.log('url:', url);

    const response = new Response(url, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      }
    });

    return response
  } catch (error) {
    console.error('Error fetching image from S3:', error);
    return new Response('Error fetching image from S3');
  }
}