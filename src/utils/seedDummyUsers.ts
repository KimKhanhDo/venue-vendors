import type { User } from '@/types';

const DUMMY_USERS: User[] = [
  {
    id: 'u1',
    firstName: 'Alex',
    lastName: 'Johnson',
    username: 'alexjohnson',
    phone: '0412 345 678',
    email: 'hirer@test.com',
    password: 'Password123!',
    role: 'hirer',
  },
  {
    id: 'u2',
    firstName: 'Jamie',
    lastName: 'Chen',
    username: 'jamiechen',
    phone: '0423 111 222',
    email: 'hirer2@test.com',
    password: 'Password123!',
    role: 'hirer',
  },
  {
    id: 'u3',
    firstName: 'Morgan',
    lastName: 'Lee',
    username: 'morganlee',
    phone: '0498 765 432',
    email: 'vendor@test.com',
    password: 'Password123!',
    role: 'vendor',
  },
  {
    id: 'u4',
    firstName: 'Riley',
    lastName: 'Thompson',
    username: 'rileythompson',
    phone: '0456 789 012',
    email: 'vendor2@test.com',
    password: 'Password123!',
    role: 'vendor',
  },
  // ADD FROM HERE
  {
    id: 'u5',
    firstName: 'Jordan',
    lastName: 'Park',
    username: 'jordanpark',
    phone: '0411 222 333',
    email: 'vendor3@test.com',
    password: 'Password123!',
    role: 'vendor',
  },
];

export const seedDummyUsers = () => {
  if (localStorage.getItem('users')) return;
  localStorage.setItem('users', JSON.stringify(DUMMY_USERS));
};
