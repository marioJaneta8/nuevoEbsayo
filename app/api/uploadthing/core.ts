import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" });

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute

    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
