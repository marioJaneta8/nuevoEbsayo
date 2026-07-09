import { prisma } from "../lib/prisma.js";

async function main() {
  const courses = await prisma.course.findMany({
    include: {
      chapters: true,
    }
  });
  console.log("Courses in DB:");
  for (const c of courses) {
    console.log(`- Title: ${c.title}`);
    console.log(`  Slug: ${c.slug}`);
    console.log(`  Price: ${c.price} (${typeof c.price})`);
    console.log(`  Chapters Count: ${c.chapters.length}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
