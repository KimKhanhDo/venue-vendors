import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import DashboardSection from '@/components/DashboardSection';
import { profileSchema, type ProfileFormValues } from '@/schemas';
import { useAuth } from '@/contexts/AuthContext';

const ProfileSection = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      lastName: '',
      firstName: '',
      username: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (!user) return;
    reset({
      lastName: user.lastName,
      firstName: user.firstName,
      username: user.username,
      phone: user.phone ?? '',
    });
  }, [user, reset]);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    if (!user) return;
    reset({
      lastName: user.lastName,
      firstName: user.firstName,
      username: user.username,
      phone: user.phone ?? '',
    });
  };

  const onSubmit = (data: ProfileFormValues) => {
    console.log('✅ onSubmit fired', data);
    if (!user) return;

    updateUser({ ...user, ...data });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const inputClass =
    'focus:border-secondary border-muted-foreground/30 w-full rounded-2xl border px-4 py-2 text-sm transition-all outline-none';

  const readOnlyClass =
    'border-muted-foreground/20 w-full rounded-2xl border bg-gray-50 px-4 py-2 text-sm text-gray-400 outline-none cursor-not-allowed';

  return (
    <DashboardSection number="i" title="My Profile">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Last name */}
        <div className="space-y-2">
          <label htmlFor="lastName" className="block text-sm font-semibold">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Your last name"
            readOnly={!isEditing}
            className={inputClass}
            {...register('lastName')}
          />
          {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
        </div>

        {/* First name */}
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-sm font-semibold">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="Your first name"
            readOnly={!isEditing}
            className={inputClass}
            {...register('firstName')}
          />
          {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
        </div>

        {/* Username */}
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-semibold">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Your username"
            readOnly={!isEditing}
            className={inputClass}
            {...register('username')}
          />
          {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}
        </div>

        {/* Phone number */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-semibold">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="04XX XXX XXX"
            readOnly={!isEditing}
            className={inputClass}
            {...register('phone')}
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        {/* Email — always read-only (registered during sign-up) */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold">
            Email
            <span className="ml-2 text-xs font-normal text-gray-400">(cannot be changed)</span>
          </label>
          <input
            id="email"
            type="email"
            value={user?.email ?? ''}
            readOnly
            className={readOnlyClass}
          />
        </div>

        {/* Password — always read-only (registered during sign-up) */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-semibold">
            Password
            <span className="ml-2 text-xs font-normal text-gray-400">(cannot be changed)</span>
          </label>
          <input
            id="password"
            type="password"
            value="••••••••••"
            readOnly
            className={readOnlyClass}
          />
        </div>

        {/* Action buttons */}
        <div className="col-span-2 mt-2 flex gap-2">
          {!isEditing ? (
            <button
              type="button"
              onClick={handleEdit}
              className="bg-secondary hover:bg-secondary/90 min-w-20 cursor-pointer rounded-2xl px-6 py-1 text-sm font-medium text-white transition-all"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSubmit(onSubmit, (errors) =>
                  console.log('❌ validation errors', errors),
                )}
                className="bg-secondary hover:bg-secondary/90 min-w-20 cursor-pointer rounded-2xl px-6 py-1 text-sm font-medium text-white transition-all"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="border-secondary text-secondary min-w-20 cursor-pointer rounded-2xl border px-6 py-1 text-sm font-medium transition-all hover:bg-purple-50"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </DashboardSection>
  );
};

export default ProfileSection;
