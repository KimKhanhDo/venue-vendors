import { z as zod } from 'zod';

// Profile Schema — only editable fields (email & password are fixed from sign-up)
export const profileSchema = zod.object({
  lastName: zod.string().min(1, 'Last name is required'),
  firstName: zod.string().min(1, 'First name is required'),
  username: zod.string().min(3, 'Username must have at least 3 characters'),
  phone: zod.union([
    zod.literal(''),
    zod.string().regex(/^04\d{2} \d{3} \d{3}$/, 'Format: 04XX XXX XXX'),
  ]),
});

export type ProfileFormValues = zod.infer<typeof profileSchema>;

// Apply Schema
export const applySchema = zod.object({
  eventName: zod.string().min(1, 'Event name is required'),
  guestCount: zod
    .string()
    .min(1, 'Must have at least 1 guest')
    .transform((val) => Number(val))
    .refine((val) => val >= 1, 'Must have at least 1 guest'),
  date: zod.string().min(1, 'Date is required'),
  time: zod.string().min(1, 'Start time is required'),
  duration: zod
    .string()
    .min(1, 'Duration is required')
    .transform((val) => Number(val))
    .refine((val) => val >= 1 && val <= 24, 'Duration must be between 1–24 hours'),
  venueId: zod.string().min(1, 'Please select a venue'),
});

// Input = what the form fields hold (strings)
// Output = what onSubmit receives (numbers after transform)
export type ApplyFormInput = zod.input<typeof applySchema>;
export type ApplyFormOutput = zod.output<typeof applySchema>;
