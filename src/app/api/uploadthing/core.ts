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
        // Extract the token from the request cookies
        const cookies = req.headers.get('cookie');
        const token = cookies
          ?.split('; ')
          .find((row) => row.startsWith('token='))
          ?.split('=')[1];

        if (!token) {
          throw new UploadThingError("Unauthorized: No token provided");
        }

        // Verify the token and extract the user ID
        const user = await verifyToken(token);
        return { userId: user.id };
      } catch (error) {
        console.error('Authentication error:', error); // Log the error
        throw new UploadThingError("Unauthorized");
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;