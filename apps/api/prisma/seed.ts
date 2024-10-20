import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
  // Deleting previous data
  const deleteUsers = await prisma.user.deleteMany();
  const deleteOrganizations = await prisma.organization.deleteMany();

  console.log(`Deleted ${deleteUsers.count} users`);
  console.log(`Deleted ${deleteOrganizations.count} organizations`);

  // Creating new data
  const passwordHash = await hash('123456', 1);

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatarUrl: 'https://github.com/IgorHenrik1.png',
      passwordHash,
    },
  });

  const anotherUser = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
  });

  const anotherUser2 = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
  });

  // Creating an organization
  const organization = await prisma.organization.create({
    data: {
      name: 'Acme Inc (Admin)',
      domain: 'acme.com',
      slug: 'acme-admin',
      avatarUrl: faker.image.avatarGitHub(),
      shouldAttachUserByDomain: true,
      ownerId: user.id,
      services: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([user.id, anotherUser.id, anotherUser2.id]),
              price: faker.commerce.price(), // Add a price value here
              duration: '30', // Add a duration value here (in minutes, for example)
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([user.id, anotherUser.id, anotherUser2.id]),
              price: faker.commerce.price(), // Add a price value here
              duration: '30', // Add a duration value here
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([user.id, anotherUser.id, anotherUser2.id]),
              price: faker.commerce.price(), // Add a price value here
              duration: '30', // Add a duration value here
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: user.id,
              role: 'ADMIN',
            },
            {
              userId: anotherUser.id,
              role: 'MEMBER',
            },
            {
              userId: anotherUser2.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  });
  
  console.log(`Created organization: ${organization.name}`);
  

  console.log(`Created organization: ${organization.name}`);
}

seed()
  .then(() => {
    console.log('Database seeded successfully');
  })
  .catch((e) => {
    console.error('Error seeding the database', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
