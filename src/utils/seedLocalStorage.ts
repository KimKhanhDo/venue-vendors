import {
  VENUES,
  CANDIDATES,
  APPLICATIONS,
  HIRE_HISTORY,
  COMPLIANCE_DOCS,
  MOCK_BLOCKED,
} from '@/data';

import { seedDummyUsers } from './seedDummyUsers';

// Seed tất cả mock data vào localStorage trước khi app render.
// Chỉ seed nếu key chưa tồn tại — không overwrite data thật của user.
export function seedLocalStorage() {
  seedDummyUsers();

  if (!localStorage.getItem('venues')) {
    localStorage.setItem('venues', JSON.stringify(VENUES));
  }

  if (!localStorage.getItem('candidates')) {
    localStorage.setItem('candidates', JSON.stringify(CANDIDATES));
  }

  if (!localStorage.getItem('applications')) {
    localStorage.setItem('applications', JSON.stringify(APPLICATIONS));
  }

  if (!localStorage.getItem('hire_history')) {
    localStorage.setItem('hire_history', JSON.stringify(HIRE_HISTORY));
  }

  if (!localStorage.getItem('compliance_docs')) {
    localStorage.setItem('compliance_docs', JSON.stringify(COMPLIANCE_DOCS));
  }

  if (!localStorage.getItem('blocked_periods')) {
    localStorage.setItem('blocked_periods', JSON.stringify(MOCK_BLOCKED));
  }
}
