import type { HireHistory } from '@/types';

// ─── Vendor Utils ─────────────────────────────────────────────────────────────

// Calculate reputation score of each hirer from hire_history
export const getReputationMap = () => {
  // Load all hire history records from localStorage
  const raw = localStorage.getItem('hire_history');
  const all: HireHistory[] = raw ? JSON.parse(raw) : [];

  // Pass 1: accumulate total rating and booking count per hirer
  const map = new Map<string, { sum: number; count: number }>();
  for (const history of all) {
    // If this hirer has no entry yet, start from zero
    const existing = map.get(history.hirerId) ?? { sum: 0, count: 0 };
    map.set(history.hirerId, { sum: existing.sum + history.rating, count: existing.count + 1 });
  }

  // Pass 2: divide sum by count to get the average rating per hirer
  const result = new Map<string, number>();
  for (const [hirerId, { sum, count }] of map) {
    result.set(hirerId, sum / count);
  }

  // Returns Map<hirerId, averageRating>, e.g. { 'u1' => 4.0, 'u2' => 3.7 }
  return result;
};

// ─── IndexedDB Helpers ────────────────────────────────────────────────────────
// Used for storing PDF files (liability insurance, business cert)
// JPG files (driver's license) are stored in localStorage as base64

const DB_NAME = 'venue-vendors';
const STORE_NAME = 'compliance-pdfs';

// opens existing database or creates a new one if it doesn't exist yet
// wraps IndexedDB's callback-based API in a Promise so it can be used with await
const openDB = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1); // 1 = database version number

    req.onupgradeneeded = () => req.result.createObjectStore(STORE_NAME); // runs only on first open or version upgrade
    req.onsuccess = () => resolve(req.result); // db is ready
    req.onerror = () => reject(req.error);
  });

// saves a PDF base64 string to IndexedDB
// key format: '{hirerId}_{fieldName}' e.g. 'hirer@test.com_liabilityInsurance'
// put() overwrites if the key already exists
export const savePDF = async (key: string, base64: string): Promise<void> => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite'); // readwrite — needed for put()

    tx.objectStore(STORE_NAME).put(base64, key);
    tx.oncomplete = () => resolve(); // resolve on transaction, not on the put() request
    tx.onerror = () => reject(tx.error);
  });
};

// retrieves a PDF base64 string from IndexedDB by key
// returns undefined if the key doesn't exist — does not throw
export const getPDF = async (key: string): Promise<string | undefined> => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly'); // readonly — no writes needed

    const req = tx.objectStore(STORE_NAME).get(key);
    req.onsuccess = () => resolve(req.result); // req.result = base64 string, or undefined if not exists
    req.onerror = () => reject(req.error);
  });
};

// deletes a PDF from IndexedDB by key
// called when user removes a document — keeps IndexedDB in sync with localStorage
export const deletePDF = async (key: string): Promise<void> => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');

    tx.objectStore(STORE_NAME).delete(key);
    tx.oncomplete = () => resolve(); // resolve on transaction — no return value needed
    tx.onerror = () => reject(tx.error);
  });
};

// triggers browser download for a stored file using its base64 data URL
export const downloadFile = (fileName: string, base64: string) => {
  // temporary <a>, not attached to DOM
  const a = document.createElement('a');
  a.href = base64; // data URL as file content — no server needed
  a.download = fileName; // tells browser to save, not navigate
  a.click(); // trigger download
};
