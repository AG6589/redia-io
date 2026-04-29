import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123', // plain text here for seeding script to hash, wait, the schema hashes on save, but if we do insertMany, pre save doesn't run. Let's just hash it here or use create() in seeder. Let's use pre-hashed or we will use User.create or insertMany doesn't trigger middleware sometimes. Wait, bcrypt.hashSync. Let's do it in the seeder or use plain string if seeder does it.
    // I will hash it here to be safe with insertMany
    password: bcrypt.hashSync('password123', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('password123', 10),
  },
];

export default users;
