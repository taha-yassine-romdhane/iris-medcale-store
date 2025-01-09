import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Export the route handler for UploadThing
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});