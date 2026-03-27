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
    firstName: 'Morgan',
    lastName: 'Lee',
    username: 'morganlee',
    phone: '0498 765 432',
    email: 'vendor@test.com',
    password: 'Password123!',
    role: 'vendor',
  },
];

export const seedDummyUsers = () => {
  if (localStorage.getItem('users')) return;
  localStorage.setItem('users', JSON.stringify(DUMMY_USERS));
};
