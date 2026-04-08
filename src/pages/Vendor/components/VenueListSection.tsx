// ============= THIS VERSION USED FOR A2 ==================

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { MapPin, Users, DollarSign } from 'lucide-react';

// import DashboardSection from '@/components/DashboardSection';
// import { Button } from '@/components/ui/button';
// import type { Venue } from '@/types';
// import { venueSchema, type VenueFormValues } from '@/schemas';

// interface VenueListSectionProps {
//   venues: Venue[];
//   onAdd: (venue: Venue) => void;
//   vendorId: string;
// }

// const SUITABILITY_OPTIONS = [
//   'Corporate',
//   'Wedding',
//   'Gala',
//   'Conference',
//   'Outdoor',
//   'Birthday',
//   'Launch',
//   'Casual',
//   'Exhibition',
//   'Other',
// ];

// const inputCls =
//   'focus:border-secondary border-muted-foreground/30 rounded-2xl border px-4 py-2 text-sm outline-none transition-all w-full';

// const getDefaultValues = (): VenueFormValues => ({
//   name: '',
//   description: '',
//   location: '',
//   capacity: '',
//   pricePerHour: '',
//   suitability: [],
//   photo: '',
// });

// // VenueCard component
// const VenueCard = ({ venue }: { venue: Venue }) => (
//   <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white">
//     {venue.photo && <img src={venue.photo} alt={venue.name} className="h-36 w-full object-cover" />}
//     <div className="space-y-1.5 p-4">
//       <p className="text-sm font-semibold">{venue.name}</p>
//       <p className="line-clamp-2 text-xs text-gray-400">{venue.description}</p>
//       <div className="flex flex-wrap gap-3 pt-1 text-xs text-gray-500">
//         <span className="flex items-center gap-1">
//           <MapPin size={12} className="text-secondary" />
//           {venue.location}
//         </span>
//         <span className="flex items-center gap-1">
//           <Users size={12} className="text-secondary" />
//           Cap. {venue.capacity}
//         </span>
//         <span className="flex items-center gap-1">
//           <DollarSign size={12} className="text-secondary" />${venue.pricePerHour}/hr
//         </span>
//       </div>
//       <div className="flex flex-wrap gap-1 pt-1">
//         {venue.suitability.map((s) => (
//           <span
//             key={s}
//             className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700"
//           >
//             {s}
//           </span>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// const VenueListSection = ({ venues, onAdd, vendorId }: VenueListSectionProps) => {
//   const [showForm, setShowForm] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     setValue,
//     formState: { errors, isValid },
//   } = useForm<VenueFormValues>({
//     resolver: zodResolver(venueSchema),
//     defaultValues: getDefaultValues(),
//     mode: 'onChange',
//   });

//   const selectedSuitability = watch('suitability');

//   const toggleSuitability = (option: string) => {
//     const current = selectedSuitability ?? [];
//     const updated = current.includes(option)
//       ? current.filter((s) => s !== option)
//       : [...current, option];
//     setValue('suitability', updated, { shouldValidate: true });
//   };

//   const onSubmit = (data: VenueFormValues) => {
//     const venue: Venue = {
//       id: `v_${Date.now()}`,
//       vendorId,
//       name: data.name,
//       description: data.description,
//       location: data.location,
//       capacity: Number(data.capacity),
//       pricePerHour: Number(data.pricePerHour),
//       suitability: data.suitability,
//       photo: data.photo || undefined,
//     };
//     onAdd(venue);
//     reset(getDefaultValues());
//     setShowForm(false);
//   };

//   return (
//     <DashboardSection
//       number="ii"
//       title="My Venues"
//       badge={
//         <button
//           onClick={() => setShowForm((prev) => !prev)}
//           className="bg-secondary hover:bg-secondary/90 cursor-pointer rounded-xl px-3 py-1 text-xs font-medium text-white transition-all"
//         >
//           {showForm ? 'Cancel' : '+ Add Venue'}
//         </button>
//       }
//     >
//       {/* Add venue form */}
//       {showForm && (
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="mb-6 space-y-4 rounded-2xl border border-purple-100 bg-purple-50/40 p-4"
//         >
//           <p className="text-sm font-semibold">New Venue</p>

//           {/* Name + Location */}
//           <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//             <div className="space-y-1">
//               <label className="text-xs font-semibold text-gray-500">Venue Name</label>
//               <input
//                 type="text"
//                 placeholder="e.g. Rooftop Social"
//                 className={inputCls}
//                 {...register('name')}
//               />
//               {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
//             </div>
//             <div className="space-y-1">
//               <label className="text-xs font-semibold text-gray-500">Location</label>
//               <input
//                 type="text"
//                 placeholder="e.g. Southbank"
//                 className={inputCls}
//                 {...register('location')}
//               />
//               {errors.location && (
//                 <p className="text-destructive text-xs">{errors.location.message}</p>
//               )}
//             </div>
//           </div>

//           {/* Capacity + Price */}
//           <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//             <div className="space-y-1">
//               <label className="text-xs font-semibold text-gray-500">Capacity</label>
//               <input
//                 type="number"
//                 placeholder="e.g. 200"
//                 className={inputCls}
//                 {...register('capacity')}
//               />
//               {errors.capacity && (
//                 <p className="text-destructive text-xs">{errors.capacity.message}</p>
//               )}
//             </div>
//             <div className="space-y-1">
//               <label className="text-xs font-semibold text-gray-500">Price per Hour ($)</label>
//               <input
//                 type="number"
//                 placeholder="e.g. 450"
//                 className={inputCls}
//                 {...register('pricePerHour')}
//               />
//               {errors.pricePerHour && (
//                 <p className="text-destructive text-xs">{errors.pricePerHour.message}</p>
//               )}
//             </div>
//           </div>

//           {/* Description */}
//           <div className="space-y-1">
//             <label className="text-xs font-semibold text-gray-500">Description</label>
//             <textarea
//               rows={3}
//               placeholder="Describe your venue..."
//               className="focus:border-secondary border-muted-foreground/30 w-full resize-none rounded-2xl border px-4 py-2 text-sm transition-all outline-none"
//               {...register('description')}
//             />
//             {errors.description && (
//               <p className="text-destructive text-xs">{errors.description.message}</p>
//             )}
//           </div>

//           {/* Photo URL */}
//           <div className="space-y-1">
//             <label className="text-xs font-semibold text-gray-500">Photo URL (optional)</label>
//             <input
//               type="text"
//               placeholder="https://..."
//               className={inputCls}
//               {...register('photo')}
//             />
//           </div>

//           {/* Suitability */}
//           <div className="space-y-1">
//             <label className="text-xs font-semibold text-gray-500">Suitability</label>
//             <div className="flex flex-wrap gap-2">
//               {SUITABILITY_OPTIONS.map((opt) => (
//                 <button
//                   key={opt}
//                   type="button"
//                   onClick={() => toggleSuitability(opt)}
//                   className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-all ${
//                     selectedSuitability?.includes(opt)
//                       ? 'bg-secondary text-white'
//                       : 'border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100'
//                   }`}
//                 >
//                   {opt}
//                 </button>
//               ))}
//             </div>
//             {errors.suitability && (
//               <p className="text-destructive text-xs">{errors.suitability.message}</p>
//             )}
//           </div>

//           <Button
//             type="submit"
//             disabled={!isValid}
//             className="bg-secondary hover:bg-secondary/90 cursor-pointer rounded-2xl px-8 text-white disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             Save Venue
//           </Button>
//         </form>
//       )}

//       {/* Venue list */}
//       {venues.length === 0 ? (
//         <p className="text-sm text-gray-400">No venues listed yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//           {venues.map((v) => (
//             <VenueCard key={v.id} venue={v} />
//           ))}
//         </div>
//       )}
//     </DashboardSection>
//   );
// };

// export default VenueListSection;

import { MapPin, Users, DollarSign } from 'lucide-react';

import DashboardSection from '@/components/DashboardSection';
import type { Venue } from '@/types';

interface VenueListSectionProps {
  venues: Venue[];
}

// VenueCard — displays a single venue's details
const VenueCard = ({ venue }: { venue: Venue }) => (
  <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white">
    {venue.photo && <img src={venue.photo} alt={venue.name} className="h-36 w-full object-cover" />}
    <div className="space-y-1.5 p-4">
      <p className="text-sm font-semibold">{venue.name}</p>
      <p className="line-clamp-2 text-xs text-gray-400">{venue.description}</p>
      <div className="flex flex-wrap gap-3 pt-1 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <MapPin size={12} className="text-secondary" />
          {venue.location}
        </span>
        <span className="flex items-center gap-1">
          <Users size={12} className="text-secondary" />
          Cap. {venue.capacity}
        </span>
        <span className="flex items-center gap-1">
          <DollarSign size={12} className="text-secondary" />${venue.pricePerHour}/hr
        </span>
      </div>
      <div className="flex flex-wrap gap-1 pt-1">
        {venue.suitability.map((s) => (
          <span
            key={s}
            className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// displays the list of venues owned by the current vendor
// add venue functionality is deferred to A2
const VenueListSection = ({ venues }: VenueListSectionProps) => (
  <DashboardSection number="ii" title="My Venues">
    {venues.length === 0 ? (
      <p className="text-sm text-gray-400">No venues listed yet.</p>
    ) : (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {venues.map((v) => (
          <VenueCard key={v.id} venue={v} />
        ))}
      </div>
    )}
  </DashboardSection>
);

export default VenueListSection;
