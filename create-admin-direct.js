import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://aspci_user:VotreMotDePasseSecurise123!@localhost:5432/aspci_afrique_db'
    }
  }
});

(async () => {
  try {
    console.log('🌱 Creating admin user...');
    
    const adminRole = await prisma.role.upsert({
      where: { key: 'ADMIN' },
      update: {},
      create: { key: 'ADMIN', label: 'Administrator' }
    });
    console.log('✅ Admin role:', adminRole.key);
    
    const adminEmail = 'admin@aspc-ci.org';
    const adminPassword = 'Admin123!';
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    
    const adminUser = await prisma.user.upsert({
      where: { email: adminEmail },
      update: { passwordHash, isActive: true },
      create: {
        email: adminEmail,
        passwordHash,
        name: 'Admin User',
        isActive: true
      }
    });
    console.log('✅ Admin user:', adminUser.email);
    
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
    console.log('✅ Role assigned');
    
    console.log('\n🔑 Login credentials:');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('\n✅ Admin user created successfully!');
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
})();

