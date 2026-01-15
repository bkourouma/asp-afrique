const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    console.log('🌱 Creating admin user...');

    // 1. Create or get ADMIN role
    const adminRole = await prisma.role.upsert({
      where: { key: 'ADMIN' },
      update: {},
      create: {
        key: 'ADMIN',
        label: 'Administrator'
      }
    });
    console.log('✅ Admin role:', adminRole.key);

    // 2. Hash password
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
    const passwordHash = await bcrypt.hash(adminPassword, 12);

    // 3. Create or update admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@aspc-ci.org';
    const adminUser = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        passwordHash,
        name: 'Administrator',
        isActive: true
      },
      create: {
        email: adminEmail,
        passwordHash,
        name: 'Administrator',
        isActive: true
      }
    });
    console.log('✅ Admin user created/updated:', adminUser.email);

    // 4. Assign ADMIN role to user
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
    });
    console.log('✅ Admin role assigned to user');

    // 5. Verify
    const userWithRoles = await prisma.user.findUnique({
      where: { email: adminEmail },
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    });

    console.log('\n📋 Admin user details:');
    console.log('Email:', userWithRoles.email);
    console.log('Name:', userWithRoles.name);
    console.log('Active:', userWithRoles.isActive);
    console.log('Roles:', userWithRoles.roles.map(ur => ur.role.key).join(', '));
    console.log('\n🔑 Login credentials:');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('\n✅ Admin user setup complete!');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();


