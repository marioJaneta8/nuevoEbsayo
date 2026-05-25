import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

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

  chapterVideo: f({
    video: {
      maxFileSize: "512GB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.ufsUrl };
  }),
  

  // Set permissions and file types for this FileRoute
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
