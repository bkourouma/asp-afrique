// Simple script to create admin user
// Run from /opt/aspweb directory
const { execSync } = require('child_process');
const path = require('path');

// Set environment variables
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://aspci_user:VotreMotDePasseSecurise123!@localhost:5432/aspci_afrique_db';

// Change to packages/db directory
process.chdir(path.join(__dirname, 'packages/db'));

// Run only the admin seed
const script = `
const { prisma } = require('./src/index');
const bcrypt = require('bcryptjs');

(async () => {
  try {
    console.log('🌱 Creating admin user...');
    
    // Create ADMIN role
    const adminRole = await prisma.role.upsert({
      where: { key: 'ADMIN' },
      update: {},
      create: { key: 'ADMIN', label: 'Administrator' }
    });
    console.log('✅ Admin role created');
    
    // Create admin user
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
    console.log('✅ Admin user created:', adminUser.email);
    
    // Assign role
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
    console.log('✅ Admin role assigned');
    
    console.log('\\n🔑 Login credentials:');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('\\n✅ Done!');
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
`;

// Write and execute
const fs = require('fs');
fs.writeFileSync('/tmp/create-admin-temp.js', script);
execSync('node /tmp/create-admin-temp.js', { stdio: 'inherit' });


