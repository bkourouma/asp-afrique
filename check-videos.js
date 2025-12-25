const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const videos = await prisma.video.findMany();
    console.log('Total videos in database:', videos.length);
    
    if (videos.length > 0) {
      console.log('\nVideos:');
      videos.forEach((video, index) => {
        console.log(`${index + 1}. ${video.title}`);
        console.log(`   ID: ${video.id}`);
        console.log(`   Type: ${video.type}`);
        console.log(`   Status: ${video.status}`);
        console.log(`   Category: ${video.category}`);
        console.log('');
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();

