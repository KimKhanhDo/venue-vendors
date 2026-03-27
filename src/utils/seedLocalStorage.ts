import { DUMMY_HISTORY, VENUES } from '@/data';
import { MOCK_APPLICANTS, MOCK_BLOCKED } from '@/data';
import { seedDummyUsers } from './seedDummyUsers';

export function seedLocalStorage() {
  seedDummyUsers();

  if (!localStorage.getItem('venues')) localStorage.setItem('venues', JSON.stringify(VENUES));

  if (!localStorage.getItem('hire_history'))
    localStorage.setItem('hire_history', JSON.stringify(DUMMY_HISTORY));

  // Seed applications with full dummy data (so vendor page is never empty)
  if (!localStorage.getItem('applications'))
    localStorage.setItem('applications', JSON.stringify(MOCK_APPLICANTS));

  // Seed blocked periods
  if (!localStorage.getItem('blocked_periods'))
    localStorage.setItem('blocked_periods', JSON.stringify(MOCK_BLOCKED));
}
