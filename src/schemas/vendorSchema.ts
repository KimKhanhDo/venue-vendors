import { z as zod } from 'zod';

export const blockVenueSchema = zod
  .object({
    venueId: zod.string().min(1, 'Please select a venue'),
    reason: zod.string().min(1, 'Reason is required'),
    from: zod.string().min(1, 'Start date is required'),
    to: zod.string().min(1, 'End date is required'),
  })
  .refine((data) => data.from <= data.to, {
    message: 'End date must be after start date',
    path: ['to'],
  });

export type BlockVenueFormValues = zod.infer<typeof blockVenueSchema>;

export const venueSchema = zod.object({
  name: zod.string().min(1, 'Venue name is required'),
  description: zod.string().min(10, 'Description must be at least 10 characters'),
  location: zod.string().min(1, 'Location is required'),
  capacity: zod
    .string()
    .min(1, 'Capacity is required')
    .refine((val) => Number(val) >= 1, 'Must be at least 1'),
  pricePerHour: zod
    .string()
    .min(1, 'Price is required')
    .refine((val) => Number(val) >= 1, 'Must be at least $1'),
  suitability: zod.array(zod.string()).min(1, 'Select at least one suitability'),
  photo: zod.string().optional(),
});

export type VenueFormValues = zod.infer<typeof venueSchema>;
