import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { verifyToken } from '@/lib/jwt'; // Import your token verification utility

const f = createUploadthing();

export const ourFileRouter = {
  // Handler for media uploads (images and videos)
  mediaUploader: f({
    image: { maxFileSize: "64MB", maxFileCount: 4 },
    video: { maxFileSize: "256MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      try {
        // Get token from Authorization header
        const authHeader = req.headers.get('authorization');
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          throw new UploadThingError("Unauthorized: No token provided");
        }

        const token = authHeader.split(' ')[1];

        // Verify the token and extract the user ID
        const user = await verifyToken(token);
        if (!user || !user.id) {
          throw new UploadThingError("Unauthorized: Invalid token");
        }

        return { userId: user.id };
      } catch (error) {
        console.error('Authentication error:', error);
        throw new UploadThingError("Unauthorized: Invalid authentication");
      }
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;