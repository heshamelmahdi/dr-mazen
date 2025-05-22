import { PrismaClient } from './src/generated/prisma/index.js';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function createAdmin() {
  // Replace these values with your desired admin credentials
  const email = 'admin@example.com';
  const password = 'secure-password';
  const name = 'Admin User';
  
  // Hash the password (using 10 salt rounds)
  const hashedPassword = await hash(password, 10);
  
  try {
    // Try to find existing admin user
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      // Update existing user's password
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          isActive: true,
        }
      });
      console.log(`Admin user password updated: ${updatedUser.email}`);
    } else {
      // Create new admin user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: 'ADMIN',
          isActive: true,
        },
      });
      console.log(`Admin user created successfully: ${user.email}`);
    }
  } catch (error) {
    console.error('Error with admin user operation:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin()
  .catch((error) => {
    console.error('Error creating/updating admin user:', error);
    process.exit(1);
  });