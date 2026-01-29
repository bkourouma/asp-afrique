import { seedConsultingServices } from './003_consulting_services'
import { prisma } from '../index'

async function main() {
  console.log('🌱 Starting consulting services seeding...')
  
  try {
    await seedConsultingServices()
    console.log('🎉 Consulting services seeding completed!')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

