import { prisma } from '../index'
import { seedDemoContent } from './002_demo_content_placeholders'
import { seedConsultingServices } from './003_consulting_services'

async function main() {
  console.log('🌱 Starting database seeding...')

  // Seed roles
  const adminRole = await prisma.role.upsert({
    where: { key: 'ADMIN' },
    update: {},
    create: {
      key: 'ADMIN',
      label: 'Administrator'
    }
  })

  console.log('✅ Roles seeded')

  // Seed admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@aspc-ci.org'
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!'

  // Hash password using bcrypt
  const bcrypt = await import('bcryptjs')
  const passwordHash = await bcrypt.hash(adminPassword, 12)

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      isActive: true
    },
    create: {
      email: adminEmail,
      passwordHash,
      name: 'Admin User',
      isActive: true
    }
  })

  // Assign admin role
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: adminRole.id
      }
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: adminRole.id
    }
  })

  console.log('✅ Admin user seeded')
  console.log(`📧 Admin email: ${adminEmail}`)
  console.log(`🔑 Admin password: ${adminPassword} (change this in production!)`)

  // Seed demo content
  await seedDemoContent()

  // Seed consulting services
  await seedConsultingServices()

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })